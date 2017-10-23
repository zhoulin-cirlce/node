var express = require('express');
var app = express();
var fs = require('fs');
//获取用户列表
app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});
//添加用户,此示例并没有更改到文件内部
var user4 = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}
app.get('/addUser', function (req, res) {
    fs.readFile(__dirname+"/users.json",'utf8',function(err,data){
        data=JSON.parse(data);
        data["user4"]=user4["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    })
});
//删除用户
app.get('/deleteUser/:id',function(req,res){
    fs.readFile(__dirname+'/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        delete data["user"+req.params.id];
        res.end(JSON.stringify(data));
    })
});
//显示用户详情
app.get('/:id',function(req,res){
    fs.readFile(__dirname+'/users.json','utf8',function(err,data){
        data=JSON.parse(data);
        var user=data["user"+req.params.id]; //获取请求参数
        console.log(user);
        delete data["user"+2];
        res.end(JSON.stringify(user));
    })
});
var server = app.listen(8008, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://", host, port)
})