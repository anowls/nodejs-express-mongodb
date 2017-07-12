var mysqlDB = require('mysql');
var mysql = mysqlDB.createConnection({ host : 'localhost', user : 'root', password : '123456', database : 'cloud' });
mysql.connect();

module.exports = mysql;
