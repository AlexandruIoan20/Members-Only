const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema; 

const OwnerSchema = new Schema({ 
    username: { type: String, minLength: 1, required: true }, 
    password: { type: String, minLength: 1, required: true }, 
    email: { type: String, minLength: 1, required: true }, 
    birthDay: { type: String, minLength: 1, required: true }, 
}); 

OwnerSchema.virtual("formatted_birthDay").get(function () { 
    return DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
});

OwnerSchema.virtual("url").get(function () { 
    return; 
}); 

module.exports = mongoose.model("Owner", OwnerSchema);