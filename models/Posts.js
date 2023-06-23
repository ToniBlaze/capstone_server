const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  author: {
    type: String,
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
  title: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  readTime: {
    value: { type: Number, require: true },
    unit: { type: String, require: true },
  },
  author: {
    name: { type: String, require: true },
    avatar: { type: String, require: false },
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
