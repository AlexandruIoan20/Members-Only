const Request = require("../models/Request"); 
const Post = require("../models/Post");
const RESPONSES = require("../global/request_resp");

const { body, validationResult } = require("express-validator");
const async = require("async"); 


exports.request_list = async (req, res, next) => { 
    const requests = await Request.find().populate("user").exec(); 
    console.log("REQUESTS"); 
    console.log(requests);
    res.render("request_list", { 
        requests: requests, 
        reqUser: req.user, 
    })
}; 

exports.request_user_list =  async (req, res, next) => { 
    const requests = await Request.find( { user: req.params.id }).exec(); 
    console.log(requests); 

    res.render("request_user_list", { 
        reqUser: req.user, 
        requests: requests, 
    })
}

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
                pageTitle: results.request.title, 
                request: results.request, 
                numberOfPosts: results.numberOfPosts, 
                reqUser: req.user,
            })
        }
    )
}; 

exports.request_create_get = (req, res, next) => { 
    res.render("request_form", { 
        pageTitle: "Create Request"
    })
}; 

exports.request_create_post = [ 
    body("title", "title is required")
        .trim()
        .isLength({ min: 1 })
        .escape (), 
    body("description", "description is required")
        .trim()
        .isLength({ min: 1 })
        .escape (), 
        
    async (req, res, next) => { 
        const errors = validationResult(req); 

        const request = new Request({ 
            title: req.body.title, 
            description: req.body.description, 
            user: req.user._id, 
            status: RESPONSES[0], 
        }); 

        if(!errors.isEmpty()) { 
            res.render("request_form", { 
                pageTitle: "Create Request", 
                title: request.title, 
                description: request.description, 
                errors: errors.array(), 
            })
        }; 
    
        await request.save(); 
        res.redirect("/general");
    }
]

exports.request_delete_get = async (req, res, next) => { 
    const request = await Request.findById(req.params.id).populate("user").exec(); 

    if(request.status == RESPONSES[0]) { 
        res.render("request_delete", { 
            pageTitle: `Delete ${request.title}`, 
            request: request, 
            reqUser: req.user, 
        })
    }
}; 

exports.request_delete_post = async (req, res, next) => { 
    const request = await Request.findById(req.params.id).exec(); 
    if(request.status == RESPONSES[0]) { 
        await Request.findByIdAndDelete(req.params.id); 
    }
    res.redirect("/general");
}; 

exports.request_update_get = async (req, res, next) => { 
    const request = await Request.findById(req.params.id); 

    if(request.status == RESPONSES[0])
        res.render("request_form", { 
            pageTitle: `Edit Request`, 
            title: request.title, 
            description: request.description, 
        })
}; 

exports.request_update_post = [ 
    body("title", "title is required")
        .trim()
        .isLength({ min: 1 })
        .escape (), 
    body("description", "description is required")
        .trim()
        .isLength({ min: 1 })
        .escape (), 
        
    async (req, res, next) => { 
        const errors = validationResult(req); 

        const request = new Request({ 
            title: req.body.title, 
            description: req.body.description, 
            user: req.user._id, 
            status: RESPONSES[0], 
            _id: req.params.id
        }); 

        if(!errors.isEmpty()) { 
            res.render("request_form", { 
                pageTitle: `Edit Request`, 
                title: request.title, 
                description: request.description, 
                errors: errors.array(), 
            })
        }; 
    
        const r = await Request.findById(request._id, request).exec(); 
        if(r.status == RESPONSES[0]) { 
            await Request.findByIdAndUpdate(request._id, request);
            res.redirect(request.url);
        } else { 
            res.redirect("/general");
        }
    }
]
