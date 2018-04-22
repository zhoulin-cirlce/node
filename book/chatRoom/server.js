var http=require('http');
var fs=require('fs');
var mime=require('mime');  //判断文件类型
var path=require('path');
var cache={}; //用cache来缓存文件内容的对象
var chatServer=require('./lib/chat_server');


//资源不存在时
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}
//提供文件数据服务
function sendFile(response,filePath,fileContents){
    response.writeHead(
        200,
        {'Content-Type':mime.getType(path.basename(filePath))}  //1.mine.lookup()获取文件类型，如text/palian 2.在2.0版本后lookup() renamed to getType()
    );
    response.end(fileContents);
}

//检查是否在缓存中
function serverStatic(response,cache,absPath){
    if(cache[absPath]){     //检查文件是否在缓存内
        sendFile(response,absPath,cache[absPath]);  //从内存中返回文件
    }else{
        fs.exists(absPath,function(exists){ //检查文件是否存在
            if(exists){
                fs.readFile(absPath,function(err,data){ //文件存在则从硬盘中读取
                    if(err){
                        send404(response);  //读取报错则返回404
                    }else{
                        cache[absPath]=data;  //将文件写入缓存
                        sendFile(response,absPath,data); //返回子
                    }
                })
            }else{
                send404(response); //不存在文件返回404
            }
        })
    }
}

//创建一个http服务
var server=http.createServer(function(request,response){
    var filePath=false;
    if(request.url=='/'){
        filePath='public/index.html';
    }else{
        filePath='public'+request.url;
    }
    var absPath='./'+filePath;
    serverStatic(response,cache,absPath);
});
server.listen(3000,function(){
    console.log('server is running at http://localhost:3000');
});

//启动服务端的socket.io,给定它一个定义好的HTTP服务，共享一个TCP/IP端口
chatServer.listen(server);