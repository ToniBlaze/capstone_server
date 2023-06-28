const mongoose = require("mongoose");


// Comment Schema
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Post Schema
const postsSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  asset: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  comment: [commentSchema],
});

// Mongoose Model
const postModel = mongoose.model("Post", postsSchema);

// Export Module
module.exports = postModel;
