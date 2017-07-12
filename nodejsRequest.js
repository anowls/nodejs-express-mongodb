/**
 * Created by Administrator on 2016/3/17.
 */
/**
 * nodejs发送http请求的两种方式：1、http模块发送http请求；2、request发送http请求；
 *
 * 以下是两种方式的一个简单的demo
 */

//http模块发送http:
let http = require('http')

let options = {
    protocol: 'http',
    hostname: 'localhost',
    method: 'GET',
    port: '80',
    path: '/admin.php',
    //host : 'localhost',
    //localAddress : '',
    //socketPath : '',
    //headers : { 'Content-Type': 'application/x-www-form-urlencoded charset=UTF-8' },
    //family : '',
    //auth : '',
    //agent : '',
}

let req = http.request(options, function (response) {
    response.setEncoding('utf8')
    console.log('status: ' + response.statusCode)
    console.log('headers: ' + JSON.stringify(response.headers))
    response.on('data', function (chunk) {
        console.log('BODY: ' + chunk)
    })

    res.on('end', function () {
        console.log('No more data in response.')
    })
})

req.on('error', function (e) {
    console.log('problem with request: ' + e.message)
})

req.end()

//request模块发送http:
let request = require('request')
request('http://localhost:80/admin.php', function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body)
    }
})