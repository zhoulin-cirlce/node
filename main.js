//---------------------------------------node 事件--------------------//
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
var buf1=new Buffer('测试');
var buf2=new Buffer('连接合并');
var buf3=Buffer.concat([buf1,buf2]);
console.log(buf3.toString());
