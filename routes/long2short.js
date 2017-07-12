let util = require('../node_modules/wechat-api/lib/util.js')

exports.long2short = function (long_url, callback) {
    this.preRequest(this._long2short, arguments)
}

/*!
 * 二维码长码转短码
 */
exports._long2short = function (long_url, callback) {
    let url = this.prefix + 'shorturl?access_token=' + this.token.accessToken
    this.request(url, util.postJSON({action: 'long2short', long_url: long_url}), util.wrapper(callback))
}