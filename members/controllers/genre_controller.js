exports.genre_list = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: genre list");
};

exports.genre_detail = (req, res, next) => {
    res.send (`NOT IMPLEMENTED : genre detail: ${req.params.id}`);
};

exports.create_genre_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: create genre GET");
};

exports.create_genre_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: create genre POST")
}; 

exports.delete_genre_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: delete genre GET");
}; 

exports.delete_genre_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: delete genre POST");
};

exports.update_genre_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: update genre GET"); 
};

exports.update_genre_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: update genre POST");
}