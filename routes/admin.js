var express = require('express');
var router = express.Router();

var adminController=require('../controllers/adminController');
//cakeCategory
router.get('/category',adminController.category_get);

router.post('/category',adminController.addCategory_post);
//cake
router.get('/cake',adminController.cake_get);

module.exports=router;