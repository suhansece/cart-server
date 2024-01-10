const express=require('express');
const { addProduct, setQuantity, deleteProduct, updatePrice, productsList, product, categoryProductList } = require('../controlles/productControle');
const { adminProtect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.get('/',productsList);
router.get('/:id',product);
router.get('/category/:category',categoryProductList);
router.post('/add',addProduct)
router.put('/setquantity/:id',setQuantity)
router.put('/updateprice/:id',updatePrice)
router.delete('/delete/:id',deleteProduct)
module.exports=router;