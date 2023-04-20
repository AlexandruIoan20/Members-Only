const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon");

const UserSchema = new Schema({ 
    username: { type: String, minLength: 1, required: true }, 
    email: { type: String, minLength: 3, required: true}, 
    password: { type: String, minLength: 1, required: true}, 
    birthDay: { type: Date, required: true }, 
});

UserSchema.virtul("birthDay_formatted").get(function () { 
    return DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
});

UserSchema.virtual("url").get(function () { 
    return; 
})