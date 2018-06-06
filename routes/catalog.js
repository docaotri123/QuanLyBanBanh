var express = require('express');
var router = express.Router();


const cake_Controller=require('../controllers/cakeController');
const user_Controller=require('../controllers/userController');

//router.use(csrfProtection);

///Cake ROUTER///

// GET catalog home page.
router.get('/',cake_Controller.index);

router.get('/product/:id',cake_Controller.cakeProduct);

router.get('/cake/:id',cake_Controller.cakeDetail);

//User

module.exports=router;