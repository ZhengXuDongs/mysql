/**
 * Created by Administrator on 2017.7.3.
 */
import Koa from 'koa'; // koa web 服务框架
var bodyParser = require('koa-bodyparser');
//var router = require('../src/router'); // 该路径下的 index.js
import router from '../src/router';
var cors = require('koa-cors');

var Router = require('koa-router');
const route = new Router();
const log = require('log4js').getLogger('app');


const app = new Koa();
//export default app;//src/index.js 要用import app from './app';引入进来
module.exports = app;//src/index.js 要用var app = require('./app.js');引入进来
//log.info('我是城西小学');

app.use(bodyParser());

app.use(cors());

// 加载路由中间件,处理路由匹配,无法匹配的,回到静态文件处理,静态文件找不到的,返回不存在错误!
app.use(router.routes());