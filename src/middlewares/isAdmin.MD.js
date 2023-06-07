const jwt = require("../utils/jwt");

const isAdmin = (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;

    if (!token) return req.status(401).json({ message: "Invalid token" });

    const admin = jwt.verify(token);
    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin };