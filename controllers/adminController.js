const async = require('async');

const CakeCategory=require('../models/cakeCategory');
const Cake=require('../models/cake');
const CakeCategoryVM=require('../models/viewmodel/cakeCategory'); 
const CakeVM=require('../models/viewmodel/cake'); 
const Customer=require('../models/customer');
const CustomerVM=require('../models/viewmodel/customer');

//cakeCategory
exports.category_get=(req,res,next)=>{
    if (res.locals.styleAccount != 1)
        res.redirect('/catalog');
    else {
        async.parallel({
            cakeCategory: function (callback) {
                CakeCategory.find({}, 'nameCategory')
                    .exec(callback)
            }
        }, (err, result) => {
            let data = [];
            let x;
            let rs = result.cakeCategory;
            for (let i = 0; i < rs.length; i++) {
                x = new CakeCategoryVM({
                    id: rs[i].id,
                    stt: i + 1,
                    nameCategory: rs[i].nameCategory
                });
                data.push(x);
            }
            res.render('admin/category',
                {
                    title: 'Category',
                    cakeCategory: data
                }
            );
        });
    }
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
    async.parallel({
        cakes:(cb)=>{
            Cake.find({cakeCategory:req.param('idCategory')},'')
            .populate('cakeCategory')
            .exec(cb)
        }
    },(err,result)=>{
        if(err)
            return err;
        let cakes=result.cakes;
        console.log(cakes);
        if(cakes.length>0)
        {
            console.log(`Don't delete`);
            res.redirect('/admin/category'); 
        }
        else{
            CakeCategory.deleteOne({_id:req.param('idCategory')})
            .exec((err)=>{
                if(err)
                    return err;
                console.log('Deleted successfully')
                res.redirect('/admin/category'); 
            });
        }
    })
}

exports.editCategoty_post=(req,res,next)=>{
    console.log(req.param('id1Category'));
    CakeCategory.findById(req.param('id1Category'),(err,doc)=>{
        if(err)
            handleError(err);
        doc.nameCategory=req.param('nameCategory');

        doc.save((err)=>{
            if(err)
                handleError(err);
            console.log('Updated successfully');
            res.redirect('/admin/category');
        });
    });
}
//
//cake
exports.cake_get=(req,res)=>{
    if (res.locals.styleAccount != 1)
        res.redirect('/catalog');
    else {
        async.parallel({
            cakeCategory: function (callback) {
                CakeCategory.find({}, 'nameCategory')
                    .exec(callback);
            },
            cake: (cb) => {
                Cake.find({}, 'nameCake oldPrice newPrice cakeCategory image')
                    .populate('cakeCategory')
                    .sort({ cakeCategory: -1 })
                    .exec(cb)
            }
        }, (err, result) => {
            let data = [];
            let xx;
            let rs = result.cake;
            for (let i = 0; i < rs.length; i++) {
                xx = new CakeVM({
                    stt: i + 1,
                    nameCake: rs[i].nameCake,
                    oldPrice: rs[i].oldPrice,
                    newPrice: rs[i].newPrice,
                    cakeCategory: rs[i].cakeCategory.nameCategory,
                    image: rs[i].image
                });
                data.push(xx);
            }

            res.render('admin/cake',
                {
                    title: 'Cake',
                    cakeCategory: result.cakeCategory,
                    cake: result.cake
                }
            );
        });
    }
}

exports.addCake_post=(req,res)=>{
    //Category
    let func_category=(category)=>{
        return new Promise((resolve,reject)=>{
            CakeCategory.findOne({nameCategory:category},'nameCategory',(err,data)=>{
                if(err)
                    return reject(new Error(err));
                resolve(data);
            })
        });
    }
    //Cake
    let func_cake=(name,oldPrice,newPrice,category,image)=>{
        return new Promise((resolve,reject)=>{
            let cake_1=new Cake({
                nameCake:name,
                oldPrice:oldPrice,
                newPrice:newPrice,
                cakeCategory:category,
                image:image
            });
            cake_1.save(err=>{
                if(err)
                    return reject(err);
                resolve('Save Cake succesfully');
            })
        })
    }
    let SaveCake=async()=>{
        
        try{
            let category1=await func_category(req.param('select_Category'));
            let cake_1=await func_cake(req.param('nameCake'),req.param('oldPrice'),req.param('newPrice'),category1,req.param('image'));
            console.log(cake_1);
        }catch(e)
        {
            console.log(e+'');
            res.redirect('/admin/cake');
        }

    }
    SaveCake();
    res.redirect('/admin/cake');
}

exports.deleteCake_post=(req,res)=>{
    console.log(req.param('idCake'));
    
    Cake.deleteOne({_id:req.param('idCake')})
    .exec((err)=>{
        if(err)
        {
            console.log(err+'');
            res.redirect('/admin/cake');
        }
        console.log('Delete successfully');
            res.redirect('/admin/cake');
    })
}

exports.editCake_post=(req,res)=>{
    let category=(nameCategory)=>{
        return new Promise((resolve,reject)=>{
            CakeCategory.findOne({nameCategory:req.param('select_Category_1')},(err,data)=>{
                if(err)
                    return reject(err);
                resolve(data);
            })
        })
    }
    let editCake=(cate)=>{
        return new Promise((resolve,reject)=>{
            Cake.findById(req.param('idCake'),(err,doc)=>{
                if(err)
                    return reject(err);

                doc.nameCake=req.param('nameCake');
                doc.oldPrice=req.param('oldPrice');
                doc.newPrice=req.param('newPrice');
                doc.cakeCategory=cate;
                doc.image=req.param('image');
        
                doc.save((err)=>{
                    if(err)
                        return reject(err);
                    resolve('Updated Cake successfully')
                });
            });
        })
    }
    let SaveDate=async ()=>{
        try{
            let cate=await category(req.param('select_Category_1'));
            let cake=await editCake(cate);
            console.log(cake);
        }catch(e){
            console.log(e+'');
        }
        finally{
            res.redirect('/admin/cake');
        }
    }
    SaveDate();
}

//customer
exports.customer_get=(req,res,next)=>{
    if (res.locals.styleAccount != 1)
        res.redirect('/catalog');
    else {
        async.parallel({
            customer: function (callback) {
                Customer.find({}, 'name username isVerified phone email')
                    .exec(callback)
            }
        }, (err, result) => {
            let data = [];
            let x;
            let rs = result.customer;
            for (let i = 0; i < rs.length; i++) {
                x = new CustomerVM({
                    id: rs[i].id,
                    stt: i + 1,
                    name: rs[i].name,
                    username: rs[i].username,
                    isVerified: rs[i].isVerified,
                    phone: rs[i].phone,
                    email: rs[i].email
                });
                data.push(x);
            }
            res.render('admin/customer',
                {
                    title: 'Customer',
                    customer: data
                }
            );
        });
    } 
}
