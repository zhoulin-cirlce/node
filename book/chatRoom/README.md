
## node基于socket.io时实聊天程序
### package.json
* socket.io是一个让客户端与服务端时实通讯连接的模块，类似于websocket，但优于websocket,兼容也更好
* mime是用来自动区消息类型的因特网标准，也就是'Content-Type'的值，常见的有'text/palin'
### 基础架建思路
* 给用户的Web浏览器提供静态文件
* 在服务端处理与聊天相关的消息
* 在用户的Web浏览器中处理与聊天相关的消息
## 目录结构
```
├── server.js ---------------------------服务端
├── lib----------------------------------服务端逻辑
│   └──  chat_server.js   
│ 
├── public-------------------------------客户端入口
│   └──  index.html  
│
├── stylesheets--------------------------样式文件
│   └──  style.css 
│
├── javascript----------------------------客户端逻辑
│   ├── chat.js 
│   └── chat_ui.js    
│                  
└──package.json
```

