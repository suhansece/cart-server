const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/userModels');
const adminModels = require("../models/adminModels");

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

const adminProtect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKET);
      const admin=await adminModels.findById(decoded.id);
      console.log(admin)
      if(admin.type=='admin'){
        req.user = await adminModels.findById(decoded.id).select("-password");
       
      }else{
        res.status(401);
        throw new Error("not authorized");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorizeda");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token passed");
  }
});

module.exports = {
  protect,adminProtect
};
