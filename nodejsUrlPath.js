/**
 * Created by Administrator on 2016/3/17.
 */
/**
 * nodejs中对请求路径及参数处理的几个相关模块url,path.querystring
 *
 * 以下是几个简单的demo
 */

//url.parse()方法及其作用
var url = require('url');
var queryUrl = "http://localhost:80/admin.php?name=admin&password=admin" ;
var obj = url.parse(queryUrl);
console.log(obj)

//url.format()方法及其作用
var url = require('url');
var Url = {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'localhost:80',
    port: '80',
    hostname: 'localhost',
    hash: null,
    search: '?name=admin&password=admin',
    query: 'name=admin&password=admin',
    pathname: '/admin.php',
    path: '/admin.php?name=admin&password=admin',
    href: 'http://localhost:80/admin.php?name=admin&password=admin'
}
var obj = url.format(Url);
console.log(obj)


//querystring.parse()方法及其作用
var qs = require('querystring');
var queryUrl = "http://localhost:80/admin.php?name=admin&password=admin" ;
var obj = qs.parse(queryUrl);
console.log("//打印的结果如下")
console.log(obj) ;

//querystring.stringify()方法及其作用
var qs = require('querystring');
var json = { name: "admin", password: "admin" };
queryUrl = qs.stringify(json)
console.log(queryUrl)


//url、querystring结合使用解析url中的参数
var url = require('url');
var qs = require('querystring');
var queryUrl = "http://localhost:80/admin.php?name=admin&password=admin" ;
queryUrl = url.parse(queryUrl).query;
console.log("//打印的结果如下")
console.log(qs.parse(queryUrl)) ;

//path.basename()方法及其作用
var path = require("path") ;
var queryUrl = "http://localhost:80/admin.php?name=admin&password=admin" ;
var root = path.basename(queryUrl) ;
console.log(root)



