var http = require('http');
http.createServer(function (request, response) {
     // 发送 HTTP 头部 
      // HTTP 状态值: 200 : OK 
    // 内容类型:  text / plain 
        response.writeHead(200, { 'Content-Type': 'text/plain' });
    // 发送响应数据 "Hello World"
        response.end('Hello World\n');
    }).listen(8888);
// 终端打印如下信息 
console.log('Server running at http://127.0.0.1:8888/');

var xmlobj = new XMLHttpRequest(); //创建对象
  //var parm = "act=firstweather" ;//构造URL参数
  //antique = escape(antique);
  var parm = "https://www.baidu.com";//构造URL参数
  //xmlobj.open("POST", "{dede:global.cfg_templeturl/}/../include/weather.php", true); //调用weather.php
  xmlobj.open("GET", parm, true); //调用weather.php
  xmlobj.setRequestHeader("cache-control","no-cache");
  xmlobj.setRequestHeader("contentType","text/html;charset=uft-8") //指定发送的编码
  xmlobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");  //设置请求头信息
//   xmlobj.setRequestHeader('Cookie',"BAIDUID%3DB10E5A3E03E9C8A72E8DEE484ABB8D5E%3AFG%3D1%3B%20BIDUPSID%3DB10E5A3E03E9C8A72E8DEE484ABB8D5E%3B%20PSTM%3D1489401628%3B%20H_PS_PSSID%3D1447_21106_24022_22159%3B%20PSINO%3D7%3B%20BDORZ%3DB490B5EBF6F3CD402E515D22BCDA1598%3B%20PHPSESSID%3D0jtnendf0oc03u7b3tujpivrs0%3B%20Hm_lvt_4010fd5075fcfe46a16ec4cb65e02f04%3D1508840489%3B%20Hm_lpvt_4010fd5075fcfe46a16ec4cb65e02f04%3D1508842671%3B%20FP_UID%3Dc1ae2d23e6c291208fb8956966a0d07a%3B%20BDRCVFR%5BfeWj1Vr5u3D%5D%3DI67x6TjHwwYf0")
  xmlobj.send(parm); //设置为发送给服务器数据
 xmlDoc=xmlobj.responseText;
console.log(xmlobj);