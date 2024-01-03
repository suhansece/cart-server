const { default: mongoose } = require("mongoose");
const prodectsModels = require("../models/prodectsModels");

const addProduct = async (req, res) => {
  const { name, category, price } = req.body;
  try {
    const product = await prodectsModels.create({
      name,
      category,
      price,
      quantity: 0,
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
};

const setQuantity = async (req, res) => {
  const {quantity } = req.body||0;
  const {id}= req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error:"Invalid product"})
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

const deleteProduct = async(req,res)=>{
    const {id}= req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error:"Invalid product"})
}
  try {
    const product = await prodectsModels.findByIdAndDelete(id)
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ erroe: e.message });
  }
}

module.exports = { addProduct,setQuantity,deleteProduct};
