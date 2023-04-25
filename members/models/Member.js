const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema; 

const MemberSchema = new Schema({ 
    username: { type: String, minLength: 1, required: true }, 
    password: { type: String, minLength: 1, required: true }, 
    email: { type: String, minLength: 1, required: true }, 
    grade: { type: String, default: "Member"  }, 
    birthDay: { type: String, minLength: 1, required: true }, 
}); 

MemberSchema.virtual("formatted_birthDay").get(function () { 
    return DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
});

MemberSchema.virtual("url").get(function () { 
    return; 
}); 

module.exports = mongoose.model("Member", MemberSchema);