var express = require('express');
var router = express.Router();
var cake_Controller = require('../controllers/cakeController');
var Product = require('../models/cake');
var Cart = require('../models/cart');
const Bill = require('../models/bill');
const BillInfo = require('../models/billInfo');
// GET home page.
router.get('/', function (req, res) {
  res.redirect('/catalog');
});



router.get('/checkout', (req, res) => {
  res.render('partials/checkout', { title: 'Checkout' });
});

router.get('/myaccount', (req, res) => {
  res.render('partials/myaccount', { title: 'My Account' });
});

router.get('/about', cake_Controller.about);


router.get('/contact', cake_Controller.contact);

router.post('/add-to-card/:id', function (req, res, next) {
  var productId = req.params.id;
  console.log(req.params.id);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });

});

router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('partials/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('partials/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.post('/payment', (req, res) => {
  if (res.locals.login) {
    //create bill
    let bill = Bill({ dateCheckIn: Date.now(), dateCheckOut: null, disCount: 0, status: 'Chưa thanh toán', address: req.param('address'), customer: res.locals.user });
    // bill.save(err => {
    //   if (err)
    //     return err;
    // });
    // //create billInfo
    // const items = req.session.cart.items;
    
    // let i=0;
    // for (let item in items) {
    //   let billinfos = new BillInfo({ cake: items[item].item, bill: bill, priceNow: items[item].price, count: items[item].qty });
    //   billinfos.save();

    // }
    // console.log(billinfos);
    
    req.session.cart=null;
    res.redirect('/shopping-cart');
  } else {
    res.redirect('/shopping-cart');
  }
});
module.exports = router;