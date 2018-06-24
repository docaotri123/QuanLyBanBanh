// config/passport.js
var LocalStrategy   = require('passport-local').Strategy;
var User=require('../models/customer');
var bcrypt=require('bcrypt-nodejs');
var nodemailer = require("nodemailer");
 function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "maihuutuan.jp@gmail.com",
        pass: "danghuulip"
    }
});
 function validPassword(password,user) {
    console.log('*****',bcrypt.compareSync(password, user.password));
    return bcrypt.compareSync(password, user.password);
};

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        }).catch(function (err){
			console.log(err);
		})
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        process.nextTick(function() {
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                console.log('--------Ton Tai Roi--------------');
                return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
            }
                else {
    
                let newUser = new User(
                    {
                        name    : req.param('name'),
                        username:req.param('username'),
                        password : generateHash(password),
                        phone:req.param('phone'),
                        email:req.param('email'),
                        style:0
                    }
                );

                newUser.save(function(err) {
                    if (err)
                         throw err;
                         var link="http://"+req.get('host')+"/verify?id="+newUser._id;
                         let mailOptions={
                             from: ' "Grocery Shoppy" <maihuutuan.jp@gmail.com>',
                             to : newUser.email,
                             subject : "Please confirm your Email account",
                             html : "Hello,"+newUser.username+"<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                         };
                         smtpTransport.sendMail(mailOptions, (error, info) => {
                             if (error) {
                                 return console.log(error);
                             }
                             console.log('Message sent: %s', info.messageId);
                             // Preview only available when sending through an Ethereal account
                             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
             
                             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                         });
                    return done(null, newUser);
                });
          
            }

        });    

        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!validPassword(password,user))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                if (!user.isVerified) {
                   
                    return done(null, false, req.flash('loginMessage', 'Tài khoản chưa được kích hoạt'));
            } 
            // all is well, return successful user
            return done(null, user);
        });

    }));   

}
