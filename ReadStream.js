//---------------调用---------------
var rs=new ReadStream('out.txt',{
    flags:'r',
    autoClose:true,
    highWaterMark:3,
    start:0,
    end:3,
    encoding:'utf8'
});
rs.on('data',function(data){
    console.log(data);
    rs.plause();
});
setTimeout(function(){
    rs.resume();
},3000)
// -------------------------------------------创建----------
var fs=require('fs');
var EventEmitter=require('events');
class ReadStream extends EventEmitter{
    constructor(path,options){
        super();
        //1.初始化实例参数
        this.path=path;
        this.flags=options.flags||'r';
        this.autoClose=options.autoClose||true;
        this.highWaterMark=options.highWaterMark||64*1024;
        this.start=options.start||0;
        this.end=options.end;
        this.encoding=options.encoding||null;
        //2.控制非流动到流动，创建buffer,打开文件
        this.flowing=null;
        this.buffer=Buffer.alloc(this.highWaterMark);
        this.pos=this.start;
        this.open();
        //3.检查是否有添加data监听
        this.on('newListener',(eventName,callback)=>{
            if(eventName=='data'){
                this.flowing=true;
                this.read();
            }
        })
    }
    open(){
        //1.通过fs.open()打开文件，获取fd文件描述符
        fs.open(this.path,this.flags,(err,fd)=>{
            //2.打开报错，或则关闭并消毁，触发错误事件
            if(err){
                if(this.autoClose){
                    this.destory();
                }
                this.emit('err',err);
                return ;
            }
            //3.正常打开则保存文件描述符，触发open事件
            this.fd=fd;
            this.emit('open');
        });
    }

    destory(){
         // 先判断有没有fd 有就关闭文件 触发close事件
        if(typeof this.fd==='number'){
            fs.close(this.fd,()=>{
                this.emit('close');
            });
            return ;
        }
        this.emit('close');
    }

    read(){
        //1.open方法是异步的，fd可能还没有值，没值的情况要去触发下open事件，回调中调用read()
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this.read())
        }
        //2.读取文件
        let howToRead=this.end ? Math.min((this.end-this.pos+1),this.highWaterMark) : this.highWaterMark;
        //用法： fs.read(fd, buffer, offset, length, pos, callback((err, bytesRead)))
        fs.read(this.fd,this.buffer,0,howToRead,this.pos,(err,bytesRead)=>{
            //2.1读到内容的情况
            if(bytesRead>0){ //bytesRead表示每次读取到的个数
                //3.改变下次读取位置，取出buffer值并根据编码格式化，data事件触发与返回
                this.pos+=bytesRead;
                this.buf=this.buffer.slice(0,bytesRead);
                let data=this.encoding ? this.buf.toString(this.encoding) : this.buf.toString();
                this.emit('data',data);
                //没有可读的便结束
                if(this.pos>this.end){
                    this.emit('end');
                    this.destory();
                }
                //处于流动模式时，继续读文件
                if(this.flowing){
                    this.read();
                }
            }else{
                //2.2未读到内容
                this.emit('end');
                this.destory();
            }
        })
        
    }
    plause(){
        this.flowing=false;
    }
    resume(){
        this.flowing=true;
        this.read();
    }
}
module.exports=ReadStream;



