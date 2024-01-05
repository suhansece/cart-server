const express=require('express');
const { addProduct, setQuantity, deleteProduct, updatePrice, productsList } = require('../controlles/productControle');
const { adminProtect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.get('/',productsList);
router.post('/add',adminProtect,addProduct)
router.put('/setquantity/:id',adminProtect,setQuantity)
router.put('/updateprice/:id',adminProtect,updatePrice)
router.delete('/delete/:id',adminProtect,deleteProduct)
module.exports=router;