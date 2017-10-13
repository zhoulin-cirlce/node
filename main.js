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

//-------------EventEmitter类应用------------
var events=require('events');
var eventEmitter=new events.EventEmitter();
var listen1=function(){
    console.log('listen1正在执行！');
};
var listen2=function(){
    console.log('listen2正在执行！');
}
eventEmitter.addListener('connection',listen1);
eventEmitter.on('connection',listen2);
var listencount=events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(listencount+'个监听器监听');
eventEmitter.emit('connection');
eventEmitter.removeListener('connection',listen1);
console.log('监听器listen1不再受监听')
eventEmitter.emit('connection')
var listencount=events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(listencount+'个监听器监听');
console.log('程序执行完毕')

