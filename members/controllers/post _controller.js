const async = require("async"); 
const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");
const Genre = require("../models/Genre");

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

exports.delete_post_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: delete post GET");
};

exports.delete_post_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: delete post POST");
};

exports.update_post_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: update post GET");
};

exports.update_post_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED  update POST POST ")
}