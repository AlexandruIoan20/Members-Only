const Request = require("../models/Request"); 
const Post = require("../models/Post");
const async = require("async"); 

exports.request_list = async (req, res, next) => { 
    const requests = await Request.find({ }).populate("user").exec(); 
    res.render("request_list", { 
        requests, 
        reqUser: req.user, 
    })
}; 

exports.request_detail = async (req, res, next) => { 
    async.parallel({ 
        async request () { 
            const re = await Request.findById(req.params.id).populate("user"); 
            return re; 
        }, 

        async numberOfPosts () { 
            const p = await Post.countDocuments({ user: req.params.id });
            return p; 
        },
    }, 
        (err, results) => { 
            if(err) return next(err);
            
            res.render("request_detail", { 
                request: results.request, 
                numberOfPosts: results.numberOfPosts, 
                reqUser: req.user,
            })
        }
    )
}; 

exports.request_create_get = (req, res, next) => { 
    res.send(`NOT IMPLEMENTED: request create GET`); 
}; 

exports.request_create_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: request create POST"); 
}; 

exports.request_delete_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: request delete GET"); 
}; 

exports.request_delete_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: request delete POST"); 
}; 

exports.request_update_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: request update GET"); 
}; 

exports.request_update_post = (req, res, next) =>  { 
    res.send("NOT IMPLEMENTED: request update POST"); 
};