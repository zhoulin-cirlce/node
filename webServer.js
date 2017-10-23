var http=require('http');
var fs=require('fs');
var url=require('url');
http.createServer(function(request,response){
    var pathname=url.parse(request.url).pathname;
    console.log('Request for:'+pathname);
    fs.readFile(pathname.substr(1),function(err,data){ //路径去掉第一个目录分隔符
        if(err){
            console.log(err);
            response.writeHead(404,{'Content-Type':'text/html'});
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(data.toString());
        }
        response.end();
    })
}).listen(8008);
console.log('Server is Listening http://127.0.0.1:8008')
//访问同级目录下的127.0.0.1：8008/index.html即可
