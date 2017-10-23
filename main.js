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
// var fs=require('fs')
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
// var zlib=require('zlib'); 
//文件压缩
// fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));
//文件解压
// fs.createReadStream('input.txt.gz').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt'));


//--------------------------模块---------
// var fs=require('fs');
// var hello="function Hello(){\
//     this.say=function(name){\
//         console.log('hello '+name+' !');\
//     }\
// }\
// module.exports=Hello;";
// fs.readFile(__dirname+'/hello.js',function(){
//     fs.open(__dirname+'/hello.js','a',function(err,fd){
//         fs.writeFile(__dirname+'/hello.js',hello,function(err){
//             if(err){
//                 console.error(err);
//             }else{
//                 console.log('写入成功！')
//             }
//         });
//     });
// });
// var main="var Hello=require('./hello.js');\
// var hello=new Hello();\
// hello.say('zhoulin');\
// ";
// fs.readFile(__dirname+'/hellomain.js',function(){
//     fs.open(__dirname+'/hellomain.js','a',function(){
//         fs.writeFile(__dirname+'/hellomain.js',main,function(err){
//             if(err){
//                 console.error(err);
//             }else{
//                 console.log('写入成功')
//             }
//         })
//     })
// })

//---------------------路由见router文件-----------

//-----------------全局变量----------------------

//1.__filename 当前正在执行的脚本文件名
// console.log(__filename)
//2.__dirname  当前正在执行的脚本目录，不包括当前文件名
// console.log(__dirname);
//3.定时，清定时，间隔调用函数
//4.console
//5.process 用于描述node进程状态的对象,process有很多属性和方法，详见API
    // process.on('exit',function(code){  //code为退出码
    //     setTimeout(function(){  //计时在退出事件中永不会执行
    //         console.log('计时')
    //     },0);
    //     console.log('退出',code)
    // });
    // console.log('执行结束')
    // process.stdout.write('hello world');
    // process.argv.forEach(function(val,index,array){
    //     console.log(index+':'+val);
    // });
    // console.log(process.execPath); //脚本绝对路径
    // console.log(process.platform); //程序所在的平台系统
    // console.log(process.pid);//进程号
    // console.log('当前目录：'+process.cwd()); 
    // console.log('当前版本:'+process.version);
    // console.log(process.memoryUsage());//内存使用情况

//--------------常用工具util介绍-------
//1.util
//util.inherits(constructor,superConstructor) 实现对象之间原型的继承
    // var util=require('util');
    // function Base(){
    //     this.name='base';
    //     this.sayhi=function(){
    //         console.log('hi '+this.name);
    //     }
    // }
    // Base.prototype.sayhello=function(){
    //     console.log('hello '+this.name);
    // }
    // function Sub(){
    //     this.name='sub';
    // }
    // util.inherits(Sub,Base);
    // var base=new Base();
    // console.log(base.name);
    // base.sayhi();
    // var sub=new Sub();
    // console.log(sub.name);
    // sub.sayhello();
    // sub.sayhi();  //只会继承原型，故此报错

//util.inspect(obj,showHidden,depth,colors) 将对象转为字符串
// var person={
//     name:'keyue',
//     age:23,
//     like:function(){
//         return 'play';
//     }
// };
// console.log(util.inspect(person));

//---------------常用模块-----------
//1.os模块，基本的系统操作
    // var os=require('os');
    // console.log(os.hostname());//操作系统主机名
    // console.log(os.type());//操作系统名
    // console.log(os.totalmem());//系统内存总量
    // console.log(os.freemem());//系统空闲内存
//2.Net模块提供了一些用于底层的网络通信的小工具，包含了创建服务器/客户端的方法
    //示例参考Net文件
//3.Path模块主要是用来处理和转换文件路的工具，也可监听文件。参考mainfs.js
//4.DNS模块，用于解析域名。
    // var dns=require('dns');
    // dns.lookup('www.github.com',function(err,address,family){
    //     console.log('ip ：',address);   //address的值为github的ip访问地址；
    //     dns.reverse(address,function(err,hostnames){
    //          console.log(hostnames);
    //     })
    // });
    
//5.domain模块，简化异步代码的异常处理，可以捕抓到try catch无法捕获到的
    // var EventEmitter=require('events').EventEmitter;
    // var domain=require('domain');
    // var emitter1=new EventEmitter();
    // var domain1=domain.create();
    // domain1.on('error',function(err){
    //     console.log("domamin1 处理这个错误："+err.message);
    // });
    // //显示声明
    // domain1.add(emitter1);
    // emitter1.on('error',function(err){
    //     console.log("监听处理此错误:"+err.message);
    // });
    // emitter1.emit('error',new Error('通过监听器来处理'));
    // emitter1.removeAllListeners('error');
    // emitter1.emit('error',new Error('----通过 domain1 处理'));

    // var domain2=domain.create();
    // domain2.on('error',function(err){
    //     console.log('domain2 处理这个错误:'+err.message);
    // });
    // //隐式声明
    // domain2.run(function(){
    //     var emitter2=new EventEmitter();
    //     emitter2.emit('error',new Error('通过 domain2 处理'));
    // });
    // domain1.remove(emitter1);
    // emitter1.emit('error',new Error('转换为异常，系统将崩溃！'));
    //domain总结：1.用domain绑定监听器后，如果事件监听器有绑定error事件，则错误会执行事件中的error事件，没有绑定则会
    //执行domain中绑定的error事件。2.如果监听器和domain都没有绑定error事件，则错误会直接抛异常，断开连接。3.domain的
    //绑定分显示add()方法，和隐示绑定run()





//-------------GET/POST请求------------
//1.获取GET请求内容，因为暴露在url中，所以直接解析url
    // var http=require('http');
    // var url=require('url');
    // var util=require('util');
    // http.createServer(function(req,res){
    //     res.writeHead(200,{'Conten-Type':'text-plain'});
    //     res.end(util.inspect(url.parse(req.url)));

    // }).listen(8000);
//2.获取post请求数据
    // var http=require('http');
    // var querystring=require('querystring');
    // var postHtml='<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    //   '<body>' +
    //   '<form method="post">' +
    //   '网站名： <input name="name"><br>' +
    //   '网站 URL： <input name="url"><br>' +
    //   '<input type="submit">' +
    //   '</form>' +
    //   '</body></html>';
    // http.createServer(function(req,res){
    //     var body='';
    //     req.on('data',function(chunk){ //可读流中有data事件，有数据可读时触发,chunk是数据片段
            
    //         body+=chunk;
    //     });
    //     req.on('end',function(){
    //        body=querystring.parse(body); //将字符串反序列化解析为对象
    //        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});  //以html格式的正文，plain是无格式
    //        if(body.name&&body.url){
    //            res.write('网站名为：'+body.name);

    //            res.write('网站地址：'+body.url);
    //        }else{
    //            res.write(postHtml);
    //        } 
    //        res.end();
    //     })
        
    // }).listen(8000);
