const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exist

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  // hashed password takes in the password the user generated and the salt method
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // retreive the email and password from the req
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Compares the password the user entered to the hashed password in the database
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    // When user logs with the correct Credentials
    // We grab the id, name and email from the user in the DB
  // const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json(
    // id: _id,
    // name,
    // email,
    req.user
  );
});

// Generate JWT Token
const generateToken = (id) => {
  // this will sign a new token with the id thats passed in AKA the env variable and will expire in 30days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
