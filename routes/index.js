var express = require('express');
var router = express.Router();
var cake_Controller=require('../controllers/cakeController');

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});



router.get('/checkout',(req,res)=>{
  res.render('partials/checkout',{title:'Checkout'});
});

router.get('/myaccount',(req,res)=>{
  res.render('partials/myaccount',{title:'My Account'});
});

router.get('/about',cake_Controller.about);


router.get('/contact',cake_Controller.contact);


module.exports=router;