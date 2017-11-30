var db=require('./../mongo/mongodb');
module.exports=function(query){
    return db.collection('site').update(query,{$set:{name:"小周"}});
}
