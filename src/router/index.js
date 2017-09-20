/**
 * Created by Administrator on 2017.7.3.
 */
import Router from 'koa-router';
import sqluser from './sqluser';
const log = require('log4js').getLogger('router/index');

var wrapper = require('co-mysql'),
    mysql = require('mysql'),
    co = require('co');

/*var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'zxdDB',
    port:3306
});
conn.connect();*/



const rt = new Router();

/*rt.get('/ss',async ctx=>{
 let result = null;
 var ss =  function(){
 return new Promise((ok,err)=>{
 conn.query('CALL GetUserInfo();',function (err,rows,fields) {
 if(err) throw err;
 console.log('The solution is: ', rows);
 result = rows[0];
 ok();
 });
 });
 };

 await  ss();
 log.info(`result的值为：${result}`);
 //log.info('第一个页面');
 ctx.body = result;
 });*/
/*rt.get('/ss',async ctx=>{
    let result = null;
    var ss =  function(){
        return new Promise((ok,err)=>{
            conn.query('SELECT * from user',function (err,rows,fields) {
                if(err) throw err;
                console.log('The solution is: ', rows);
                result = rows;
                ok();
            });
        });
    };

    await  ss();
    log.info(`result的值为：${result}`);
    //log.info('第一个页面');
    ctx.body = result;
});

rt.get('/pp',ctx=>{
    log.info('第一个页面');
    ctx.body = '第一个页面';
});*/

rt.use('/sqluser',sqluser.routes());


export default rt;