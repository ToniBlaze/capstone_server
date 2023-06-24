const express = require("express");
const routers = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const validator = require("validator");

const saltRounds = 10;
const bcriptPassword = process.env.APP_PASSWORD_BCRIPT;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Models
const UserModel = require("../models/Users");

// Auth Endpoints
routers.post("/register", async (req, res, next) => {
  // VERIFICA E VALIDAZIONE CAMPI "REGISTER"

  // Verifica e validazione NAME
  if (req.body.name && /\d/.test(req.body.name)) {
    const error = new Error("Non possono essere presenti numeri nel nome");
    error.status = 400;
    return next(error);
  } else if (!req.body.name) {
    const error = new Error("Nome mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica e validazione LAST NAME
  if (req.body.lastname && /\d/.test(req.body.lastname)) {
    const error = new Error("Non possono essere presenti numeri nel cognome");
    error.status = 400;
    return next(error);
  } else if (!req.body.lastname) {
    const error = new Error("Cognome mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica e validazione AGE
  if (req.body.age && !/^\d+$/.test(req.body.age)) {
    const error = new Error("Non ci possono essere lettere nel campo Eta'");
    error.status = 400;
    return next(error);
  } else if (!req.body.age) {
    const error = new Error("Eta' mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica e validazione CITY
  if (req.body.city && /\d/.test(req.body.city)) {
    const error = new Error("Non possono essere presenti numeri nella città");
    error.status = 400;
    return next(error);
  } else if (!req.body.city) {
    const error = new Error("Citta' mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica e validazione EMAIL
  if (req.body.email && !/\@/.test(req.body.email)) {
    const error = new Error("Email non valida!");
    error.status = 400;
    return next(error);
  } else if (!req.body.email) {
    const error = new Error("Email mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica e validazione PASSWORD
  if (!req.body.password) {
    const error = new Error("Password mancante!");
    error.status = 400;
    return next(error);
  }

  // --------------- FINE --> VERIFICA E VALIDAZIONE CAMPI "REGISTER"

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
        //console.log(hash)
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
  // Verifica se l'email è presente nel corpo della richiesta e validala
  if (req.body.email && !/\@/.test(req.body.email)) {
    const error = new Error("Email non valida!");
    error.status = 400;
    return next(error);
  } else if (!req.body.email) {
    const error = new Error("Email mancante!");
    error.status = 400;
    return next(error);
  }

  // Verifica se la password è presente nel corpo della richiesta
  if (!req.body.password) {
    const error = new Error("Password mancante");
    error.status = 400;
    return next(error);
  }

  // Verifica se utente registrato tramite email
  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin) {
    const error = new Error("Email sbagliata o utente non registrato");
    error.status = 400;
    return next(error);
  } else {
    // Controllo la password
    const log = await bcrypt.compare(req.body.password, userLogin.password);
    if (!log) {
      const error = new Error("Password sbagliata");
      error.status = 400;
      return next(error);
    }
    // Generare un JWT Token
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
