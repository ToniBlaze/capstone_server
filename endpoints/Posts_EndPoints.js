const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Models
const postModel = require("../models/Posts");

// Middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");

// INIZIO CLOUDINARY
cloudinary.config({
  cloud_name: "dtfbehvdq",
  api_key: "157679364286161",
  api_secret: "aeISkIxxJZM2LBXsmrMKV4QZ60o",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/",
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

// *** CHIMATA POST + CLOUDINARY-MULTER ***
router.post("/upload", upload.single("uploadFile"), (req, res) => {
  const data = req.file;
  console.log(data);
  res.status(200).json({ ...data });
});

//----------- FINE CLOUDINARY

router.get("/posts", async (req, res, next) => {
  res.status(200).json(await postModel.find());
});

router.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 400;
      return next(error);
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.post("/posts", AuthMiddleware, async (req, res, next) => {
  try {
    res.status(201).json(await new postModel(req.body).save());
  } catch (err) {
    next();
  }
});

router.put("/posts/:id", async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await postModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (err) {
    next();
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    res.status(200).json(await postModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next();
  }
});

module.exports = router;
