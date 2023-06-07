const jwt = require("../utils/jwt");

const isAuth = (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;

    if (!token) return req.status(401).json({ message: "Invalid token" });

    const user = jwt.verify(token);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuth };
