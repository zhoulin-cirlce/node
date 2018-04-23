var Chat=function(socket){
    this.socket=socket;
}
//消息发送到服务端
Chat.prototype.sendMessage=function(room,text){
    var message={
        room:room,
        text:text
    };
    this.socket.emit('message',message);
};
//房间变更发送到服务端
Chat.prototype.changeRoom=function(room){
    this.socket.emit('join',{
        newRoom:room
    })
};
//聊天消息处理
Chat.prototype.processCommand=function(command){
    //命令识别
    var words=command.split(' ');
    var command=words[0]
                    .substring(1,words[0].length)
                    .toLowerCase();
    var message=false;
    switch(command){
        case 'join':
            words.shift();
            var room=words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            var name=words.join(' ');
            this.socket.emit('nameAttempt',name);
            break;
    }
    return message;
}
