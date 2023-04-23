const async = require("async");

const User = require("../models/User");
const Post = require("../models/Post");

exports.profile_detail = async (req, res, next) => { 
    async.parallel( 
        { 
            async user () { 
                const u = await User.findById(req.params.id).exec(); 
                return u; 
            }, 
            
            async posts () { 
                const p = await Post.find({ user: req.params.id }).exec (); 
                return p;
            }
        }, 

        (err, results) => { 
            let personalAccount = false; 
            if(req.user.username == results.user.username) personalAccount = true; 
            if(err) return next(err);

            res.render("user_detail", { 
                user: results.user, 
                posts: results.posts, 
                personalAccount,
            })
        }
    )
};

exports.delete_profile_get = (req, res, next) => { 
    res.render("user_delete", { 
        user: req.user
    });
};

exports.delete_profile_post = async (req, res, next) => { 
    try { 
        await User.deleteOne({ _id: req.params.id });
        console.log(`User ${req.params.id} deleted`);

        res.redirect("/general/register");
    } catch (err) { 
        if(err) return next(err);
    }
};

exports.update_profile_get = (req, res, next) => { 

};

exports.update_profile_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: update profile POST");
};