const express = require('express');
const { createUser, loginUser, userDetails, addtoCart, deleteFromCart, buy, addNoOfItems, userDetailsAdmin } = require('../controlles/userControle');
const { protect, adminProtect } = require('../middleware/authMiddleWare');
const { addBalance } = require('../controlles/adminControle');
const router = express.Router();

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/buy',protect,buy);
router.put('/addtocart',protect,addtoCart);
router.put('/deletefromcart/:id',protect,deleteFromCart);
router.put('/addnoofitems/:id',protect,addNoOfItems);
router.get('/',protect,userDetails);
router.get('/:username',userDetailsAdmin);
router.put('/addbalance/:username',addBalance);

module.exports=router;