const express=require('express');
const { addProduct, setQuantity, deleteProduct, updatePrice } = require('../controlles/productControle');

const router = express.Router();

router.post('/add',addProduct)
router.put('/setquantity/:id',setQuantity)
router.put('/updateprice/:id',updatePrice)
router.delete('/delete/:id',deleteProduct)
module.exports=router;