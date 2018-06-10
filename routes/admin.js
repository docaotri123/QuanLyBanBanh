var express = require('express');
var router = express.Router();

var adminController=require('../controllers/adminController');

router.get('/category',adminController.category_get);

router.get('/cake',adminController.cake_get);

module.exports=router;