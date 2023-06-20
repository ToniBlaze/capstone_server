const express = require("express");
const router = express.Router();
require('dotenv').config()
const sgMail = require('@sendgrid/mail');

//SEND GRID per invio EMAIL
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

router.post('/mail', async (req, res) => {
  const { to } = req.body;
  const msg = {
    to: to, // il destinatario dell'email
    from: 'alessio.toninello@gmail.com', // Il mittente della mail (Email verificata su SendGrid)
    subject: 'Prima Email tramite SENDGRID!',
    text: 'Ciao a tutti questa è una mail mandata tramite sendgrid :)',
  };

  try {
    const response = await sgMail.send(msg);
    // console.log(response[0].statusCode);
    // console.log(response[0].headers);
    res.status(response[0].statusCode).json({ ...response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'invio dell\'email.' });
  }
});

module.exports = router;
