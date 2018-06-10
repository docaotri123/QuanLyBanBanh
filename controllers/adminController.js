const async = require('async');

const CakeCategory=require('../models/cakeCategory');
const Cake=require('../models/cake');
const CakeCategoryVM=require('../models/viewmodel/cakeCategory'); 
const CakeVM=require('../models/viewmodel/cake'); 

//cakeCategory

exports.category_get=(req,res,next)=>{
    async.parallel({
        cakeCategory:function(callback){
            CakeCategory.find({},'nameCategory')
            .exec(callback)
        }
    },(err,result)=>{
        let data=[];
        let x;
        let rs=result.cakeCategory;
        for(let i=0;i<rs.length;i++)
        {
            x=new CakeCategoryVM({
                stt:i+1,
                nameCategory:rs[i].nameCategory
            });
            data.push(x);
        }
        res.render('admin/category',
            {
                title:'Category',
                cakeCategory:data
            }
        );
    });
}

exports.addCategory_post=(req,res,next)=>{
    let cakeCategory=new CakeCategory({
        nameCategory:req.param('nameCategory')
    });
    cakeCategory.save((err)=>{
        if(err)
            res.redirect('/');
        res.redirect('/admin/category');
    })
    
}

exports.deleteCategory_post=(req,res,next)=>{
    let x=req.param('idCategory');
    
    res.redirect('/admin/category');
}

//cake
exports.cake_get=(req,res,next)=>{
    async.parallel({
        cake:(cb)=>{
            Cake.find({},'nameCake oldPrice newPrice cakeCategory image')
            .populate('cakeCategory')
            .sort({cakeCategory:-1})
            .exec(cb)
        }
    },(err,result)=>{
        let data=[];
        let xx;
        let rs=result.cake;
        for(let i=0;i<rs.length;i++)
        {
            xx=new CakeVM({
                stt:i+1,
                nameCake:rs[i].nameCake,
                oldPrice:rs[i].oldPrice,
                newPrice:rs[i].newPrice,
                cakeCategory:rs[i].cakeCategory.nameCategory,
                image:rs[i].image
            });
            data.push(xx);
        }
        console.log(rs);
        res.render('admin/cake',
            {
                title:'Cake',
                cake:data
            }
        );
    });
}