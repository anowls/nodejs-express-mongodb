/**
 * Created by Administrator on 2016/3/17.
 */
var express = require('express');
var router = express.Router();

var API = require('wechat-api');
var api = new API(autho.appid, autho.secret);

//微信接口认证方法
router.get('/', (function (req, res) {
    var token = "hps";

    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;

    var array = [token,timestamp,nonce];
    array.sort();

    var sha1 = crypto.createHash("sha1")
    sha1.update(array.join(""));
    if(sha1.digest("hex") != signature){
        res.send("error")
    }else{
        res.send(echostr)
    }
    res.end()
}))

//wechat-api的一些常用方法

//获取自定义菜单列表
api.getMenuConfig(function(error,result){
    console.log(result)
})

//获取二维码
api.createTmpQRCode(258641,604800,function(error,result){
    if(error) throw error
    //二维码长码转短码
    api.long2short(api.showQRCodeURL(result.ticket),function(error,result){
        console.log(result)
    })
});


//设置菜单按钮
var button = require("../routes/model/button.json")
api.createMenu(button,function(error,result){
    if(error) throw error
    console.log(result)
})

//上传多媒体文件
api.uploadMedia('java.jpg', "image", function(error,result){
    if(error) throw error
    console.log(result)
});

//xml2js用法
var xml2js = require('xml2js')
var parser = new xml2js.Parser();
parser.parseString(xml,function(error,result){
    console.log(result)
})