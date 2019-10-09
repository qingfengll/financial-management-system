var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('./commonModel');
var conn= mysql.createConnection(models.mysql);
conn.connect();

const ID = '0000000000';

module.exports = {
    maxID:ID,
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
            res.send(ret);
        }
    },
    //得到最大的ID
    getMaxID: function getData(tableName,tableIdName,callback,fail){
        var sql = 'select max(' + tableIdName + ') id from ' + tableName;
        conn.query(sql,function(err, result) {
            if (err) {console.log(sql);
                console.log(err);
                fail(err);
            }
            if (result[0] == undefined) {
                fail('没有找到值');
            } else {
                callback(setMaxId(result[0].id));
            }
        });
    },
    IdADD_1:function (id) {
        if(id == NaN){
            id = ID;
        }
        var num =  String(parseInt(id) + 1);
        num = ID.substr(0,10-num.length)+num;
        return num;
    }
}
var setMaxId = function(maxID){
    if(maxID == NaN || maxID == 'NaN' || maxID == '' || maxID == undefined || maxID == null){
        maxID = ID;
    }
    var num =  String(parseInt(maxID) + 1);
    num = ID.substr(0,10-num.length)+num;
    return num;
}
var isEmpty = function (obj) {
    if(typeof obj == "undefined" || obj == null || obj == "" || obj == NaN){
        return true;
    }else{
        return false;
    }
}
