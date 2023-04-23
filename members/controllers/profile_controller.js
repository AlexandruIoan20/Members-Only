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
            if(err) return next(err);

            res.render("user_detail", { 
                user: results.user, 
                posts: results.posts, 
            })
        }
    )
};

exports.delete_profile_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: delete profile GET");
};

exports.delete_profile_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: delete profile POST");
};

exports.update_profile_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: update profile GET");
};

exports.update_profile_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: update profile POST");
};