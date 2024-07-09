const { default: mongoose } = require("mongoose");
const prodectsModels = require("../models/prodectsModels");

const addProduct = async (req, res) => {
  const { name, category, price,type,details,image} = req.body;
  try {
    const product = await prodectsModels.create({
      name,
      category,
      price,
      type,
      details,
      quantity: 0,
      image,
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
};

const setQuantity = async (req, res) => {
  const { quantity } = req.body || 0;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid product" });
  }
  try {
    const product = await prodectsModels.findByIdAndUpdate(id, {
      quantity: quantity,
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
  
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid product" });
  }
  try {
    const product = await prodectsModels.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
};

const updatePrice = async (req, res) => {
  const { price } = req.body;
  const { id } = req.params;

  try {
    const product = await prodectsModels.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const productsList=async(req,res)=>{
      try{
        const products = await prodectsModels.find().sort({ createdAt: -1 });
        res.status(200).json(products);
      }catch (e) {
        res.status(500).json({ error: e.message });
      }
}
const product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prodectsModels.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ error: "Product Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
const categoryProductList = async(req,res)=>{
  const {category}=req.params;
  try {
    const product = await prodectsModels.find({category:category});
      res.status(200).json(product);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}


module.exports = { addProduct, setQuantity, deleteProduct, updatePrice ,productsList,product,categoryProductList};

