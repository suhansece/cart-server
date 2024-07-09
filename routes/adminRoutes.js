const express = require('express');
const { loginAdmin, createAdmin } = require('../controlles/adminControle');
const { adminProtect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.post('/login',loginAdmin);
router.post('/register',adminProtect,createAdmin);

module.exports=router;
