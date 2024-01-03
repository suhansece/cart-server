const express=require('express');
const { addProduct, setQuantity, deleteProduct } = require('../controlles/productControle');

const router = express.Router();

router.post('/add',addProduct)
router.put('/setquantity/:id',setQuantity)
router.delete('/delete/:id',deleteProduct)
module.exports=router;