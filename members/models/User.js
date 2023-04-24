const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon");


//TODO: Change how posts are rendered on the page. 
const UserSchema = new Schema({ 
    username: { type: String, minLength: 1, required: true }, 
    email: { type: String, minLength: 1, required: true}, 
    password: { type: String, minLength: 1, required: true}, 
    birthDay: { type: Date, required: true }, 
});

UserSchema.virtual("birthDay_formatted").get(function () { 
    return DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
});

UserSchema.virtual("url").get(function () { 
    return `/general/profiles/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);