var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//解析请求体
var ejs =require('ejs');
var mongoose=require('mongoose');
var fs=require('fs');
var session=require('express-session');
// mongoose.connect('mongodb://localhost/test');
var app = express();
var routes=require('./routes');
//路由
routes(app);
var ws=require('./websocket');
ws(app);
// 设置视图模块目录
app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'jade');
//将 jade模板改为 html
// app.engine('html',ejs.__express);
// app.set('view engine','html');
 
app.set('view cache',true);  //视图缓存在开发模式下禁用,在生产时启用,此处是显示的让视图缓存一直启用
// 使用handlebars模板
var cons=require('consolidate');
var exphbs=require('express-handlebars');
var hbs=require('hbs');
app.engine('hbs', exphbs({
  layoutsDir: 'views',  //公共组件
  partialsDir:'views/partials', //暴露局部组件位置
//   helpers:hbsHelper,
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//bodyparser改成 urlencoded可以忽略一些 Node窗口里的警告
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));



//session会话存储基本配置,存储在服务端,返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中.
// app.user(session({
//     secret: 'sessiontest',//与cookieParser中的一致
//     resave: true,
//     saveUninitialized:true
// }));



// development error handler
// development only 开发模式 (检查错误)
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
