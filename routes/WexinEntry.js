/**
 * Created by Administrator on 2016/3/17.
 */
let ejs = require('ejs')
let crypto = require('crypto')
let xml2js = require('xml2js')

let checkSignature = function (query) {
    let signature = query.signature
    let timestamp = query.timestamp
    let nonce = query.nonce

    let shasum = crypto.createHash('sha1')
    let arr = [this.weixinToken, timestamp, nonce].sort()
    shasum.update(arr.join(''))

    return shasum.digest('hex') === signature
}

let getReqJson = function (req, callback) {
    let buffers = []
    req.on('data', function (trunk) {
        buffers.push(trunk)
    })
    req.on('end', function () {
        let xml = Buffer.concat(buffers).toString('utf-8')
        let parser = new xml2js.Parser()
        parser.parseString(xml, function (error, result) {
            if (error) throw error
            if (result.xml.MsgType) {
                callback(result.xml)
            }
        })
    })
}

let WexinEntry = function (weixinToken, weixinAppid, weixinSecret) {
    this.weixinToken = weixinToken
    this.weixinAppid = weixinAppid
    this.weixinSecret = weixinSecret
}

WexinEntry.prototype.checkSignature = checkSignature
WexinEntry.prototype.getReqJson = getReqJson

module.exports = WexinEntry