var express = require('express');
var router = express.Router();
var demopost=require('./../lib/index')
/* GET home page. */
router.get('/',demopost.findAll);
//创建
router.get('/users',demopost.insert);
//详情
router.get('/users:id',demopost.getById);
//删除
router.get('/users:id/remove',demopost.remove);
//修改
router.get('/users:id/update',demopost.update);


module.exports = router;

