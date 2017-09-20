/**
 * Created by Administrator on 2017.7.3.
 */
const Koa = require('koa');
console.log('koa start on port: %s');
const apps = new Koa();
const bodyParser = require('koa-bodyparser');
const log4js = require('log4js');
var cfg = require('../config/app');
var fs = require('fs');
var app = require('./app.js');//转入app.js



/*
 * 创建日志目录
 */
try {
    if (!fs.existsSync('./log'))
        fs.mkdirSync('./log');

    if (!fs.existsSync('./log/err'))
        fs.mkdirSync('./log/err');

    if (!fs.existsSync('./log/hour'))
        fs.mkdirSync('./log/hour');

    if (!fs.existsSync('./log/http'))
        fs.mkdirSync('./log/http');
} catch (e) {
    console.error('Create log directory exp: %s', e.message);
}

const log = log4js.getLogger('index');
// 日志配置加载，每隔 300秒检查设置变更！
log4js.configure('config/log4js.json', { reloadSecs: 300 });

async function main() {
    const port = process.env.PORT || cfg.app.port;
    const host = process.env.HOST || '';
    await new Promise((res, rej) => {
        const server = app.listen(port, host, res);
    // mongoose.connect(`mongodb://${cfg.db.conn}`);
    server.on('error', rej);
});

    log.info('koa start on port: %s', port);
}

main().catch(err => setImmediate( ()=> {throw err}) );