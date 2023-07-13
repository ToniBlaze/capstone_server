// Middlewares ERROR

const errorHandler = (err, req, res, next) => {

  console.error("ERRORE COMPLETO: ", err);
  console.error("MESSAGGIO ERRORE DEBUG: ", err.message);
  // Get status code or use 500 if not present
  const statusCode = err.status || 500;

  // Set error message
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: errorMessage });
};

module.exports = { errorHandler };
