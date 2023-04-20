const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

exports.register_get = (req, res, next) => { 
    res.render("register");
};

exports.register_post = async (req, res, next) => { 
    try { 

    } catch { 
        
    }
};

exports.login_get = (req, res, next) => { 
    res.render("login");
};

exports.login_post = (req, res, next) => { 
    res.send("login POST");
}; 


