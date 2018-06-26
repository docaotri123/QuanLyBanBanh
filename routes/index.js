var express = require('express');
var router = express.Router();
var cake_Controller=require('../controllers/cakeController');
var Product = require('../models/cake');
var Cart = require('../models/cart');
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

router.post('/add-to-card/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart? req.session.cart:{});
  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
  
});

router.get('/shopping-cart', function(req,res,next){
  console.log("aaaaaaaaaa");
  if(!req.session.cart){
    console.log("bbbbbbbbb");
    return res.render('partials/shopping-cart', {products: null});
  }
  console.log("ccccccccc");
  var cart = new Cart(req.session.cart);
  res.render('partials/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
module.exports=router;