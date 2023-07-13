const express = require("express");
const routers = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const saltRounds = 10;
const bcriptPassword = process.env.APP_PASSWORD_BCRIPT;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Models
const UserModel = require("../models/Users");

// Auth Endpoints
routers.post("/register", async (req, res, next) => {
  // Check and validation form "REGISTER"

  // Check and validation field NAME
  if (req.body.name && /\d/.test(req.body.name)) {
    const error = new Error("Non possono essere presenti numeri nel nome");
    error.status = 400;
    return next(error);
  } else if (!req.body.name) {
    const error = new Error("Nome mancante!");
    error.status = 400;
    return next(error);
  }

  // Check and validation field LAST NAME
  if (req.body.lastname && /\d/.test(req.body.lastname)) {
    const error = new Error("Non possono essere presenti numeri nel cognome");
    error.status = 400;
    return next(error);
  } else if (!req.body.lastname) {
    const error = new Error("Cognome mancante!");
    error.status = 400;
    return next(error);
  }

  // Check and validation field AGE
  if (req.body.age && !/^\d+$/.test(req.body.age)) {
    const error = new Error("Non ci possono essere lettere nel campo Eta'");
    error.status = 400;
    return next(error);
  } else if (!req.body.age) {
    const error = new Error("Eta' mancante!");
    error.status = 400;
    return next(error);
  }

  // Check and validation field CITY
  if (req.body.city && /\d/.test(req.body.city)) {
    const error = new Error("Non possono essere presenti numeri nella città");
    error.status = 400;
    return next(error);
  } else if (!req.body.city) {
    const error = new Error("Citta' mancante!");
    error.status = 400;
    return next(error);
  }

  // Check and validation field EMAIL
  if (req.body.email && !/\@/.test(req.body.email)) {
    const error = new Error("Email non valida!");
    error.status = 400;
    return next(error);
  } else if (!req.body.email) {
    const error = new Error("Email mancante!");
    error.status = 400;
    return next(error);
  }

  // Check and validation field PASSWORD
  if (!req.body.password) {
    const error = new Error("Password mancante!");
    error.status = 400;
    return next(error);
  }

  // --------------- END --> Check and validation form "REGISTER"

  const password = req.body.password;
  const userExist = await UserModel.findOne({ email: req.body.email });
  if (userExist) {
    const error = new Error("Utente gia presente!");
    error.status = 400;
    return next(error);
  } else {
    // BCript HASH
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.

        const user = new UserModel({
          ...req.body,
          password: hash,
          verified: false,
        });
        await user.save();
        return res.status(201).json(user);
      });
    });
  }
});

routers.post("/login", async (req, res, next) => {
// Check if the email is present in the body of the request and validate it
  if (req.body.email && !/\@/.test(req.body.email)) {
    const error = new Error("Email non valida!");
    error.status = 400;
    return next(error);
  } else if (!req.body.email) {
    const error = new Error("Email mancante!");
    error.status = 400;
    return next(error);
  }

  // Check if password is present in the body of the request
  if (!req.body.password) {
    const error = new Error("Password mancante");
    error.status = 400;
    return next(error);
  }

  // Check if user registered by email
  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin) {
    const error = new Error("Email sbagliata o utente non registrato");
    error.status = 400;
    return next(error);
  } else {
    // Check password
    const log = await bcrypt.compare(req.body.password, userLogin.password);
    if (!log) {
      const error = new Error("Password sbagliata");
      error.status = 400;
      return next(error);
    }
    // Create new JWT Token
    const token = jwt.sign(
      {
        id: userLogin._id,
        name: userLogin.name,
        lastname: userLogin.lastname,
        email: userLogin.email,
      },
      jwtSecretKey,
      { expiresIn: "2h" }
    );
    return res.status(200).json(token);
  }
});

// Export routers
module.exports = routers;
