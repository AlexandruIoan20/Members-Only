// Libraries 
const async = require("async");

// Database 
const User = require("../models/User");
const Member = require("../models/Member"); 
const Admin = require("../models/Admin");
const Post = require("../models/Post");

exports.index = (req, res, next) => { 
    async.parallel( 
        { 
            async usersCount () { 
                const u = await User.countDocuments().exec(); 
                return u;
            },

            async membersCount () { 
                const m = await Member.countDocuments().exec(); 
               return m;
            },

            async adminsCount () { 
                const a = await Admin.countDocuments().exec(); 
                return a; 
            },

            async posts () { 
                const p = await Post.find().populate({path: "genre", strictPopulate: false } ).populate({ path: "user", strictPopulate: false }).exec (); 
                return p; 
            }
        },

        (err, results) => { 
            if(err) return next(err); 

            res.render("index", { 
                usersCount: results.usersCount, 
                membersCount: results.membersCount,
                adminsCount: results.adminsCount, 
                user: req.user,
                posts: results.posts
            })
        }
    )
};

