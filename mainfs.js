//-----------回调函数-----------
// var fs=require('fs');  //加载node的fs模块，文件系统
// var data=fs.readFileSync('input.txt');      //读取文件内容
// console.log(data.toString());
// console.log('程序执行结束！');

//异步
// var fs=require('fs');
// fs.readFile('input.txt',function(err,data){
//     if(err) return console.error(err);
//     console.log(data.toString());
// });
// console.log("程序执行结束！");

//---------path模块-----
//1.路径的解析
var path=require('path');
var myPath=path.normalize(__dirname+'/input.txt');  //normalize()方法解析路径返回完整路径，__dirname是代变量
// console.log(myPath);

//2.路径的结合，合并，路径最后不会带目录分隔符
var path1='path1', path2='path2//pp\\',path3='../path3';
var myPath=path.join(path1,path2,path3);
// console.log(myPath);  //   path1\path2\path3

//3.获取绝对路径，只在当前运行目录下找。
var myPath=path.resolve('input.txt');
// console.log(myPath);  //  /opt/zhoulin/node/input.txt

//4.获取相对路径  path.relative(form,to)  返回基于from指定到to的相对路径
var form='/opt/zhoulin/node/input.txt'; //form与to是绝对路径
var to='/opt/zhoulin/ebook';
var _path=path.relative(form,to);
// console.log(_path);      //  ../../ebook

//5.获取路径中目录名(到目录文件之前的绝对目录)
var myPath=path.dirname(__dirname+'/input.txt');
// console.log(myPath);    //  /opt/zhoulin/node

//6.获取路径中目标文件名，后缀可选，不需要话第二个参数以'.ext'方式传入
var myPath=path.basename(__dirname+'/input.txt','.txt');
// console.log(myPath);  //  input

//7.获取路径中目标文件的扩展名，没有.返回空
var myPath=path.extname('/input.txt');
// console.log(myPath);    //  .txt

//8.sep属性，返回操作系统文件分隔符，window返回'\\', unix是'/'
var myPath=path.sep;
// console.log(myPath);  //  /

//9.delimiter属性，返回操作系统目录分隔符，window是 ';' unix是 ':'
var myPath=path.delimiter;
// console.log(myPath);  //  :





//------------------------fs文件系统模块------
var fs=require('fs');
//1.readFile(filename,[options],callback)读取文件内容
/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
// fs.readFile(__dirname+'/input.txt',{flag:'r+',encoding:'utf8'},function(err,data){
//     if(err){
//         console.error(err);
//         return ;
//     }
//     console.log(data);  // 测试数据

// });

//2.writeFile(filename,data,[options],callback)写入内容到文件
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
// var w_data='这是一段通过fs.writeFile函数写入的内容；\r\n';
// fs.writeFile(__dirname+'/input.txt',w_data,{flag:'a'},function(err,data){
//     if(err){
//         console.error(err);
//         return ;
//     }else{
//         console.log('写入成功！');
//     }
// });

//3.appendFile(filename,data,[options],callback)以追加的方式写入文件
// fs.appendFile(__dirname+'/input.txt','这里是追加写入的内容',function(){
//     console.log('追加写入完成！');
// });

//4.open(filename,flags,[mode],callback)
/**
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */
// fs.open(__dirname+'/input.txt','r','0666',function(err,fd){
//     console.log(fd);
// })

//5.read()读文件，读取打开的文件内容到缓冲区中
//fs.read(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，被读取的缓存区对象
 */
fs.open(__dirname+'/input.txt','r',function(err,fd){
    if(err){
        console.error(err);
        return;
    }else{
        var buffer=new Buffer(255);
        console.log(buffer.length);     //缓存空间长度255
        ////每一个汉字utf8编码是3个字节，英文是1个字节，这里是从第二个节开始读取
        fs.read(fd,buffer,0,9,3,function(err,bytesRead,buffer){
            if(err){
                throw err;
            }else{
                console.log(bytesRead);   //9
                console.log(buffer.slice(0,bytesRead).toString());  //试数据
                //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
                fs.read(fd,buffer,0,9,null,function(err,bytesRead,buffer){
                    console.log(bytesRead);     //9
                    console.log(buffer.slice(0,bytesRead).toString());  //测试数
                });
            }
        });
    }
})
