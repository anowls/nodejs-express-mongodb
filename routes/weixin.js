let express = require('express')
let router = express.Router()

let autho = require('../routes/model/getTokenParam.json')

let xml2js = require('xml2js')
let wechat = require('wechat')
let API = require('wechat-api')
API.mixin(require('./long2short'))
let api = new API(autho.appid, autho.secret)

/* GET home page. */
//router.get('/', (function (req, res, next) {
//    let token = 'hps'
//
//    let signature = req.query.signature
//    let timestamp = req.query.timestamp
//    let echostr = req.query.echostr
//    let nonce = req.query.nonce
//
//    let array = [token,timestamp,nonce]
//    array.sort()
//
//    let sha1 = crypto.createHash('sha1')
//    sha1.update(array.join(''))
//    if(sha1.digest('hex') != signature){
//        res.send('error')
//    }else{
//        res.send(echostr)
//    }
//    res.end()
//}))

//router.use('/',wechat('hps').text(function (message, req, res, next) {
//    console.log(message)
//    res.reply('微信文本消息~~~~~~~')
//}).image(function (message, req, res, next) {
//    res.reply('微信图片消息~~~~~~~')
//}).voice(function (message, req, res, next) {
//    res.reply('微信语音消息~~~~~~~')
//}).video(function (message, req, res, next) {
//    res.reply('微信视频消息~~~~~~~')
//}).location(function (message, req, res, next) {
//    res.reply('微信地址消息~~~~~~~')
//}).link(function (message, req, res, next) {
//    res.reply('微信链接消息~~~~~~~')
//}).event(function (message, req, res, next) {
//
//    console.log(message)
//
//    //订阅事件响应
//    if(message.Event=='subscribe'){
//        res.reply('欢迎您关注我们，在接下来的时间里我们会一直陪伴着您！！！')
//    }
//
//    //菜单单击事件响应
//    if(message.Event == 'CLICK'){
//
//        api.getMaterialCount(function(error,result){
//            console.log(result)
//        })
//
//        /**
//         *  text(回复文本消息)的json格式{type:'text',content:''}
//         *  image(回复如片消息)的json格式{type:'image',content:{mediaId:''}}
//         *  voice(回复语音信息)的json格式{type:'voice',content:{mediaId:''}}
//         *  music(回复语音信息)的json格式{type:'music',content:{title:',description:'',musicUrl:'',hqMusicUrl:'', humbMediaId:''}}
//         *  video(回复视频媒体信息)的json格式{type:'video',content:{mediaId:'',title:'',description:''}}
//         *  news(回复图文消息)的json格式[{title:'news',description:'',picUrl:'',url:''}]
//         */
//        res.reply('')
//    }
//
//}).middlewarify())

let util = require('util')
let WexinEntry = require('./WexinEntry')
let weixin = new WexinEntry('hps', 'wxc28a24ac662a55e9', '681acfa307c2ab96559475fa409d7a6e')


router.use('/', function (req, res) {

    if (req.method === 'GET') {
        let query = req.query
        if (weixin.checkSignature(query))
            res.send(query.echostr)
        else
            res.send('error')
        res.end()
    } else {
        weixin.getReqJson(req, function (result) {

            console.log(result)
            if (result.Event === 'CLICK') {

                if (result.EventKey === 'V1001_GOOD') {
                    res.writeHead(200)
                    let text = '<xml>' +
                        '<ToUserName><![CDATA[%s]]></ToUserName>' +
                        '<FromUserName><![CDATA[%s]]></FromUserName>' +
                        '<CreateTime>%d</CreateTime>' +
                        '<MsgType><![CDATA[text]]></MsgType>' +
                        '<Content><![CDATA[你好]]></Content>' +
                        '</xml>'

                    let xml = util.format(text, result.ToUserName, result.FromUserName, new Date().getTime())

                    res.end(xml)
                    //res.format({'text/xml' : function(){
                    //    console.log(util.format(text,result.ToUserName,result.FromUserName,new Date().getTime()))
                    //}})
                    //res.end()
                }
            }
        })
    }
})


//api.uploadLogo('java.jpg', function(error,result){
//    console.log(result)
//})


module.exports = router
