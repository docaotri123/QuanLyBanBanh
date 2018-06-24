var async = require('async');

var CakeCategory=require('../models/cakeCategory');
var Cake=require('../models/cake');
var BillInfo=require('../models/billInfo');
var Bill=require('../models/bill');
var Customer=require('../models/customer');
var Admin=require('../models/admin');
var Token=require('../models/token');
var bcrypt=require('bcrypt-nodejs');
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "maihuutuan.jp@gmail.com",
        pass: "danghuulip"
    }
});
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
exports.verify =(req,res)=>{
    Customer.findById({_id:req.query.id},(err,doc)=>{
        if(err)
            return reject(err);
            var new_customer = new Customer({
                isVerified:true,
                _id:doc._id
            });
          
            Customer.findByIdAndUpdate(doc._id, new_customer, {}, function (err,result) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect('/');
            });
        })

}
exports.forgotpassword = (req,res) => {
    Customer.findOne({ 'username' :  req.body.username }, function(err, user) {

                 var link="http://"+req.get('host')+"/repplyforgotpassword?id="+user._id;
                 let mailOptions={
                     from: ' "Grocery Shoppy" <maihuutuan.jp@gmail.com>',
                     to : user.email,
                     subject : "Please confirm your Email account",
                     html : "Hello,"+user.username+"<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a>"
                 };
                 smtpTransport.sendMail(mailOptions, (error, info) => {
                     if (error) {
                         return console.log(error);
                     }
                 });
        

           res.redirect('/');
}); 
}
exports.Repplyforgotpassword_get = (req, res) =>{
   res.render('partials/repplypassword',{id:req.query.id});
}
exports.Repplyforgotpassword_post = (req, res) =>{
    console.log(req.body.id);

    var new_customer = new Customer({
        isVerified: true,
        password : generateHash(req.body.password),
        _id:req.body.id
    });
    Customer.findByIdAndUpdate(req.body.id, new_customer, {}, function (err,result) {
        if (err) { return next(err); }
        // Successful - redirect to genre detail page.
        res.redirect('/');
    });
}