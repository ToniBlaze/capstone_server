const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

const AuthMiddleware = (req, res, next) => {
  // Verifico la presenza di un token negli headers della request
  let token = req.headers.authorization;
  console.log(token);
  if (!token) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  } else {
    jwt.verify(token, jwtSecretKey, (err, data) => {
      if (err) {
        const err = new Error("Invalid Token");
        err.status = 401;
        return next(err);
      } else {
        next();
        console.log(data);
      }
    });
  }
};

module.exports = AuthMiddleware;
