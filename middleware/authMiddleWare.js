const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModels')

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token passed");
  }
});

module.exports = {
  protect,
};
