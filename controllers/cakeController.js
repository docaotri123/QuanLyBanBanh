var async = require('async');

var CakeCategory=require('../models/cakeCategory');
var Cake=require('../models/cake');
var BillInfo=require('../models/billInfo');
var Bill=require('../models/bill');
var Customer=require('../models/customer');
var Admin=require('../models/admin');

exports.index=(req,res,next)=>{
    async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback);
        },
        cake1:function(callback)
        {
            Cake.find({cakeCategory:'5afa6fb13ff01b13ccce4486'},'nameCake oldPrice newPrice image')
            .populate('cakeCategory')
            .exec(callback);
        },
        cake2:function(callback)
        {
            Cake.find({cakeCategory:'5afa6fb13ff01b13ccce4487'},'nameCake oldPrice newPrice image')
            .populate('cakeCategory')
            .exec(callback);
        },
        cake3:function(callback)
        {
            Cake.find({cakeCategory:'5afa6fb13ff01b13ccce4488'},'nameCake oldPrice newPrice image')
            .populate('cakeCategory')
            .exec(callback);
        },
        highPriceCake:function(callback)
        {
            Cake.find({},'nameCake newPrice oldPrice image')
            .sort({newPrice:-1})
            .populate('cakeCategory')
            .exec(callback)
        }
    },(err,results)=>{
        //list cake
        let listCake1=[];
        let listCake2=[];
        let listCake3=[];


        let Cakes1=results.cake1;
        let Cakes2=results.cake2;
        let Cakes3=results.cake3;
        //LENGTH
        let len1=Cakes1.length;
        let len2=Cakes2.length;
        let len3=Cakes3.length;
        //LENGTH=3
        if(len1>3)
            len1=3;
        if(len2>3)
            len2=3;
        if(len3>3)
            len3=3;
        //
        for(let i=0;i<len1;i++)
        {
            listCake1.push(Cakes1[i]);       
        }
        for(let i=0;i<len2;i++)
        {
            listCake2.push(Cakes2[i]);       
        }
        for(let i=0;i<len3;i++)
        {
            listCake3.push(Cakes3[i]);       
        }
        //list high price cake
        let HighPriceCake=results.highPriceCake;
        let listHighCake=[];
        let len=HighPriceCake.length;
        if(len>8)
            len=8
        for(let i=0;i<len;i++)
            listHighCake.push(HighPriceCake[i]);

        //Name cakeCategory
        let nameCate1=Cakes1[0].cakeCategory.nameCategory;
        let nameCate2=Cakes2[0].cakeCategory.nameCategory;
        let nameCate3=Cakes3[0].cakeCategory.nameCategory;
        //Render View
        res.render('partials/index',{title:'Home',cakeCategory:results.cakeCategory,
        cakes1:listCake1,cakes2:listCake2,cakes3:listCake3,
        Cakes2:Cakes2,
        nameCate1:nameCate1,nameCate2:nameCate2,nameCate3:nameCate3,
        listHighCake:listHighCake});
    }
    )
}

exports.cakeProduct=(req,res,next)=>{
    async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback);
        },
        cakes:function(callback){
            Cake.find({cakeCategory:req.params.id},'nameCake oldPrice newPrice image')
            .populate('cakeCategory')
            .exec(callback);
        } 
   },(err,results)=>{
    //successfully,so render.
    let cakes=results.cakes;
    let listCake=[];
    let arr=[];
    let len=3;
    for(let i=0;i<cakes.length;i++)
    {
        if(i<cakes.length)
        {
            listCake.push(cakes.slice(i,i+3));
        }          
        else
        {
            listCake.push(cakes.slice(i,cakes.length));
        }
        i+=2;
    }
    res.render('partials/product',{
        title:'Product',
        cakeCategory:results.cakeCategory,
        listCake:listCake
    });
       
   })
}

exports.cakeDetail=(req,res,next)=>{
   async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback);
        },
        cakeDetail:(callback)=>{
            Cake.findById(req.params.id)
            .populate('cakeCategory')
            .exec(callback);
        },
        
   },(err,results)=>{
    if (results.cakeDetail==null) { // No results.
        var err = new Error('Cake not found');
        err.status = 404;
        //res.render('partials/error',{title:'Error'});
        res.send('Error');
    }
    //successfully,so render.
    let cake_detail=results.cakeDetail;
    var relatedCakes=[]; 
    
    var test=Cake.find({cakeCategory:cake_detail.cakeCategory},'nameCake newPrice oldPrice image')
    .populate('cakeCategory')
    .exec((err,relatedCake)=>{
        if (err) { return next(err); } 
        let len=relatedCake.length;
        if(len>8)
            len=8;
        for(let i=0;i<len;i++)
        {
            if(relatedCake[i].id!=cake_detail.id)
            {
                relatedCakes.push(relatedCake[i]);
            }
            if(i===len-1)
                done();
        }
    });
    done=(err)=>
    {
        if (err) { return next(err); } 
        res.render('partials/cakeDetail',{title:'Cake Detail',
        cakeCategory:results.cakeCategory,
        data:results.cakeDetail,relatedCakes:relatedCakes});
    }
   })
}

exports.about=(req,res,next)=>{
    async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback);
        }
   },(err,results)=>{

    //successfully,so render.
    res.render('partials/about',{title:'About us',cakeCategory:results.cakeCategory,
    data:results.cakeDetail});
   })
}

exports.contact=(req,res,next)=>{
    async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback);
        }
   },(err,results)=>{

    //successfully,so render.
    res.render('partials/about',{title:'About us',cakeCategory:results.cakeCategory,
    data:results.cakeDetail});
   })
}