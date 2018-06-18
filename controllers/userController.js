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

exports.edit_post=(req,res)=>{
    let saveCustomer=(id)=>{
        return new Promise((resolve,reject)=>{
            Customer.findById({_id:id},(err,doc)=>{
                if(err)
                    return reject(err);
                doc.name=req.param('name');
                doc.phone=req.param('phone');
                doc.email=req.param('email');
                doc.save((err)=>{
                    if(err)
                        return reject(err);
                    resolve('Edit Customer successfully');
                })
            })
        })
    }

    let display=async ()=>{
        try{
            let mess=await saveCustomer(req.param('id'));
            console.log(mess);
        }catch(e){
            console.log(e+'');
        }finally{
            res.redirect('/user/profile');
        }
    }
    display();
}