//--------------------node EventEmitter类应用--------------------//
// //引入模块
// var events = require('events');
// //创建一个 eventEmitter 对象实例
// var eventEmitter = new events.EventEmitter();
// //事件处理程序
// var connectHandler = function connected() {
//     console.log('连接成功！');
//     //触发 data_received 事件
//     eventEmitter.emit('data_received');
// }
// //绑定事件
// eventEmitter.on('connection', connectHandler);
// eventEmitter.on('data_received', function () {
//     console.log('数据连接成功！');
// });
// //触发事件
// eventEmitter.emit('connection');
// console.log('程序执行完毕！');

//-----------回调函数-----------
// var fs=require('fs');  //加载node的fs模块，文件系统
// var data=fs.readFileSync('input.txt');      //读取文件内容
// console.log(data.toString());
// console.log('程序执行结束！');

// 异步
// var fs=require('fs');
// fs.readFile(__dirname+'/input.txt',function(err,data){
//     if(err) return console.error(err);
//     console.log(data.toString());
// });
// console.log("程序执行结束！");

//--------EventEmitter类应用-----
//引入事件模块
// var events = require('events');
// //实例化一个EventEmitter对象
// var eventEmitter = new events.EventEmitter();
// //创建一个事件处理程序1
// var listner1 = function listner1() {
//     console.log('监听器listenr1执行。');
// }
// //创建一个事件处理程序2
// var listner2 = function listner2() {
//     console.log('监听器listenr2执行。');
// }
// //以两种不同的方式监听connection事件
// eventEmitter.addListener('connection', listner1);
// eventEmitter.on('connection', listner2);
// //计算connection绑定的事件个数
// var eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
// console.log(eventListeners + "个监听器监听连接事件。");
// //触发connection事件
// eventEmitter.emit('connection');
// //移除connection上绑定的一个事件listner1
// eventEmitter.removeListener('connection', listner1);
// console.log('listner1不再受监听。');
// //计算connection绑定的事件个数
// eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
// console.log(eventListeners + '个监听器监听连接事件。');
// //绑定error事件
// var emitter = new events.EventEmitter();
// // emitter.emit('error');

// console.log('程序执行完毕！')


//--------------------缓冲区Buffer-----------
// var buf=new Buffer(256);  //新建一人256字节长度的缓冲区
// len=buf.write('www.runbot');
// console.log("写入字节数："+len)

//显示编码转换
// buf=new Buffer(26);
// for(var i=0; i<26; i++){
//     buf[i]=i+97;  //ASCII码算出buf为26个小写字母
// }
// console.log(buf.toString('ascii'));  //指定展示类型
// console.log(buf.toString('ascii',0,5)); //索引为0-5
// console.log(buf.toString('utf8',0,5));
// console.log(buf.toString(undefined,0,5)); //undefined默认使用utf8编码
//转为JSON
// buf.toJSON(buf);
//缓冲区合并
// var buf1=new Buffer('测试');
// var buf2=new Buffer('连接合并');
// var buf3=Buffer.concat([buf1,buf2]);
// console.log(buf3.toString());

//-----------------Stream流----------
//流的四种类型 Readable(可读) , Writable(可写) , Duplex(可读可写) , Transform(操作写入数据再读出结果)
//Stream对象是EventEmitter的实例，常用事件有：
//1. data:当有数据可读时触发
//2. end 没有更多的数据可读时触发
//3. error 在接收和写入过程中出错时
//4. finish 所有数据已被写入到底层系统时触发
//实例1：从流中读取数据
var fs=require('fs')
// var data=''
// var readerStream=fs.createReadStream('input.txt');
// readerStream.setEncoding('UTF8');
// readerStream.on('data',function(chunk){
//     data+=chunk;
// });
// readerStream.on('end',function(){
//     console.log(data);
// });
// readerStream.on('error',function(err){
//     console.log(err.stack);
// });
// console.log('程序执行完毕');

//实例2：从流从写入数据
// var data='使用流写入数据';
// var writerStream=fs.createWriteStream('output.txt');
// writerStream.write(data,'utf8');  //使用流写入数据data
// writerStream.end(); //标记写入完成
// writerStream.on('finish',function(){
//     console.log('写入数据完成');
// });
// writerStream.on('error',function(err){
//     console.log(err.stack);
// });

//实例3：管道流：将一个流到另一个流中，如对文件内容的复制
// var readerStream=fs.createReadStream('input.txt');
// var writerStream=fs.createWriteStream('out.txt');
// readerStream.pipe(writerStream);  //复制并写入
// console.log('程序执行结束！')

//实例4：链式流：将输出流到另一个流并创建多个对个流的操作，如压缩和解压文件。
var zlib=require('zlib'); 
//文件压缩
// fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));
//文件解压
fs.createReadStream('input.txt.gz').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt'));

