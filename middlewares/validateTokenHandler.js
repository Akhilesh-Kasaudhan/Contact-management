const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validtaeToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded.user;
      next();
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
});

module.exports = validtaeToken;
