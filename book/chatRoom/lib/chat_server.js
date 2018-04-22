//总体：socket.io服务端逻辑
var socket=require('socket.io');
//初始化一些聊天变量
var io;
var guestNumber=1;  //每一个客户端新连接时，用户名生成序列号，以1开始，自然叠加
var nickNames={}; //存用户的键值对。键：用户的socket.id,值：用户的昵称
var namesUsed=[];   //所有注册用名的用户名数组集合
var currentRoom={}; //存用户当前所在房间的键值对。键：用户的socket.id,值：房间名即（id）.

//定义导出的listen函数
exports.listen=function(server){
    io=socket.listen(server);  //启动socket.io服务器，允许它搭载在已有的HTTP服务器上
    io.set('log level',1);
 
    io.sockets.on('connection',function(socket){
        guestNumber=assginGuestName(socket,guestNumber,nickNames,namesUsed); //在用户连接上来时赋予其一个访客名
        joinRoom(socket,'Lobby'); //连接上的用户放入Lobby房间里

        //处理用户的消息，更名，聊天室的创建和变理
        handleMessageBroadcasting(socket,nikeNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);
        
        //用户发出请求时，向其提供已被占用的聊天室列表
        socket.on('rooms',function(){
            socket.emit('rooms',io.sokets.manager.rooms);
        });

        //用户客户端断开连接
        handleClientDisconnection(socket,nickNames,namesUsed);
    });

    //方法定义：
    //分配昵称
    function assginGuestName(socket,guestNumber,nickNames,namesUsed){
        var name='Guest'+guestNumber;
        nickNames[socket.id]=name;
        socket.emit('nameResult',{
            success:true,
            name:name
        });
        namesUsed.push(name);
        return guestNumber+1;
    }
    //进入聊天室
    function joinRoom(socket,room){
        //使用户进入房间
        socket.join(room);
        //记录用户当前所在的房间
        currentRoom[socket.id]=room;
        //通知用户进入了新的房间
        socket.emit('joinResult',{room:room}); 
        //通知房间的其它用户有新用户进入了房间
        socket.broadcast.to(room).emit('message',{
            text:nickNames[socket.id]+' has joined '+room+'.'
        });
        
        var usersInRoom=io.sockets.clients(room);
        //如果房间不只当前这一个用户，那么做下汇总，都有谁
        if(usersInRoom.length>1){
            var usersInRoomSummary='Users currently in '+room+': ';
            for(var index in usersInRoom){
                var userSocketId=usersInRoom[index].id;
                if(userSocketId != socket.id){
                    if(index>0){
                        usersInRoomSummary += ','
                    }
                    usersInRoomSummary+=nickNames[userSocketId];
                }
            }
            usersInRoomSummary+='.';
            socket.emit('message',{text:usersInRoomSummary});
        }
    }
    //用户更名
    function handleNameChangeAttempts(socket,nickNames,namesUsed){
        //添加nameAttempt事件监听器
        socket.on('nameAttempt',function(name){
            if(name.indexOf('Guest')==0){
                //用户更名的昵称不能以Guest开头
                socket.emit('nameResult',{
                    success:false,
                    message:'Names cannot begin with "Guest".'
                });
            }else{
                //检查用户名是否被占用了
                if(namesUsed.indexOf(name)== -1){
                    var previousName=nickNames[socket.id];
                    var previousNameIndex=namesUsed.indexOf(previousName);
                    namesUsed.push(name);
                    nickNames[socket.id]=name;
                    delete namesUsed[previousNameIndex];
                    //更名成功并通知房间其他人
                    socket.emit('nameResult',{
                        success:true,
                        name:name
                    });
                    socket.broadcast.to(currentRoom[socket.id]).emit('message',{
                        text:previousName+' is now know as '+name+'.'
                    });
                }else{
                    //用户名被占用
                    socket.emit('nameResult',{
                        success:false,
                        message:'That name is already in use.'
                    })
                }
            }
        })
    }
    //发送聊天消息
    function handleMessageBroadcasting(socket){
        socket.on('message',function(message){
            socket.broadcast.to(message.room).emit('message',{
                text: nickNames[socket.id]+": "+message.text
            });
        });
    }
    //创建房间
    function handleRoomJoining(socket){
        socket.on('join',function(room){
            socket.leave(currentRoom[socket.id]);
            joinRoom(socket,room.newRoom);
        })
    }
    //用户断开连接
    function handleClientDisconnection(socket){
        socket.on('disconnect',function(){
            var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
            delete namesUsed[nameIndex];
            delete nickNames[socket.id];
        })
    }
}
