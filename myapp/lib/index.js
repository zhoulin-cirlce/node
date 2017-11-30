
var insertUser=require('./module/insertUser');
var removeUser=require('./module/removeUser');
var updateUser=require('./module/updateUser');
var findUser=require('./module/findUser');
//查看
module.exports.findAll = function (req, res, next) {
    //mongoose数据库测试----
    // var silence = new Kitten({ name: 'Silence' });
    // console.log(silence.name);
    // var fluffy = new Kitten({ name: "fluffy" ,age:"18"});
    // fluffy.speak();    // "Meow name is fluffy"
    //-------mongoose数据库测试

    var data = [{ "name": "测试周麟", "url": "www.baidu.com" }, { "name": "测试珂玥", "url": "www.hao123.com" }];
    console.log(insertUser(data))
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