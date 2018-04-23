//为防止XSS攻击,我们对input输入的信息进行过滤与转换
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}
function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}
//处理用户的原始输入
function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;
    //检查字符'/'是否出现在字符串下标为0的位置
    if (message.charAt(0) == '/') {
        //调用原型方法处理指令
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val();


}

//客户端初始化
var socket = io.connect();
$(document).ready(function () {
    var chatApp = new Chat(socket);
    //显示更名后的结果
    socket.on('nameResult', function (result) {
        var message;
        if (result.success) {
            message = 'You are now know as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });
    //显示房间变更结果
    socket.on('joinResult', function (result) {
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('Room changed.'));
    });
    //将接收到的消息插入到消息框
    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#message').append(newElement);
    });
    //当前的房间列表展示
    socket.on('rooms', function (rooms) {
        $('#room-list').empty();
        for (var room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room-list').append(divEscapedContentElement(room));
            }
        }
        //点击房间名跳转到对应房间
        $('#room-list div').click(function () {
            chatApp.processCommand('/join' + $(this).text());
            $('#send-message').focus();
        });
    });
    //定期请求房间列表
    setInterval(function () {
        socket.emit('rooms');
    }, 1000);
    $('#send-message').focus();
    $('#send-form').submit(function () {
        processUserInput(chatApp, socket);
        return false;
    });
});
