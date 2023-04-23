function checkAuthenticated (req, res, next) { 
    if(req.isAuthenticated())
        return next(); 

    res.redirect('/general/login')
}; 

module.exports = checkAuthenticated;