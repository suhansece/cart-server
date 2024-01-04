const userModels = require("../models/userModels");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const prodectsModels = require("../models/prodectsModels");
const { default: mongoose } = require("mongoose");

const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const emailExist = await userModels.findOne({ email });
  if (emailExist) {
    res.status(400);
    throw new Error("Email Already exist");
  }
  const usernameExist = await userModels.findOne({ username });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username Already exist");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await userModels.create({
      name,
      username,
      email,
      password: hashedpassword,
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

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const user = await userModels.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie("token", generateJWT(user._id));
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid userdetails" });
  }
};

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKET, {
    expiresIn: "1d",
  });
};

const userDetails = async (req, res) => {
  try {
    const user = await userModels.findById(req.user.id);
    user.password = "";
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
};

const addtoCart = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await userModels.findById(req.user.id);

    const isProductInCart = user.cart.some(
      (product) => product.cartitems == _id
    );

    if (!isProductInCart) {
      const cart = await userModels.updateOne(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              cartitems: _id,
            },
          },
        }
      );
      res.status(200).json(cart);
    } else {
      res.status(400).json({ message: "Item already in cart" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid product" });
  }
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await userModels.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isProductInCart = user.cart.some(
      (product) => product.cartitems == id
    );

    if (isProductInCart) {
      await userModels.updateOne(
        { _id: req.user.id },
        { $pull: { cart: { cartitems: id } } }
      );

      const updatedUser = await userModels.findById(req.user.id);

      res.status(200).json(updatedUser.cart);
    } else {
      res.status(404).json({ error: "Product not found in the user's cart" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addNoOfItems = async (req, res) => {
  const { id } = req.params;
  const {noOfItems} = req.body;
  try {
     await userModels.updateOne(
      { _id: req.user.id, "cart._id": id },
      {
        $set: { "cart.$.noOfItems": noOfItems },
      }
    );
    res.status(200).json({Status:"success"});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const buy = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModels.findById(id);
    const cartitems = user.cart;
    var total = 0;
    for (const item of cartitems) {
      const itemcost = await prodectsModels.findById(item.cartitems);
      total += itemcost.price * item.noOfItems;
    }
    if (total <= user.balance) {
      await userModels.updateOne(req.user, { balance: user.balance - total });
      await userModels.updateOne(
        { _id: id },
        {
          $set: {
            cart: [],
          },
        }
      );
      for (const item of cartitems) {
        const itemcost = await prodectsModels.findByIdAndUpdate(
          item.cartitems,
          {
            $inc: { quantity: -item.noOfItems },
          }
        );
      }
      res.status(200).json({ Status: "Success" });
    } else {
      res.status(400).json({ message: "Invalid Balance" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  userDetails,
  addtoCart,
  deleteFromCart,
  buy,
  addNoOfItems,
};
