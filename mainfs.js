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
fs.readFile(__dirname+'/input.txt',{flag:'r+',encoding:'utf8'},function(err,data){
    if(err){
        console.error(err);
        return ;
    }
    console.log(data);  // 测试数据

})

