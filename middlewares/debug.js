// Middlewares ERROR

const errorHandler = (err, req, res, next) => {

  console.error("ERRORE COMPLETO: ", err);
  console.error("MESSAGGIO ERRORE DEBUG: ", err.message);
  // Ottieni il codice di stato o usa 500 se non presente
  const statusCode = err.status || 500;

  // Imposta messaggio di errore
  const errorMessage = err.message || "Internal Server Error";

  // Invia risposta al client con il codice di stato e il messaggio di errore
  res.status(statusCode).json({ error: errorMessage });
};

module.exports = { errorHandler };
