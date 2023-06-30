const express = require("express");
const router = express.Router();
require("dotenv").config();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

router.post("/mail", (req, res) => {
  const { to } = req.body;

  mg.messages
    .create(process.env.MAILGUN_DOMAIN, {
      from: "Limitless TS <limitless-ts@example.com>",
      to: [to],
      subject: "Benvenuto in Limitless TS!",
      text: "Ciao Trader! Grazie per esserti iscritto alla Newsletter, presto riceverai grandi notizie!",
    })
    .then((msg) => {
      console.log(msg);
      res.status(200).json({ message: "Email inviata con successo" });
    })
    .catch((err) => {
      console.log(err); 
      res.status(500).json({ message: "Errore durante l'invio dell'email" });
    });
});

module.exports = router;
