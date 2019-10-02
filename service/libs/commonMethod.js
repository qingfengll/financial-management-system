var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('./commonModel');
var conn= mysql.createConnection(models.mysql);
conn.connect();

const ID = '0000000000';
module.exports = {
    //得到最大的ID
    getMaxID:function(tabelName, tabaleIdName){
        if(!isEmpty(tabelName) && !isEmpty(tabaleIdName)){
            var sql = $sql.common.select_max_id;
            conn.query(sql, [tabelName,tabaleIdName],function(err, result) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (result[0] === undefined) {
                    return false;
                } else {
                    var id = result[0];
                    return setMaxID(id);
                }
            })
        }else{
            return false;
        }
    },


    //判断字符串是否为空
    isEmpty:function (obj) {
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return true;
        }else{
            return false;
        }
    },
    //返回数据
    jsonWrite:function(res, ret) {
        if(typeof ret === 'undefined') {
            res.send('err');
        } else {
            console.log(ret);
            res.send(ret);
        }
    }
}

//下一个ID
var setMaxID = function(maxID){
    var num = parseInt(maxID);
    num += 1;
    num = String(num);
    return ID.substr(0,10-num.length)+num;
}
