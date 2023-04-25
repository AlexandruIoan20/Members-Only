const async = require("async"); 
const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");
const Genre = require("../models/Genre");
const User = require("../models/User");

exports.post_detail = async (req, res, next) => {
    const post = await Post.findById(req.params.postId)
                    .populate( { path: "genre", strictPopulate: false } )
                    .populate( { path: "user", strictPopulate: false } )
                    .exec();
    if(post === null) { 
        const err = new error("Something went wrong with the post"); 
        err.status = 404; 
        throw new Error(err);
    } else { 
        res.render("post_detail", { 
            post: post, 
            reqUser: req.user, 
        })
    }
};

exports.create_post_get = async (req, res, next) => { 
    const genres = await Genre.find({}).exec (); 

    res.render("post_form", { 
        pageTitle: "Create Post", 
        genres: genres, 
    })
};

exports.create_post_post = [ 
    body("title", "Title is required")
        .trim() 
        .isLength({ min: 1})
        .escape(), 
    body("genre", "Genre is required")
        .trim() 
        .escape(), 
    body("description", "description is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req);

        const post = new Post({ 
            title: req.body.title, 
            description: req.body.description, 
            genre: req.body.genre, 
            user: req.user, 
            postDate: Date.now(), 
        }); 

        if(!errors.isEmpty()) { 
            const genres = await Genre.find({}).exec(); 
            res.render("post_form",{ 
                pageTitle: "Create Post", 
                title: post.title, 
                description: post.description, 
                genre: post.genre, 
                genres: genres, 
                errors: errors.array(),
            })
        }

        await post.save(); 
        res.redirect(post.url);
    }
]

exports.delete_post_get = async (req, res, next) => {
    async.parallel( 
        { 
            async user () { 
                const u = await User.findById(req.params.id).exec(); 
                return u; 
            }, 

            async post () { 
                const p = await Post.findById(req.params.postId).exec(); 
                return p; 
            }
        }, 
        (err, results) => { 
            if(err) return next(err); 

            if(results.user === null) { 
                const err = new Error("User not found"); 
                err.status = 404; 
                throw new Error(err); 
            }

            if(results.post === null) { 
                const err = new Error("Post not found"); 
                err.status = 404; 
                throw new Error(err); 
            }; 

            res.render("post_delete", { 
                post: results.post, 
            })
        }
    )
};

exports.delete_post_post = async (req, res, next) => { 
    await Post.findByIdAndDelete(req.params.postId);
    res.redirect(`/general/profiles/${req.params.id}`);
};

exports.update_post_get = async (req, res, next) => { 
    async.parallel( 
        { 
            async genres () { 
                const g = await Genre.find( {} ).exec (); 
                return g; 
            }, 
            async post () { 
                const p = await Post.findById(req.params.postId); 
                return p; 
            }
        }, 
        (err, results) => { 
            console.log(results); 
            if(results.post === null) { 
                const err = new Error ("Post not found"); 
                err.status = 404; 
                throw new Error(err);
            };

            res.render("post_form", { 
                pageTitle: `Edit post: ${results.post.title}`, 
                title: results.post.title, 
                description: results.post.description,  
                genres: results.genres, 
            })

        }
    )
};

exports.update_post_post = [
    body("title", "Title is required")
    .trim() 
        .isLength({ min: 1})
        .escape(), 
    body("genre", "Genre is required")
        .trim() 
        .escape(), 
    body("description", "description is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(), 
    
    async (req, res, next) => { 
        const errors = validationResult(req);
        const lastPost = await Post.findById(req.params.postId).exec(); 

        const post = new Post({ 
            title: req.body.title, 
            description: req.body.description, 
            genre: req.body.genre, 
            user: req.user, 
            postDate: lastPost.postDate, 
            _id: req.params.postId, 
        }); 

        if(!errors.isEmpty()) { 
            const genres = await Genre.find({}).exec(); 
            res.render("post_form",{ 
                pageTitle: "Create Post", 
                title: post.title, 
                description: post.description, 
                genre: post.genre, 
                genres: genres, 
                errors: errors.array(),
            })
        }

        await Post.findByIdAndUpdate(post._id, post); 
        res.redirect(post.url);
    }
]
