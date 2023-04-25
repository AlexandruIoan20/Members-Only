const { body, validationResult } = require('express-validator');
const async = require("async");

const Genre = require("../models/Genre");
const Post = require("../models/Post");

exports.genre_list = async (req, res, next) => { 
    const genres = await Genre.find({}).exec(); 

    res.render("genre_list", { 
        genres: genres, 
        user: req.user, 
    })
};

exports.genre_detail = async (req, res, next) => {
    try { 
        const genre = await Genre.findById(req.params.id).exec(); 

        if(genre === null) { 
            const err = new Error("Genre not found"); 
            err.status = 404; 
            throw error(err);
        }

        res.render("genre_detail", { 
            user: req.user, 
            genre: genre 
        })
    } catch (err) { 
        return next(err);
    }
};

exports.create_genre_get = (req, res, next) => { 
    res.render("genre_form", { 
        pageTitle: "Create genre",
        user: req.user, 
    });
};

exports.create_genre_post = [ 
    body("title", "Title is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(),
    body("description", "Description is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req);

        const genre = new Genre({ 
            title: req.body.title, 
            description: req.body.description, 
        });

        if(!errors.isEmpty()) { 
            res.render("genre_form", { 
                title: genre.title, 
                description: genre.description, 
                user: req.user, 
            })
        };

        const findGenre = await Genre.findById(genre._id).exec (); 
        if(findGenre !== null) { 
            res.redirect(findGenre.url)
        } else { 
            await genre.save(); 
            res.redirect(genre.url);
        }
    }
]


exports.delete_genre_get = async (req, res, next) => { 
    const genre = await Genre.findById(req.params.id);
    res.render("genre_delete", { 
        genre: genre, 
        user: req.user, 
    });
}; 

exports.delete_genre_post = async (req, res, next) => {
    await Post.deleteMany({ genre: req.params.id}); 
    await Genre.deleteOne({ _id: req.params.id});

    res.redirect("/general/genres");
};

exports.update_genre_get = async (req, res, next) => { 
    const genre = await Genre.findById(req.params.id).exec(); 

    res.render("genre_form", { 
        pageTitle: `Update genre ${genre.title}`, 
        title: genre.title, 
        user: req.user, 
        description: genre.description, 
    })
};  

exports.update_genre_post = [ 
    body("title", "Title is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(),
    body("description", "Description is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(), 
    
    async (req, res, next) => { 
        const errors = validationResult(req);

        const genre = new Genre({ 
            title: req.body.title, 
            description: req.body.description, 
            _id: req.params.id, 
        });

        if(!errors.isEmpty()) { 
            res.render("genre_form", { 
                title: genre.title, 
                description: genre.description, 
                user: req.user, 
                errors: errors.array(),
            })
        };


        await Genre.findByIdAndUpdate(genre._id, genre);
        res.redirect(genre.url);
    }
]
