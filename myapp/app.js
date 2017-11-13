var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var ejs =require('ejs');
var mongoose=require('mongoose');
var fs=require('fs');
mongoose.connect('mongodb://localhost/test');
var app = express();

// 设置视图模块目录
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//将 jade模板改为 html
// app.engine('html',ejs.__express);
// app.set('view engine','html');

// 使用handlebars模板
var cons=require('consolidate');
var exphbs=require('express-handlebars');
var hbs=require('hbs');
app.engine('hbs', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// 捕获404页面
app.use(function(req, res, next) {
    res.status(404).send('Sorry Not Found!')
    next(err);
});

/// error handlers

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


module.exports = app;
