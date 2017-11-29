//建立与数据库的连接
var mongoose = require("mongoose");
//`open()` is deprecated in mongoose >= 4.11.0
mongoose.connect("mongodb://localhost:27017/test",{useMongoClient:true})
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("已连接！")
});
module.exports=db;