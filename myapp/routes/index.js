var express = require('express');
var router = express.Router();
var demopost=require('./../lib/demo')
/* GET home page. */
router.get('/',demopost.findAll);
//创建
router.get('/user',demopost.insert);
//详情
router.get('/user:id',demopost.getById);
//删除
router.get('/user:id/remove',demopost.remove);
//修改
router.get('/user:id/update',demopost.update);


module.exports = router;

