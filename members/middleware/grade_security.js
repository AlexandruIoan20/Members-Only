const  { GRADES } = require("../global/global_user");

const SECURITY = { 
     isMember: (req, res, next) => { 
        let checkTrue = false; 
        for(let i = 1; i <= GRADES.length; i++) { 
            if(req.user.grade == GRADES[i]) checkTrue = true; 
        }; 

        if(checkTrue) return next();
        res.redirect('back');
    }, 

     isAdmin: (req, res, next) => { 
        let checkTrue = false; 
        for(let i = 2; i <= GRADES.length; i++) { 
            if(req.user.grade == GRADES[i]) checkTrue = true; 
        }; 

        if(checkTrue) return next();
        res.redirect('back');
    }, 

     isOwner: (req, res, next) => { 
        if(req.user.grade == "Owner") return next (); 
        res.redirect('back');
    }, 
}

module.exports = SECURITY; 