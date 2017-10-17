var http=require('http');
var url=require('url');
function start(route){
    function onRequest(request,response){
        var pathname=url.parse(request.url).pathname;
        console.log("Request for"+pathname+ 'received.');
        route(pathname);
        response.writeHead(200,{'Content-Type':'text/plain'});  //设置请求头
        response.write('hello world');  //写一个结果到流中
        response.end();  //结束发送请求
    }
    http.createServer(onRequest).listen(8888);// 新建一个http服务，onRequest函数作为参数，自动添加到request事件，也就是会发起一个请求
    console.log('Server has started.');
}
exports.start=start;

