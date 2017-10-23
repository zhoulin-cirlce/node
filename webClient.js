var http=require('http');
var options={
    host:'localhost',
    port:8008,
    path:'/index.html',
    //method:'POST',
    headers:{
        // 'Content-Type':'application/x-www-form-urlencoded'
    }
}
var callback=function(res){
    var body='';
    res.on('data',function(chunk){
        body+=chunk;
    });
    res.on('end',function(){
        console.log(body);
        console.log('响应中已无数据')
    });
    req.on('error',function(e){
        console.error('请求失败:',e.message)
    })
}
var req=http.request(options,callback);
req.end();  //每一个request都需要用end()标志请求结束