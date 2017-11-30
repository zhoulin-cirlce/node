var express = require('express');
// var mongoose = require('mongoose');//导入mongoose模块

// var Users = require('../modules/users');//导入模型数据模块

var router = express.Router();
var demopost=require('./../lib/index');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// //查询所有用户数据
// router.get('/users', function(req, res, next) {
//     Users.fetch(function(err, users) {
//         if(err) {
//             console.log(err);
//         }        
//         res.render('users',{title: '用户列表', users: users})  //这里也可以json的格式直接返回数据res.json({data: users});
//     })
// })
// module.exports = router;


//创建
router.get('/',demopost.insert);
//详情
router.get('/:id',demopost.getById);
//删除
router.get('/:id/remove',demopost.remove);
//修改
router.get('/:id/update',demopost.update);

module.exports=router;