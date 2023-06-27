// Middlewares ERROR

const errorHandler = (err, req, res, next) => {

  console.error("ERRORE COMPLETO: ", err);
  console.error("MESSAGGIO ERRORE DEBUG: ", err.message);
  // Ottieni il codice di stato o usa 500 se non presente
  const statusCode = err.status || 500;

  // Imposta messaggio di errore
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: errorMessage });
};

module.exports = { errorHandler };
