var mongoDb  = require('mongodb')
var server = new mongoDb.Server("127.0.0.1",27017,{ auto_reconnect : true })
var mongo = new mongoDb.Db("philosophy",server,{ safe : true })
//var objectId = new mongoDb.ObjectID();

module.exports = mongo;
