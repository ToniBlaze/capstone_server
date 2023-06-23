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
    // Verifica presenta Autore
    console.log("RIGA 67:", req.body)
    if (!req.body.author) {
      const error = new Error("Autore mancante!");
      error.status = 400;
      return next(error);
    }

    // Verifica e validazione READTIME.VALUE
    if (req.body.readTime && /^[\d.]+$/.test(req.body.readTime)) {
      const error = new Error(
        "Non possono essere lettere nel tempo di lettura"
      );
      error.status = 400;
      return next(error);
    } else if (!req.body.readTime){
      const error = new Error("Tempo di lettura mancante!");
      error.status = 400;
      return next(error);
    }

    // Verifica e validazione READTIME.UNIT
    if (req.body.readTime.unit && /\d/.test(req.body.readTime.unit)) {
      const error = new Error("Non possono essere numeri nel tempo unita'");
      error.status = 400;
      return next(error);
    } else if (!req.body.readTime.unit) {
      const error = new Error("Unita' mancante!");
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
    res.status(201).json(await new postModel(req.body).save());
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

// **********************************************
// Mostra post relativi all'utente loggato  --> NON FUNZIONA PERCHE???
router.get("/posts/user/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 400;
      return next(error);
    }

    // Se Utente trovato allora trova i post corrispondenti
    const posts = await postModel.find({ "author.name": user.name });
    if (!posts) {
      const error = new Error("You've not created a post yet!");
      error.status = 400;
      return next(error);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
