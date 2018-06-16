var express = require('express');
var router = express.Router();

var adminController=require('../controllers/adminController');
//cakeCategory
router.get('/category',adminController.category_get);

router.post('/category',adminController.addCategory_post);

router.post('/deleteCategory',adminController.deleteCategory_post);

router.post('/editCategory',adminController.editCategoty_post);

//cake
router.get('/cake',adminController.cake_get);
router.post('/addCake',adminController.addCake_post);
router.post('/deleteCake',adminController.deleteCake_post);

module.exports=router;