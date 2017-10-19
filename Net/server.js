var net=require('net');
net.createServer(function(connection){
    console.log('client connected');
    connection.on('end',function(){ //当socket另一端发送FIN包时触发，客户端断开连接
        console.log('客户端关闭连接')
    });
    connection.write('hello world\n');
    connection.pipe(connection); //绑定Writable到connection上，将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷
}).listen(8000,function(){
    console.log('Server is listening...')
})

