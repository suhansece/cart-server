const express=require('express');
const { addProduct, setQuantity, deleteProduct, updatePrice, productsList, product, categoryProductList } = require('../controlles/productControle');
const { adminProtect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.get('/',productsList);
router.get('/:id',product);
router.get('/category/:category',categoryProductList);
router.post('/add',adminProtect,addProduct)
router.put('/setquantity/:id',adminProtect,setQuantity)
router.put('/updateprice/:id',adminProtect,updatePrice)
router.delete('/delete/:id',adminProtect,deleteProduct)
module.exports=router;