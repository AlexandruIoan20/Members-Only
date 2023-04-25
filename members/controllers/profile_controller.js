const async = require("async");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
        async.parallel( 
            { 
                async user() { 
                    await User.deleteOne({ _id: req.params.id }); 
                }, 
                async posts() { 
                    await Post.deleteMany( { user: req.params.id });
                }
            }, (err, results) => { 
                console.log(`User deleted`);

                res.redirect("/general/register");
            }
        )
    } catch (err) { 
        if(err) return next(err);
    }
};

exports.update_profile_get = (req, res, next) => { 
    res.render("user_update", { 
        username: req.user.username,
        email: req.user.email, 
        password: "", 
        birthDay: req.user.birthDay, 
    }) 
};

exports.update_profile_post = [
    body("username", "Username is required")
        .trim() 
        .isLength({ min: 1 }) 
        .escape(), 
    body("email", "Email is required")
        .trim()
        .isLength({ min: 1 }) 
        .isEmail() 
        .escape(), 
    body("password", "Password is required")
        .trim() 
        .isLength({min: 1}) 
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req);

        const hashedPassword = bcrypt.hash(req.body.password, 12);
        const user = new User({ 
            username: req.body.username, 
            email: req.body.email, 
            password: hashedPassword, 
            birthDay: req.body.birthDay,
            _id: req.user._id, 
        }); 

        if(!errors.isEmpty()) { 
            res.render("user_detail", { 
                username: req.user.username,
                email: req.user.email, 
                password: "", 
                birthDay: req.user.birthDay, 
                errors: errors.array (), 
            })
        }; 

        await User.updateOne({ _id: req.params.id }, user);
        console.log(`User ${req.params.id} updated successfully.`);
        res.redirect(user.url); 
    }
]
