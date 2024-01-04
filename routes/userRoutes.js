const express = require('express');
const { createUser, loginUser, userDetails, addtoCart, deleteFromCart, buy, addNoOfItems } = require('../controlles/userControle');
const { protect } = require('../middleware/authMiddleWare');
const router = express.Router();

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/buy',protect,buy);
router.put('/addtocart',protect,addtoCart);
router.put('/deletefromcart/:id',protect,deleteFromCart)
router.put('/addnoofitems/:id',protect,addNoOfItems)
router.get('/',protect,userDetails);

module.exports=router;