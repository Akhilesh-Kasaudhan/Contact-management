const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc register a user
//@route POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please fill in all fields" });
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email already in use");
  }
  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({ username, email, password: hashedPassword });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Failed to create user" });
  }
});

//@desc login a user
//@route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
});

// @descCurrent user info
// @route POST /api/users/current
const getCurrentUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user.id).select('-password');
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
