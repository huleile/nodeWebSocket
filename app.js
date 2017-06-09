var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');

var http = require('http');
var URL = require('url');

var app = express();
app.use(session({
  secret:'secret',
  cookie:{
    maxAge:1000*60*60
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//拦截器
app.use(function (req, res, next) {
  if (req.session.name) {  // 判断用户是否登录
    next();
  } else {
    // 解析用户请求的路径
    var urp = URL.parse(req.url);
    console.log(urp);
    if (urp.path=="/login"){
      next();
    } else {  // 登录拦截
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
      res.redirect('/login');  // 将用户重定向到登录页面
    }
  }
});

module.exports = app;
