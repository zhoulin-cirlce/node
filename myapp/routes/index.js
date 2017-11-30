// var express = require('express');
// var router = express.Router();
var demopost=require('./../lib/index')
/* GET home page. */
// router.get('/',demopost.findAll);



// module.exports = router;

module.exports=function(app){
    app.get('/',demopost.findAll);
    app.use('/users', require('./users'));
    //捕获404页面
    app.use(function(req, res, next) {
        res.status(404).send('Sorry Not Found!')
        next(err);
    })
}

