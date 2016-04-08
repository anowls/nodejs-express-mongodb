/**
 * Created by Administrator on 2016/3/17.
 */
var ejs = require('ejs');
var crypto = require('crypto')
var xml2js = require("xml2js")

var checkSignature = function (query) {
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;

    var shasum = crypto.createHash('sha1');
    var arr = [this.weixinToken, timestamp, nonce].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex') === signature;
}

var getReqJson = function(req,callback){
    var buffers = [];
    req.on("data",function(trunk){
        buffers.push(trunk)
    })
    req.on("end",function(){
        var xml = Buffer.concat(buffers).toString("utf-8")
        var parser = new xml2js.Parser();
        parser.parseString(xml,function(error,result){
            if(error) throw error
            if(result.xml.MsgType){
                callback(result.xml)
            }
        })
    })
}

var WexinEntry = function(weixinToken,weixinAppid,weixinSecret){
    this.weixinToken = weixinToken;
    this.weixinAppid = weixinAppid;
    this.weixinSecret = weixinSecret;
}

WexinEntry.prototype.checkSignature = checkSignature;
WexinEntry.prototype.getReqJson = getReqJson;

module.exports = WexinEntry;