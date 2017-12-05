var demopost=require('./../lib/index')

//导出所有路由
module.exports=function(app){
    app.get('/',demopost.findAll);
    app.use('/users', require('./users'));
    //捕获404页面
    app.use(function(req, res, next) {
        res.status(404).send('Sorry Not Found!')
        next(err);
    })
}

