var userController=require('../controllers/userController');
// app/routes.js
module.exports = function(app, passport) {
  app.post('/forgotpassword',userController.forgotpassword);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user/profile', // Điều hướng tới trang hiển thị profile
    failureRedirect : '/', // Trở lại trang đăng ký nếu lỗi
    failureFlash : false 
  }));

  app.post('/signin', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/', 
    failureFlash : true
}));

  app.get('/user/profile',isLoggedIn,userController.profile);
  app.get('/verify/',userController.verify);
  app.get('/repplyforgotpassword/',userController.Repplyforgotpassword_get);
  app.post('/repplyforgotpassword/',userController.Repplyforgotpassword_post);
  // =====================================
  // Đăng xuất ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  //edit profile
  app.post('/user/edit',userController.edit_post);

}

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
  if(res.locals.user.isVerified==false)
    res.redirect('/logout');
  if (req.isAuthenticated()&& res.locals.user.isVerified==true){
      return next();
  }
  res.redirect('/');
}