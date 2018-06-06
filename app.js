var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var expressHbs=require('express-handlebars');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');


var index = require('./routes/index');
var catalog = require('./routes/catalog'); // Import routes for "catalog" area of site



//GHi Data
//var ghidate=require('./writeData');
var configDb=require('./config/database');
var app = express();
mongoose.Promise=global.Promise;


mongoose.connect(configDb.url)
  .then(() =>  console.log('connection mongodb succesful'))
  .catch((err) => console.error(err));

  require('./config/passport')(passport); // 

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine', '.hbs');

// Uncomment after placing your favicon in /public
app.use(logger('dev'));// sử dụng để log mọi request ra console
app.use(bodyParser.json());// lấy thông tin từ form HTML
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());// sử dụng để đọc thông tin từ cookie

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'xxx'})); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.use((req,res,next)=>{
  res.locals.login=req.isAuthenticated();
  console.log('-------------',req.isAuthenticated());
  next();
});

require('./routes/user.js')(app, passport);
app.use('/', index);
app.use('/catalog', catalog); // Add catalog routes to middleware chain.




// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function(){
  console.log("Port is listening port 3000");
});

module.exports = app;
