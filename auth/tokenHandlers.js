const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET || "pubsecret";

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, jwtKey, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.locals.token = decodedToken;
      next();
    }
  });
}

function generateToken(user) {
  // takes a users credentialls and generates a jwt for them
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtKey, options);
}

module.exports = {
  authenticate,
  generateToken
};
