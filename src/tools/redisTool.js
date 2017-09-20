/**
 * Created by Administrator on 2017.7.11.
 */
let log = require('log4js').getLogger('tools/redisTool');
const config = require('../../config/app');
var redis = require('redis');
var client = connectRedis();
function connectRedis() {
    if(client){
        log.info('redis 退出');
        client.quit();
    }

    let minClient = redis.createClient(config.redis.port,config.redis.host,{
        connect_timeout: 3*1000,
        detect_buffers: true
    });
    log.info('redis 连接完成');
    return minClient;
}

client.on('connect',function (err) {
    log.info('redis 开始连接');
});
client.on('reconnecting',function (err) {
    log.info('redis 重新 开始连接');
});
client.on('ready',function (err) {
    log.info('redis ready');
});
client.on('disconnect',function (err) {
    log.info('redis 连接断开了');
});
client.on('error', function (error) {
    log.info("redis error 请检查");
});
client.on('end', function (error) {
    log.info("redis 重新连接");
    client = connectRedis();
});

process.on('uncaughtException',function (err) {
    let errorMsg = err.stack;
    if(errorMsg.toLowerCase().indexOf('connect ECONNREFUSED'.toLowerCase()) != -1 || errorMsg.toLowerCase().indexOf('Redis connection in broken state'.toLowerCase()) != -1){
        client = connectRedis();
        log.info('再次连接redis：'+ new Date().getTime());
    }else{
        log.info('server uncaughtException', errorMsg);
    }
});

export default class RedisTool {
    static setValue(k, v, seconds) {
        return new Promise((resolve, reject) => {
            try {
                if (!k) {
                    k = "Roban";
                }
                if (!v) {
                    v = "lee";
                }
                if (!seconds) {
                    seconds = -1;
                }
                //log.info("设置的redis的值:" + v);
                client.set(k, v, 'EX', seconds, function (err, response) {
                    log.info(err, response);
                    if (err) {
                        resolve(err);
                    } else {
                        resolve(response);
                    }
                });
            } catch (e) {
                log.error("设置值 exp");
                reject(e);
            }
        });
    }

    static getValue(k) {
        return new Promise((resolve, reject) => {
            try {
                if (!k) {
                    k = "Roban";
                }
                client.get(k, function (err, response) {
                    //log.info("获取redis值:", err, response);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            } catch (e) {
                log.error("获取值 exp");
                reject(e);
            }
        });
    }
}


module.exports = RedisTool;
