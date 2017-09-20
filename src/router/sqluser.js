/**
 * Created by Administrator on 2017.7.7.
 */
import Router from 'koa-router';
import { SqlUserLogic } from '../logic/sqluser';
const rt = new Router();

rt.get('/api/save',SqlUserLogic.saveSqlUser);
rt.get('/api/search',SqlUserLogic.SearchSqlUser);
rt.get('/api/update',SqlUserLogic.UpdateSqlUser);
rt.get('/api/del',SqlUserLogic.DeleteSqlUser);
rt.get('/api/callprocedure',SqlUserLogic.CallStoreProcedure);

export default rt;