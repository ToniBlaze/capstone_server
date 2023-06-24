const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

const AuthMiddleware = (req, res, next) => {
  // Verifico la presenza di un token negli headers della request
  let token = req.headers.authorization;
  console.log(token);
  if (!token) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  } else {
    jwt.verify(token, jwtSecretKey, (error, data) => {
      if (error) {
        const error = new Error("Invalid Token");
        error.status = 401;
        return next(error);
      } else {
        next();
        console.log(data);
      }
    });
  }
};

module.exports = AuthMiddleware;
