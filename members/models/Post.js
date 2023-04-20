const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon");

const PostSchema = new Schema({ 
    title: {type: String, minLength: 1, required: true},
    description: {type: String, minLength: 1, required: true}, 
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    postDate: {type: Date, default: Date.now},
});

PostSchema.virtual("postDate_formatted").get(function () { 
    return DateTime.fromJSDate(this.postDate).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url").get(function() { 
    return; 
})