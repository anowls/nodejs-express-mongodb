var mysqlDb = require('mysql');
var mysql = mysqlDb.createConnection({ host : 'localhost', user : 'root', password : '', database : 'cloud' });
mysql.connect();

module.exports = mysql;
