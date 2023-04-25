const User = require("../models/User");
const { GRADES } = require("../global/global_user"); 

const { body, validationResult } = require("express-validator");

exports.promote_get = async (req, res, next) => { 
    try { 
        const user = await User.findById(req.params.id).exec(); 
        res.render("user_promote", { 
            user, 
            GRADES, 
        })
    } catch (err) { 
        if(err) return next(err)
    }
};

exports.promote_post = [ 
    body("grade", "grade is required!")
        .trim() 
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req);
        const lastUser = await User.findById(req.params.id); 

        if(!errors.isEmpty() ){
            res.render("user_promote", { 
                user: lastUser, 
                GRADES, 
                errors: errors.array(), 
            }); 
        }

        const user = new User({ 
            username: lastUser.username, 
            email: lastUser.email, 
            password: lastUser.password, 
            grade: req.body.grade, 
            birthDay: lastUser.birthDay, 
            _id: lastUser._id, 
        }); 

        await User.findByIdAndUpdate(lastUser._id, user); 
        console.log(`User ${user.username} promoted.`); 
        res.redirect(user.url);
    }
]
