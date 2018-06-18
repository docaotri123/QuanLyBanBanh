var userController=require('../controllers/userController');
// app/routes.js
module.exports = function(app, passport) {
  

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user/profile', // Điều hướng tới trang hiển thị profile
    failureRedirect : '/', // Trở lại trang đăng ký nếu lỗi
    failureFlash : true 
  }));

  app.post('/signin', passport.authenticate('local-login', {
    successRedirect : '/user/profile',
    failureRedirect : '/', 
    failureFlash : true
}));

  app.get('/user/profile',isLoggedIn,userController.profile);

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
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}