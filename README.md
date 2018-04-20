
## MyApp目录 描述:基于node+express+websocket+mongodb的即时聊天

## 数据库的安装
#### windows
* 下载 https://www.mongodb.com/download-center#community
* 安装mongodb   
    安装目录可以自定义为: d:/mongodb
* 配置data目录  
  1. 新建文件在根目录 d:/data/db   
  2. 在mongodb/bin目录下,配置环境变量dbpath
```shell
    mongod --dbpath d:\data\db
```
* 启动mongo,在bin目录下的mongod.exe
* 可装mongodb客户端stdio 3t查看数据

#### Linux
* 下载
```shell
    curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz    # 下载
    tar -zxvf mongodb-linux-x86_64-3.0.6.tgz                                   # 解压
    mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb                         # 将解压包拷贝到指定目录
```
* 设置环境变量
```shell
    export PATH=<mongodb-install-directory>/bin:$PATH
```
* 创建数据库目录
```shell
    mkdir -p /data/db
```
* 在bin目录下启动mongod
```shell
    ./mongod
```
## 安装与运行

    git clone https://github.com/zhoulin-cirlce/node.git
    cd node/myapp
    npm install
    npm install mongoose
    npm run start
## 目录结构
```
├── book -------------------------《Node.js实战》Dome
├── myapp
        ├── bin                   
        │   └── www  --------------------------打包后的运行文件
        ├── lib  ------------------------------后端内容
        │   ├── module ------------------------模块操作数据库文件
        │   ├── mongo -------------------------数据库的连接
        │   ├── util --------------------------工具类库
        │   └── page***.js --------------------业务操作js
        ├── modules
        │   └── users.js
        ├── node_modules  ---------------------各种依赖包
        ├── public  ---------------------------公共文件
        │   ├── images  -----------------------图片
        │   ├── javascripts  ------------------js
        │   └── stylesheets  ------------------css样式
        ├── routes  ---------------------------路由
        ├── views   ---------------------------页面组件
        ├── app.js  ---------------------------项目入口文件
        └──package.json
```

