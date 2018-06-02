var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var expressHbs=require('express-handlebars');


var index = require('./routes/index');
var catalog = require('./routes/catalog'); // Import routes for "catalog" area of site

//GHi Data
//var ghidate=require('./writeData');

var app = express();

mongoose.connect('mongodb://trido:123456@ds247178.mlab.com:47178/trido',function(err){
  if(err)
      console.log('Conected fail');
  else
      console.log('App is connected with mongodb');
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine', '.hbs');

// Uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
