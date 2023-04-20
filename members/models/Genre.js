const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const GenreSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true}, 
    description: { type: String, minLength: 1, required: true}
});

GenreSchema.virtual("url").get(function () { 
    return; 
})

module.exports = mongoose.model("Genre", GenreSchema);