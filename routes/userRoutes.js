const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateTokenHandler");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser);

module.exports = router;
