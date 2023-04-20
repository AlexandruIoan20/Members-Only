const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

exports.register_get = (req, res, next) => { 
    res.render("register");
};

exports.register_post =  [
    body("username") 
        .trim()
        .isLength({ min: 1})
        .custom(async value => { 
            const user = await User.find({ username: value }); 
            if(user)
                throw new Error("This name is already used.")
        })
        .escape(),
    body("email")
        .trim()
        .isEmail()
        .isLength({ min: 1 }) 
        .custom(async value => { 
            const user = await User.find( { email: value });
            if(user)
                throw new Error("This email is already in use");
        })
        .escape(), 
    body("password")
        .trim() 
        .isStrongPassword()
        .withMessage("Your password is not strong enough")
        .escape(), 
    body("birthday")
        .trim() 
        .isISO8601() 
        .escape(), 
    async (req, res, next) => { 
        const errors = validationResult(req); 
        
        const hashedPassword = bcrypt.hash(req.body.password, 10);
        const user = new User({ 
            username: req.body.username, 
            email: req.body.email,
            password: hashedPassword, 
            bithday: req.body.birthday
        });

        if(!errors.isEmpty()) { 
            res.render("register", { 
                username: user.username,
                password: "",
                email: user.email, 
                birthday: user.bithday
            });
        }
    }
]

exports.login_get = (req, res, next) => { 
    res.render("login");
};

exports.login_post = (req, res, next) => { 
    res.send("login POST");
}; 


