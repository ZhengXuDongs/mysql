/**
 * Created by Administrator on 2017.7.7.
 */
import {sqlUserBase} from '../base/sqluser';
const log = require('log4js').getLogger('logic/sqluser');


export default class SqlUserLogic{

    static async saveSqlUser(ctx){
        let result = null;
        const userID = ctx.request.query.userID;
        const name = ctx.request.query.name;
        const age = ctx.request.query.age;
        const moble = ctx.request.query.mobile;
        const data = {
            userID:parseInt(userID),
            name:name,
            age:parseInt(age),
            mobile:moble
        };
        const where = {
            userID:userID
        };
        const SaveUser = await sqlUserBase.save({data,where});
        log.info(`SaveUser的值为：${SaveUser}`);
        if(SaveUser){
            if(SaveUser.type=='exist'){
                result = {rc:201,info:'exist!'};
            }else{
                result = {rc:200,info:SaveUser};
            }
        }else{
            result = {rc:202,info:'保存失败'};
        }
        ctx.body = result;
    }

    static async SearchSqlUser(ctx){
        let result = null;
        await sqlUserBase.search().then(OwnData=>{
            if(OwnData){
                result = {rc:200,info:OwnData};
            }else{
                result = {rc:202,info:'调取存储过程失败'};
            }
        });
        ctx.body = result;
    }

   /* static async SearchSqlUser(ctx){
        let result = null;
        const userID = ctx.request.query.userID;
        const field = 'age,name,mobile';
        const where = {
            userID:userID
        };
        const distinct = 'age,name,mobile';
        const order = 'age DESC';
        const SearchUser = await sqlUserBase.search({field,distinct,order});
        if(SearchUser){
            result = {rc:200,info:SearchUser};
        }else{
            result = {rc:202,info:'search failed!'};
        }
        ctx.body = result;
    }*/

    static async UpdateSqlUser(ctx){
        let result = null;
        const userID = ctx.request.query.userID;
        const where = {
            userID:userID
        };
        const updatas = {
            age:44,
            mobile:'123456'
        };
        const UpUser = await sqlUserBase.update(where,updatas);
        if(UpUser){
            result = {rc:200,info:UpUser};
        }else{
            result = {rc:202,info:'update failed!'};
        }
        ctx.body = result;
    }

    static async DeleteSqlUser(ctx){
        let result = null;
        const userID = ctx.request.query.userID;
        const where = {
            userID:userID
        };
        const DelUser = await sqlUserBase.delete({where});
        if(DelUser){
            result = {rc:200,info:DelUser};
        }else{
            result = {rc:202,info:'delete failed!'};
        }
        ctx.body = result;
    }

    static async CallStoreProcedure(ctx){
        let result = null;
        const StoreProcedure = `GetUserInfo('张三',@uid)`;
        await sqlUserBase.callStoreProcedure(StoreProcedure).then(OwnData=>{
            if(OwnData){
                result = {rc:200,info:OwnData};
            }else{
                result = {rc:202,info:'调取存储过程失败'};
            }
        });
        ctx.body = result;
    }

}
export  {SqlUserLogic};