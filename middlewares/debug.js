// Middlewares
const  errorHandler = (error, req, res, next) => {
    const e = error.toString();
    console.error("Errore: " + e);
    console.log(error);
    return res.status(400).json("Errore: " + e)
}

module.exports = {errorHandler};