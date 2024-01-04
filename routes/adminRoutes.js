const express = require('express');
const { loginAdmin, createAdmin } = require('../controlles/adminControle');
const router = express.Router();

router.post('/login',loginAdmin);
router.post('/register',createAdmin);

module.exports=router;