var db=require('./../mongo/mongodb');
module.exports=function(data){
    db.collection('site').find().toArray(function(err, result) {
    if(err){
      console.log('Error:'+ err);
      return;
    }     
    console.log(result);
  });

}