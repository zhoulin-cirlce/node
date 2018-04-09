//---------path模块-----
//1.路径的解析
var path=require('path');
var myPath=path.normalize(__dirname+'/input.txt');  //normalize()方法解析路径返回完整路径，__dirname是代变量
// console.log(myPath);

//2.路径的结合，合并，路径最后不会带目录分隔符
var myPath=path.join('path1', '/path2/aa', 'baz/asdf');
// console.log(myPath);  //   path1/path2/aa/baz/asdf

//3.在当前路径下生成绝对路径，只在当前运行目录下找。要求参数是字符串，可为多个参数
var myPath=path.resolve('app/test/haha','../input.txt');
// console.log(myPath);  //  /opt/zhoulin/node/app/test/input.txt

//4.获取相对路径  path.relative(form,to)  返回基于from指定到to的相对路径
var form='/zhoulin/Document/circle/node/input.txt'; //form与to是绝对路径
var to='/zhoulin/Document/circle/node/myapp/bin/www';
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
//10.parse()返回文件的详细路径信息对象
var pathJson=path.parse('/zhoulin/Document/circle/node/input.txt');
// console.log(pathJson)
// {
//     root:'/',
//     dir:'/zhoulin/Document/circle/node',
//     base:'input.txt',
//     ext:'txt',
//     name:'input'
// }
//11.format()通过json组合成路径，与parse()相反
var myPath=path.format({
    root:'/',
    dir:'/zhouzhou/node',
    base:'input.html'
});
//12.isAbsolute()判断是否为绝对路径，返回true/false
var isabsolut=path.isAbsolute('/root/circle/input.txt');
// console.log(isabsolut);







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
// fs.open(__dirname+'/input.txt','r',function(err,fd){
//     if(err){
//         console.error(err);
//         return;
//     }else{
//         var buffer=new Buffer(255);
//         console.log(buffer.length);     //缓存空间长度255
//         ////每一个汉字utf8编码是3个字节，英文是1个字节，这里是从第二个节开始读取
//         fs.read(fd,buffer,0,9,3,function(err,bytesRead,buffer){
//             if(err){
//                 throw err;
//             }else{
//                 console.log(bytesRead);   //9
//                 console.log(buffer.slice(0,bytesRead).toString());  //试数据
//                 //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
//                 fs.read(fd,buffer,0,9,null,function(err,bytesRead,buffer){
//                     console.log(bytesRead);     //9
//                     console.log(buffer.slice(0,bytesRead).toString());  //测试数
//                 });
//             }
//         });
//     }
// })

//6.写文件，将缓冲区内数据写入使用fs.open打开的文件
// fs.write(fd,buffer,offset,length,position,callback);
//callback参数：err错误，written实际写入字节数，buffer被读取的缓存区对象
// fs.open(__dirname+'/input.txt','a',function(err,fd){
//     if(err){
//         console.error(err);
//         return ;
//     }else{
//         var buffer=new Buffer('写入文件数据内容');
//         //写入‘入文件’三个字
//         fs.write(fd,buffer,3,9,12,function(err,written,buffer){
//             if(err){
//                 console.log('写入失败');
//                 console.error(err);
//                 return ;
//             }else{
//                 console.log('写入成功');
//             }
//         })
//     }
// })

//7.刷新缓存区 fs.fsync(fd,callback)
// 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内。
// 因此可以使用fs.fsync方法将内存中数据写入文件；--刷新内存缓冲区；
// fs.open(__dirname+'/input.txt','a',function(err,fd){
//     if(err){
//         console.error(err);
//     }else{
//         var buffer=new Buffer('我爱nodejs编程');
//         fs.write(fd,buffer,0,9,0,function(err,written,buffer){
//             console.log(written.toString());
//             fs.write(fd,buffer,9,buffer.length-9,null,function(err,written){
//                 console.log(written.toString());
//                 fs.fsync(fd);
//                 fs.close(fd);
//             })
//         })
//     }
// })

//8.创建目录 fs.mkdir(path,[mode],callback);
//mode表示权限
// fs.mkdir(__dirname+'/fsDir',function(err){
//     if(err){
//         console.error(err);
//     }else{
//         console.log('创建目录成功！')
//     }
// })

//9.读取目录，列出目录下的子文件名
//fs.readdir(path,callback);
//callback(err,files) ,files是数组，读取到目录下的文件
// fs.readdir(__dirname+'/test',function(err,files){
//     if(err){
//         console.error(err);
//         return ;
//     }else{
//         files.forEach(function(file,index){
//             console.log(index+'---',file)
//         })
//     }
// })

//10查看文件与目录的信息
//fs.stat(path,callback);或fs.lstat(path,callback);  //查看符号链接文件
// fs.lstat(__dirname+'/input.txt',function(err,res){
//     console.log(res)  //返回一个对象，包含文件相关信息
// })

//11.查看文件与目录是否存在  fs.exists(path,[callback(exists)])  //exists为true是存在
// fs.exists(__dirname+'/input.txt',function(exists){
//     var retTxt=(exists ? '存在': '不存在')
//     console.log(retTxt);
// })

//12.修改文件访问时间与修改时间 fs.utimes(path,atime,mtime,callback);
//atime:新的访问时间 ctime新的修改时间
// fs.stat(__dirname+'/input.txt',function(err,stat){
//         console.log('访问时间：'+stat.atime+'\n修改时间：'+stat.mtime);  //修改之前最近的一次时间
//         console.log(stat.mode);
//     })
// fs.utimes(__dirname+'/input.txt',new Date(),new Date(),function(err){
//     if(err){
//         console.error(err);
//         return ;
//     }
//     fs.stat(__dirname+'/input.txt',function(err,stat){
//         console.log('访问时间：'+stat.atime+'\n修改时间：'+stat.mtime);  //修改之后的时间
//         console.log(stat.mode);
//     })
// })

//13.修改文件的访问权限 fs.chmod(path,mode,callback)
//mode表示权限，0666是所有用户可读可写
// fs.chmod(__dirname+'/input.txt','0666',function(err){
//     if(err){
//         console.error(err);
//         return ;
//     }
//     console.log('修改权限成功')
// })

//14.移动/重命名文件或目录 fs.rename(oldPath,newPath,callback);
// fs.rename(__dirname+'/input.txt',__dirname+'/input1.txt',function(err){
//     if(err){
//         console.error(err);
//         return ;
//     }else{
//         console.log('移动/重命名文件成功！');
//     }
// })

//15.删除空目录(无子文件)
// fs.rmdir(__dirname+'/test',function(err){
//     if(err){
//         console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空');
//         console.error(err);
//         return ;
//     }else{
//         console.log('删除目录成功')
//     }
// })

//16.监视文件，被修改时进行处理 fs.watchFile(filename,[options],listener);
//[options], persistent true表示持续监视，不退出程序；interval 单位毫秒，表示每隔多少毫秒监视一次文件
//listener ,文件发生变化时回调，有两个参数：curr为被修改后文件一个fs.Stat对象，prev为被修改前文件一个fs.Stat对象
// fs.watchFile(__dirname+'/input.txt',{interval:1000},function(curr,prev){
//     if(Date.parse(prev.ctime)==0){
//         console.log('文件被创建！');
//     }else if(Date.parse(curr.ctime)==0){
//         console.log('文件被删除！');
//     }else if(Date.parse(curr.mtime)!=Date.parse(prev.mtime)){
//         console.log('文件被修改！');
//     }
// })

//17.取消监听文件 fs.unwatchFile(filename,[listener]); //listener如果不指定监听器事件，则取消所有监听处理事件
// var listener=function(curr,prev){
//     console.log('我是监视函数')
// }
// fs.unwatchFile(__dirname+'/input.txt',listener);

//18.监视文件或目录 fs.watch(filename,[options],[listener])
// fs.watch返回一个fs.FSWatcher对象，拥有一个close方法，用于停止watch操作；
// 当fs.watch有文件变化时，会触发fs.FSWatcher对象的change(err, filename)事件，err错误对象，filename发生变化的文件名
// fs.watch(filename, [options], [listener]);
// var fsWatcher=fs.watch(__dirname+'/input.txt',function(event,filename){
//     // console.log(event);
// });
// fsWatcher.on('change',function(event,filename){
//     console.log(filename+' 发生变化')
// });
// setTimeout(function(){
//     console.log('关闭watch')
//     fsWatcher.close(function(err){
//         if(err){
//             console.log(err)
//         } 
//     });
// },30000)

//19.文件可读流fs.createReadStream(path[,options])
//20.暂停pause()会使 flowing 模式的流停止触发 'data' 事件
//21.恢复resume()会重新触发 'data' 事件, 将暂停模式切换到流动模式
var rs=fs.createReadStream('out.txt',{
    flags:'r',
    encoding:'utf8',
    autoClose:true,
    highWaterMark:3, //每次读取3位
    start:0, //默认从0开始
    end:3 //读到下标到3的字符结束，0-3共4位
});
rs.on('data',function(data){
    console.log(data);
    rs.pause();  //暂停'data'触发
});
setTimeout(function(){
    rs.resume(); //恢复'data'触发
},5000)
rs.on('end',function(){
    console.log('over!');
});
rs.on('open',function(){
    console.log('open!');
})
rs.on('close',function(){
    console.log('close!')
}) 











