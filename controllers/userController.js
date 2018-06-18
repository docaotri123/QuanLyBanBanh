var async = require('async');

var CakeCategory=require('../models/cakeCategory');
var Cake=require('../models/cake');
var BillInfo=require('../models/billInfo');
var Bill=require('../models/bill');
var Customer=require('../models/customer');
var Admin=require('../models/admin');
var Token=require('../models/token');

exports.profile=(req,res)=>{
    console.log('--user--'+req.user);
    let getCustomer=(id)=>{
        return new Promise((resolve,reject)=>{
            Customer.findById({_id:id},(err,data)=>{
                if(err)
                    return reject(err);
                resolve(data);
            })
        })
    }
    let Display=async ()=>{
        let data;
        try{
            data=await getCustomer(req.user._id);
        }
        catch(e){
            console.log(e+'');
        }finally{
            res.render('partials/profile',{title:'Profile',data:data});
        }
    }
    Display();
}