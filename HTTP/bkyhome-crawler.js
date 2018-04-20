var http=require('http');
var url='http://www.imooc.com/learn/348';
//cherrio可以在服务端将Dom像JQ一样用
var cherrio=require('cheerio');
function filterChapters(html){
    var $=cheerio.load(html);
}
http.get(url,function(res){
    var html='';
    res.on('data',function(data){
        html+=data;
    })
    res.on('end',function(){
        filterChapters(html);
    })
}).on('error',function(){
    console.log('err');
})