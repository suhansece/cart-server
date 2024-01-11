const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const adminModels = require("../models/adminModels");

const createAdmin = asyncHandler(async (req, res) => {
  const {username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const emailExist = await adminModels.findOne({ email });
  if (emailExist) {
    res.status(400);
    throw new Error("Email Already exist");
  }
  const usernameExist = await adminModels.findOne({ username });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username Already exist");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await adminModels.create({
      username,
      email,
      password: hashedpassword,
      type:'admin'
    });
    res.cookie("token", generateJWT(user._id));
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
});

const loginAdmin = async (req, res) => {

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try{
  const user = await adminModels.findOne({ username });
  const pass=await bcrypt.compare(password, user.password)
  console.log(user)
  if (user && pass) {
    res.cookie("token", generateJWT(user._id));
    res.status(200).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid userdetails" });
  }
}catch(e){
  console.log(e);
}
};

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETKET, {
      expiresIn: "5h",
    });
  };

module.exports={loginAdmin,createAdmin}
