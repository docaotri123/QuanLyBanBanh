var async = require('async');

var CakeCategory=require('../models/cakeCategory');
var Cake=require('../models/cake');
var BillInfo=require('../models/billInfo');
var Bill=require('../models/bill');
var Customer=require('../models/customer');
var Admin=require('../models/admin');
var Token=require('../models/token');

exports.profile=(req,res,next)=>{
    res.render('partials/profile',{title:'Profile'});
}