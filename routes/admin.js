var express = require('express');
var router = express.Router();

var adminController=require('../controllers/admin');

router.get('/addCategory',adminController.addCategory_get);

module.exports=router;