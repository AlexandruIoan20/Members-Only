const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const RESPONSES = require("../global/request_resp"); 

const RequestSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true }, 
    description: { type: String, minLength: 1, required: true }, 
    user: { type: Schema.Types.ObjectId, ref: "User",  required: true }, 
    status: { type: String, minLength: 1, default: RESPONSES[0], required: true }, 
}); 

RequestSchema.virtual("url").get(function () { 
    return `/general/requests/${this._id}`;
})

module.exports = mongoose.model("Request", RequestSchema);