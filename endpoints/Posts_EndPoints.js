const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Models
const postModel = require("../models/Posts");
const userModel = require("../models/Users");

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
router.post("/upload", upload.single("uploadFile"), (req, res, next) => {
  if (!req.file) {
    const error = new Error("Nessun file caricato!");
    error.status = 400;
    return next(error);
  } else {
    const data = req.file;
    console.log(data);
    res.status(200).json({ ...data });
  }
});

//----------- FINE CLOUDINARY

router.get("/posts", AuthMiddleware, async (req, res, next) => {
  try {
    const posts = await postModel.find().populate("author", "-password");
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate("author", "-password");
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
    // Verifica presenta Autore
    console.log("RIGA 67:", req.body);
    if (!req.body.author) {
      const error = new Error("Autore mancante!");
      error.status = 400;
      return next(error);
    }


    // Verifica presenta Categoria
    if (!req.body.category) {
      const error = new Error("Categoria mancante!");
      error.status = 400;
      return next(error);
    }

    // Verifica presenta Titolo
    if (!req.body.title) {
      const error = new Error("Titolo mancante!");
      error.status = 400;
      return next(error);
    }

    // Verifica presenta Contenuto
    if (!req.body.content) {
      const error = new Error("Contenuto post mancante!");
      error.status = 400;
      return next(error);
    }

    const newPost = new postModel(req.body);

    res.status(201).json(await newPost.save());
  } catch (err) {
    next(err);
  }
});

router.put("/posts/:id", async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await postModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/posts/:id", async (req, res, next) => {
  try {
    res.status(200).json(await postModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next();
  }
});

// Mostra post relativi all'utente loggato
router.get("/posts/user/:id", async (req, res, next) => {
  try {
    const posts = await postModel
      .find({ author: req.params.id })
      .populate("author", "-password");

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
