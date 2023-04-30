const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const RequestSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true }, 
    description: { type: String, minLength: 1, required: true }, 
    user: { type: Schema.Types.ObjectId, required: true }, 
}); 

RequestSchema.virtual("url").get(function () { 
    return `/general/requests/${this._id}`;
})

module.exports = mongoose.model("Request", RequestSchema);