exports.post_list = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: post list");
};

exports.post_detail = (req, res, next) => {
    res.send(`NOT IMPLEMENTED: post detail: ${req.params.postId}`)
};

exports.create_post_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: create post GET");
};

exports.create_post_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: create post POST");
};

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