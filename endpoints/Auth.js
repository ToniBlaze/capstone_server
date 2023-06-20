const express = require("express");
const routers = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const saltRounds = 10;
const bcriptPassword = process.env.APP_PASSWORD_BCRIPT;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Models
const UserModel = require("../models/Users");

// Auth Endpoints
routers.post("/register", async (req, res, next) => {
  const password = req.body.password;
  const userExist = await UserModel.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({ error: "Utente gia presente!" });
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
  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin) {
    return res.status(400).json({ error: "Email sbagliata o utente non registrato" });
  } else {
    // controllo la password
    const log = await bcrypt.compare(req.body.password, userLogin.password);
    if (!log) {
      return res.status(400).json({ error: "Password sbagliata" });
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
