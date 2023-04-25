const User = require("../models/User");
const { GRADES } = require("../global/global_user"); 

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

exports.promote_post = async (req, res, next) => { 
    res.send("Promote page"); 
}