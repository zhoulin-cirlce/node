const fs=require('fs');
const child_process=require('child_process');
for(var i=0;i<3;i++){
    // //1.child_process.exec(command,options,callback);创建子进程
    // //command 字符串，将要运行的命令，参数使用空格隔开
    // //options 对象, callback 回调
    // var workerProcess=child_process.exec('node support.js '+i, //*注意命令后接参数的空格
    //     //子进程总带有三个流对象：child.stdin 流入,child.stdout 流出,child.stderr 流错
    //     function (error,stdout,stderr){
    //         if(error){
    //             console.log(error.stack);
    //             console.log('Eroor code:'+error.code);
    //             console.log('Singnal received:'+error.signal);
    //         }
    //         console.log('stdout:'+stdout);
    //         console.log('stderr:'+stderr);
    //     });
    // workerProcess.on('exit',function(code){
    //     console.log('子进程已退出，退出码：'+code);
    // });

}
