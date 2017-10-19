var net=require('net');
var client=net.connect({port:8000},function(){  //返回一个新的 'net.Socket'，并连接到指定的地址和端口
    console.log('连接到服务器！');
});
client.on('data',function(data){  //接收到服务端发送数据
    console.log(data.toString());
    client.end();  //关闭连接，显示的发送一个FIN包
});
client.on('end',function(){ //Socket半关闭状态，可能有FIN包正在发送，则或断开,如上client.end()会触发该事伯
    console.log('断开与服务器的连接')
});
