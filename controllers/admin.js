var async = require('async');

var CakeCategory=require('../models/cakeCategory');
var Cake=require('../models/cake');


exports.addCategory_get=(req,res,next)=>{
    res.render('admin/addCategory',{title:'Add Category'});
}