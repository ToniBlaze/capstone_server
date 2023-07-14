const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

const AuthMiddleware = (req, res, next) => {
  // Check for the presence of token in the request headers
  let token = req.headers.authorization;

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
      }
    });
  }
};

module.exports = AuthMiddleware;
