const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const initializePassport = require("../config/passport_config");
const  { getProfileByEmail }  = require("../middleware/database");
const clear_collection = require ("../middleware/clear_database");

initializePassport(passport, getProfileByEmail)

const User = require("../models/User");

exports.register_get = (req, res, next) => { 
    res.render("register");
};

exports.register_post = [ 
    body("username", "Name is required") 
        .trim()
        .isLength({ min: 1})
        .escape(), 
    body("password", "Password is required")
        .trim() 
        .isLength({ min: 1 }) 
        .escape(),
    body("email", "Email is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(),
    body("birthDay", "Birth Day is required")
        .trim()
        .escape(),
    
    async (req, res, next) => { 
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        console.log(req.body.email);
        const user = new User({ 
            username: req.body.username, 
            email: req.body.email, 
            password: hashedPassword,
            birthDay: req.body.birthDay
        })

        if(!errors.isEmpty()) { 
            console.log("ERROR AT: auth controller line 93")
            res.render("register", { 
                username: user.username, 
                email: user.email, 
                password: '', 
                birthDay: user.birthDay,
                errors: errors.array()
            })
        }

        await user.save(); 
        res.redirect("/general/login")
        console.log("DONE");
    }
]


exports.login_get = (req, res, next) => { 
    res.render("login");
};

exports.login_post = passport.authenticate('local', {
    successRedirect: "/general",
    failureRedirect: "/general/login", 
    failureFlash: true, 
})

exports.logout = async (req, res, next) => { 
    try { 
        req.logOut(err => { 
            if(err) return next(err);
        }); 
    } catch (err) { 
        if(err) return next(err);
    }

    res.redirect("/general/login");
}


