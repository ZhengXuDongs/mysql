/**
 * Created by Administrator on 2017.7.7.
 */
import mysql from '../base/mysqlHelper';//按封装好了的module进行对数据库操作，更简单
import conn from '../model/sqlConn';//按sql语句或存储结构或存储函数进行数据库操作，更灵活
const log = require('log4js').getLogger('base/sqlUserBase');

class sqlUserBase{
    /***
     * 按条件查询
     * @param field
     * @param where
     * @returns {Promise}
     */
   /* static async search({field,where,distinct,order}){
        return await new Promise((resolve,reject)=>{
            mysql.table('user').field(field).distinct(distinct).order(order).where(where).select().then(function (data,err) {
                if(err) reject(err);
                resolve(data);
                log.info('user表查询的数据：'+JSON.stringify(data));
            })
        })
    }*/
    static async search(){
        return await new Promise((resolve,reject)=>{
            conn.query('select * from user',function (err,rows) {
                if(err) reject(err);
                resolve(rows[0]);
                log.info(`user表的存储过程：${rows}`);
            });
        });
    }

    /***
     * 保存数据
     * @param data
     * @param where
     * @returns {Promise}
     */
    static async save({data,where}){
        return await new Promise((resolve,reject)=>{
            mysql.table('user').thenAdd(data,where,true).then(function (data,err) {
                if(err) reject(err);
                resolve(data);
                log.info('user表插入的数据：'+JSON.stringify(data));
            });
        });
    }

    /***
     * 按条件更新
     * @param updatas
     * @returns {Promise}
     */
    static async update(where,updatas){
        return await new Promise((resolve,reject)=>{
            mysql.table('user').where(where).update(updatas).then(function (affectRows,err) {
                if(err) reject(err);
                resolve(affectRows);
                log.info(`user表的更新行数：${affectRows}`);
            });
        });
    }

    /***
     * 按条件删除
     * @param where
     * @returns {Promise}
     */
    static async delete({where}){
        return await new Promise((resolve,reject)=>{
            mysql.table('user').where(where).delete().then(function (affectRows,err) {
                if(err) reject(err);
                resolve(affectRows);
                log.info(`user表的删除行数：${affectRows}`);
            });
        });
    }

    /***
     * 调用存储过程
     * @param StoreProcedure
     * @returns {Promise}
     */
    static async callStoreProcedure(StoreProcedure){
        return await new Promise((resolve,reject)=>{
            conn.query('CALL '+StoreProcedure,function (err,rows) {
                if(err) reject(err);
                resolve(rows[0]);
                log.info(`user表的存储过程：${rows}`);
            });
        });
    }

    /***
     * 自定义sql语句进行查询
     * @param data
     * @returns {Promise}
     * @constructor
     */
    static async AllTableSerarch(data){
        return await new Promise((resolve,reject)=>{
            mysql.query('SELECT %s FROM %s WHERE %s',data).then(function (data,err) {
                if(err) reject(err);
                resolve(data);
                log.info(`user 查询出来的结果为：${data}`);
            });
        });
    }

}

export {sqlUserBase};