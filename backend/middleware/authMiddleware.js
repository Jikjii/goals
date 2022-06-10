const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // Initalize Variable Token
  let token;

  // Checking for authorization header and making sure its a "Bearer Token"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Decode and Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the Token
      req.user = await User.findById(decoded.id).select("-password");
        // Calls the next piece of middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authroized");
    }
  }
  // If no Token is found
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

module.exports = { protect };
