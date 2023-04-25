const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema; 

const AdminSchema = new Schema({ 
    username: { type: String, minLength: 1, required: true }, 
    password: { type: String, minLength: 1, required: true }, 
    email: { type: String, minLength: 1, required: true }, 
    grade: { type: String, default: "Admin"}, 
    birthDay: { type: String, minLength: 1, required: true }, 
}); 

AdminSchema.virtual("formatted_birthDay").get(function () { 
    return DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
});

AdminSchema.virtual("url").get(function () { 
    return; 
}); 

module.exports = mongoose.model("Admin", AdminSchema);