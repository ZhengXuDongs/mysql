/**
 * Created by Administrator on 2017.7.7.
 */
var Mysql = require('node-mysql-promise');
var mysql = Mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'zxdDB',
    port:3306
});

export default mysql;
