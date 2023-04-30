exports.request_list = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: request list"); 
}; 

exports.request_detail = (req, res, next) => { 
    res.send(`NOT IMPLEMENTED: req detail: ${req.params.id}`) 
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