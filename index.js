const mongoose = require("mongoose");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Models
const userModel = require("./models/Users");
const postModel = require("./models/Posts");



// Endpoints Autorizzazione
const AuthEndpoints = require("./endpoints/Auth");
app.use(AuthEndpoints);

// EndPoints Email
const endPointsEmail = require("./endpoints/Email_EndPoints");
app.use(endPointsEmail);

// EndPoints Users
const endPointsUsers = require("./endpoints/Users_EndPoints");
app.use(endPointsUsers);

// EndPoints Posts
const endPointsPosts = require("./endpoints/Posts_EndPoints");
app.use(endPointsPosts);

// EndPoints Comments
const endPointsComments = require("./endpoints/Comments_EndPoints");
app.use(endPointsComments);

// Middleware ErrorHandler
const debug = require("./middlewares/debug");
app.use(debug.errorHandler);

mongoose
  .connect(process.env.MONGODB_APIKEY)
  .then((response) => {
    console.log("DB Connected...");
    app.listen(process.env.PORT, async () =>
      console.log("Server listening on port " + process.env.PORT)
    );
  })
  .catch((err) => console.error(err));
