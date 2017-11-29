// var mongoose = require('mongoose');

// //申明一个mongoons对象
// var UsersSchema = new mongoose.Schema({
//     name: String,
//     paw: String,
//     meta: { 
//         createAt: {
//             type: Date,
//             default: Date.now()
//         },
//         updateAt: {
//             type: Date,
//             default: Date.now()
//         }
//     }
// })

// //每次执行都会调用,时间更新操作
// UsersSchema.pre('save', function(next) {
//     if(this.isNew) {
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     }else {
//         this.meta.updateAt = Date.now();
//     }

//     next();
// })

// //查询的静态方法
// UsersSchema.statics = {
//     fetch: function(cb) { //查询所有数据
//         return this
//           .find()
//           .sort('meta.updateAt') //排序
//           .exec(cb) //回调
//     },
//     findById: function(id, cb) { //根据id查询单条数据
//         return this
//           .findOne({_id: id})          
//           .exec(cb)
//     }
// }

// //暴露出去的方法
// module.exports = UsersSchema




// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// //表里要存的字段与类型定义
// var KittySchema = new Schema({
//  name:String,
//  age:Number
// });
// //以methods来定义实例方法
// KittySchema.methods.speak = function(){
//     var greeting = this.name ? "Meow name is " + this.name : "I don't have a name.";
//     console.log(greeting);
// }
// KittySchema.methods.findAge=function(cb){
//     return this.model('Kitten').find({age:this.age},cb);
// }

// //以statics来定义静态方法,在model就能使用

// //参数一是表名,参数二是表模型
// var Kitten = mongoose.model("Kitten", KittySchema);
// module.exports=Kitten;