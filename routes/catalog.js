var express = require('express');
var router = express.Router();

var cake_Controller=require('../controllers/cakeController');

///Cake ROUTER///

// GET catalog home page.
router.get('/',cake_Controller.index);

router.get('/product/:id',cake_Controller.cakeProduct);

router.get('/cake/:id',cake_Controller.cakeDetail);



module.exports=router;