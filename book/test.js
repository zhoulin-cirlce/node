//1.fs读取文件
// var fs=require('fs');
// fs.readFile('./../out.txt',(err,data)=>{
//     console.log(data);
// });

//2.用http创建一个服务
// var http=require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end('Hello Zhou!');
// }).listen(3000);
// console.log('Server is running at http://localhost:3000');

// 3.文件可读流
// var fs=require('fs');
// var readStream=fs.createReadStream('../out.txt');
// readStream.on('data',function(chunk){
//     console.log(chunk);
// });
// readStream.on('end',function(){
//     console.log('is end');
// });

// 4.将一张图片请求用流的形式写入
var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'image/png'});
    fs.createReadStream('./test.png').pipe(res);
}).listen(3000);
console.log('Server is running at http://localhost:3000');