console.log('App is listening momgdb');

var async = require('async');

var CakeCategory=require('./models/cakeCategory');
var Cake=require('./models/cake');
var BillInfo=require('./models/billInfo');
var Bill=require('./models/bill');
var Customer=require('./models/customer');
var Admin=require('./models/admin');

var mongoose = require('mongoose');
mongoose.connect('mongodb://trido:123456@ds247178.mlab.com:47178/trido',function(err){
    if(err)
        console.log('Conected fail');
    else
        console.log('App is connected with mongodb');
});


var cakeCategories=[];
var cakes=[];
var billInfos=[];
var bills=[];
var customers=[];
var admins=[];
//Contructor
function cakeCategoryCreate(nameCategory,cb){
    categorydetail={
        nameCategory:nameCategory
    }
    let cakeCate=new CakeCategory(categorydetail);
    cakeCate.save(function(err){
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New cakeCategory: ' + cakeCate);
        cakeCategories.push(cakeCate);
        cb(null, cakeCate);
    });
}

function cakeCreate(nameCake,oldPrice,newPrice,cakeCategory,image,cb){
    cakeDetail={
        nameCake:nameCake,
        oldPrice:oldPrice,
        newPrice:newPrice,
        cakeCategory:cakeCategory,
        image:image
    }
    let cake=new Cake(cakeDetail);
    cake.save(function(err){
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New cake: ' + cake);
        cakes.push(cake);
        cb(null,cake);
    });
}

function billInfoCreate(cake,bill,priceNow,count,cb){
    bill_InfoDetail={
       cake:cake,
       bill:bill,
       priceNow:priceNow,
       count:count
    }
    var billInfo=new BillInfo(bill_InfoDetail);
    billInfo.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New billInfo: ' + billInfo);
        billInfos.push(billInfo)
        cb(null, billInfo)
      }  
    );
}

function billCreate(dateCheckIn,dateCheckOut,discount,status,customer,address,cb){
    billDetail={
       dateCheckIn:dateCheckIn,
       dateCheckOut:dateCheckOut,
       discount:discount,
       status:status,
       customer:customer,
       address:address
    }
    var bill=new Bill(billDetail);
    bill.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New bill: ' + bill);
        bills.push(bill)
        cb(null, bill)
      }  
    );
}

function customerCreate(username,password,phone,name,email,birthday,style,cb){
    customerDetail={
       username:username,
       password:password,
       phone:phone,
       name:name,
       email:email,
       birthday:birthday,
       style:style
    }
    var cus=new Customer(customerDetail);
    cus.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New customer: ' + cus);
        customers.push(cus);
        cb(null, cus);
      }  
    );
}

function adminCreate(email,username,password,style,cb){
    adminDetail={
        email:email,
        username:username,
        password:password,
        style:style
    }
    var admin=new Admin(adminDetail);
    admin.save((err)=>{
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Admin'+admin);
        admins.push(admin);
        cb(null,admin);
    });
}

//

function createCakeCategory(cb){
    async.parallel([
        function(callback){
            cakeCategoryCreate('Pizza',callback);
        },
        function(callback){
            cakeCategoryCreate('Kem',callback);
        },
        function(callback){
            cakeCategoryCreate('Cơm tấm',callback);
        },
        function(callback){
            cakeCategoryCreate('Nước',callback);
        }
    ],
    // optional callback
    cb);
}

function createCake(cb){
    async.parallel([
        //Pizza
        function(callback){
            cakeCreate('Pizza green',500,450,cakeCategories[0],'http://jimbospizzacelina.com/menu/images/original.png',callback);
        },
        function(callback){
            cakeCreate('Pizza red',550,480,cakeCategories[0],'http://jimbospizzacelina.com/menu/images/original.png',callback);
        },
        function(callback){
            cakeCreate('Pizza Black',400,320,cakeCategories[0],'https://s-i.huffpost.com/gen/1754881/images/n-BANANA-CURRY-PIZZA-200x150.jpg',callback);
        },
        function(callback){
            cakeCreate('Pizza Hurt',700,630,cakeCategories[0],'http://discount-coupon-codes.upto75.com/uploadimages/deals/offers-11501239628-Eatza-Pizza_item1.jpg',callback);
        },
        function(callback){
            cakeCreate('Pizza Heart',480,400,cakeCategories[0],'https://i0.wp.com/1.bp.blogspot.com/-3AwwubmnxYA/Tjf2GM3v5xI/AAAAAAAAKCM/HK2O1fHipBs/s1600/001%2B-%2BClever%2BCrow%2B%25287%2529.JPG',callback);
        },
        function(callback){
            cakeCreate('Pizza Tea plus',200,180,cakeCategories[0],'https://s-i.huffpost.com/gen/2264264/images/n-SKINNY-BEACH-PIZZA-200x150.jpg',callback);
        },
        //Kem
        function(callback){
            cakeCreate('Bacon ice cream',15,12,cakeCategories[1],'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bacon_caramel_maple_ice_cream_%284728256410%29.jpg/200px-Bacon_caramel_maple_ice_cream_%284728256410%29.jpg',callback);
        },
        function(callback){
            cakeCreate('Chocolate ice',50,45,cakeCategories[1],'https://tse1.mm.bing.net/th?id=OIP.fbff4M1uYEUKFRm5bScZAgHaF2&w=190&h=150&c=8&o=5&pid=1.7',callback);
        },
        function(callback){
            cakeCreate('Cacao cream',52,45,cakeCategories[1],'https://bastaninemat.com/Uploading/Product/S_%D8%A8%D8%A7%D9%82%D9%84%D9%88%D8%A7.jpg',callback);
        },
        function(callback){
            cakeCreate('Tea ice',40,35,cakeCategories[1],'http://2.bp.blogspot.com/_OfYYlOGGnDk/SuGvyWiFvpI/AAAAAAAAAow/YV3IRxUTur8/s200/sorvete_de_abacate.jpg',callback);
        },
        function(callback){
            cakeCreate('Strawberry ice',48,40,cakeCategories[1],'http://www.supermeal.pk/ext-resources/images/000/054/000054698_strawberry-icecream.jpg',callback);
        },
        function(callback){
            cakeCreate('Cherry ice',55,50,cakeCategories[1],'http://beingcreative.me.uk/.a/6a00e5501204d988330115721f0585970b-pi',callback);
        },
        //Cơm
        function(callback){
            cakeCreate('Cơm gà',50,45,cakeCategories[2],'http://nhahangphuongvi.com/wp-content/uploads/2018/02/C%C6%A1m-t%E1%BA%A5m-g%C3%A0-n%C6%B0%E1%BB%9Bng-180x150.jpg',callback);
        },
        function(callback){
            cakeCreate('Cơm thập cẩm',50,42,cakeCategories[2],'http://chocayenso.com/wp-content/uploads/2017/11/ca-chep-gion-xao-lan1-180x150.jpg',callback);
        },
        function(callback){
            cakeCreate('Cơm bò',60,55,cakeCategories[2],'http://media.healthplus.vn/thumb_x190x150/Images/Uploaded/Share/2018/04/16/huong-dan-cach-che-bien-mon-thit-bo-xao-mang-tay-va-ot-chuong1523864662.jpg',callback);
        },
        function(callback){
            cakeCreate('Cơm cá chiên',30,28,cakeCategories[2],'http://media.healthplus.vn/thumb_x190x150/Images/Uploaded/Share/2013/11/28/1381385459282canuong1.jpg',callback);
        },
        function(callback){
            cakeCreate('Cơm miền tây',45,38,cakeCategories[2],'http://media.healthplus.vn/thumb_x190x150/Images/Uploaded/Share/2014/02/25/38fnom-pho-tai-canh-ga.jpg',callback);
        },
        //Nước
        function(callback){
            cakeCreate('Pepsi',10,10,cakeCategories[3],'http://bp2.blogger.com/_29F0LKeDjkQ/Rtgx1fsL6vI/AAAAAAAAAlg/KqkqIDDeyGM/s200/P1010237.JPG',callback);
        },
        function(callback){
            cakeCreate('CocaCola',10,10,cakeCategories[3],'https://1.bp.blogspot.com/-OBJd_1Ua_bA/Us14iK13BLI/AAAAAAAAC6Q/RbDdN3Zz1aY/s200/coca-cola-light-lattina.jpg',callback);
        },
        function(callback){
            cakeCreate('7-Up',10,10,cakeCategories[3],'http://www.supermeal.pk/ext-resources/images/000/049/000049288_7up.jpg',callback);
        },
        function(callback){
            cakeCreate('I-on Life',8,6,cakeCategories[3],'https://4.bp.blogspot.com/-p8r0z-pHk_Y/WWMBR2Sc1KI/AAAAAAAABl0/mi5L3HLoKPsSz69re17jZjOolz1fyf-pgCEwYBhgL/s200/nuoc-uong-dong-chai-naphapro-330ml.jpg',callback);
        },
        function(callback){
            cakeCreate('Phúc Long Tea',50,40,cakeCategories[3],'http://www.dendau.vn/custom/photolisting3/200x150/listing_20130529113959/20130529114525Pt9t2SMp.jpg',callback);
        },
    ],
    // optional callback
    cb);
}

function createBill(cb){
    async.parallel([
        function(callback){
            billCreate(null,null,10,'đã thanh toán',customers[0],'Tây Ninh',callback);
        },
        function(callback){
            billCreate(null,null,10,'chưa thanh toán',customers[1],'Sài Gòn',callback);
        },
        function(callback){
            billCreate(null,null,10,'đã thanh toán',customers[2],'Hà Nội',callback);
        },
        function(callback){
            billCreate(null,null,10,'đã thanh toán',customers[3],'Sài Gòn',callback);
        }
    ],
    // optional callback
    cb);
}

function createBillInfo(cb){
    async.parallel([
        function(callback){
            billInfoCreate(cakes[0],bills[0],15,2,callback);
        },
        function(callback){
            billInfoCreate(cakes[1],bills[1],15,3,callback);
        },
        function(callback){
            billInfoCreate(cakes[2],bills[2],25,1,callback);
        },
        function(callback){
            billInfoCreate(cakes[0],bills[1],15,1,callback);
        }
    ],
    // optional callback
    cb);
}

function createCustomer(cb){
    async.parallel([
        function(callback){
            customerCreate('trido123','123456','0965528621','Tri-Do','docaotri211997@gmail.com',null,1,callback);
        },
        function(callback){
            customerCreate('anhyeuem','123456','123456789','Trinh-Cao','abcd@gmail.com',null,1,callback);
        },
        function(callback){
            customerCreate('hochoc','123456','2563356655','Thị Nở','abcde@gmail.com',null,1,callback);
        },
        function(callback){
            customerCreate('dichoi','123456','096966245','Son Tung','abcdef@gmail.com',null,1,callback);
        }
    ],
    // optional callback
    cb);
}

function createAdmin(cb){
    async.parallel([
        function(callback){
            adminCreate('docaotri211997@gmail.com','admintrido','0965528621',2,callback);
        }
    ],
    // optional callback
    cb);
}


async.series([
    createCakeCategory,
    createCake,
    createCustomer,
    createAdmin,
    createBill,
    createBillInfo
],
    // Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('sUCCESS!!');
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);