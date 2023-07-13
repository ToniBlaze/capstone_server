const express = require("express");
const router = express.Router();

// Models
const postModel = require("../models/Posts");

// All comments of a post
router.get("/posts/:id/comments", async (req, res, next) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("comment.author", "-password");
    const comments = post.comment;

    res.status(200).json(comments);
  } catch (err) {
    next();
  }
});

// A specific comment in the relevant Post returns
router.get("/posts/:id/comments/:commentId", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const comments = post.comment.filter(
      (comment) => comment._id.toString() === req.params.commentId
    );

    res.status(200).json(comments);
  } catch (err) {
    next();
  }
});

// Add comment to specific Post
router.post("/posts/:id", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);

    // Add the new comment to the 'comment' array
    post.comment.push(req.body);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (err) {
    next();
  }
});

router.put("/posts/:id/comments/:commentId", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const comment = post.comment.find(
      (comment) => comment._id.toString() === req.params.commentId
    );

    // Update comment with new data received in the request
    comment.author = req.body.author;
    comment.content = req.body.content;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    next();
  }
});

router.delete("/posts/:id/comments/:commentId", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);

    post.comment = post.comment.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    next();
  }
});

module.exports = router;
