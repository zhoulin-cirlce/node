var db=require('./../mongo/mongodb');
module.exports=function(data){
    // console.log('insertUser-----',data);
    // db.collection('site').insert(data);

    return db.collection('site').update({name:"测试珂玥"},{$set:{name:"小周"}});

}

// db.collection('site').update({ "name": "周麟" }, { $set: { "url": "www.zk.com" } }, { multi: true })