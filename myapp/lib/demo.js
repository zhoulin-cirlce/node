//查看
module.exports.findAll=function(req,res,next){
    res.render('index', { title: '查看全部',author:'kk0'});
}
//添加
module.exports.insert=function(req,res,next){
     res.render('users', { title: '添加',author:'kk1'});
}
//根据id
module.exports.getById=function(req,res,next){
    res.render('users',{title:'查看',author:"123456"});

}
//删除
module.exports.remove=function(req,res,next){
    res.render('users',{title:'删除',author:'delete circle!'});
}
//修改
module.exports.update=function(req,res,next){
    res.render('users',{title:'修改',author:'circle to keyue'});
}