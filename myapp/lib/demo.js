// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/test'; // 数据库为 test
// //mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
// var insertData = function(db, callback) {  
//     //连接到表 site
//     var collection = db.collection('site');
//     //插入数据
//     var data = [{"name":"baidu","url":"www.baidu.com"},{"name":"hao123","url":"www.hao123.com"}];
//     collection.insert(data, function(err, result) { 
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }     
//         callback(result);
//     });
// }
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
// insertData(db, function(result) {
//     console.log(result);
//     db.close();
// });
// });

//建立与数据库的连接
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test")
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("已连接！")
});

//查看
module.exports.findAll = function (req, res, next) {
    var data = [{ "name": "周麟", "url": "www.baidu.com" }, { "name": "珂玥", "url": "www.hao123.com" }];
    db.collection('site').insert(data)
    db.collection('site').update({ "name": "周麟" }, { $set: { "url": "www.zk.com" } }, { multi: true })
    res.render('index', { title: 'tit', author: 'kk0' });
}
//添加
module.exports.insert = function (req, res, next) {
    res.render('users', { title: '添加', author: 'kk1' });
}
//根据id
module.exports.getById = function (req, res, next) {
    res.render('users', { title: '查看', author: "123456" });

}
//删除
module.exports.remove = function (req, res, next) {
    res.render('users', { title: '删除', author: 'delete circle!' });
}
//修改
module.exports.update = function (req, res, next) {
    res.render('users', { title: '修改', author: 'circle to keyue' });
}