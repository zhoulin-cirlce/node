var db=require('./../mongo/mongodb');
module.exports=function(query){
    return db.collection('site').remove(query);
}