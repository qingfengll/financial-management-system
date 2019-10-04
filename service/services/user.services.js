var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/user.model');
var conn= mysql.createConnection(models.mysql);
var util = require('../libs/commonMethod');
conn.connect();

module.exports = {
    login:function(req,res){
        var sql_name = $sql.user.select_name;
        var params = req.body;
        conn.query(sql_name,[params.name], function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result[0] === undefined) {
                res.send({failure:true})   //查询不出username，data 返回-1
            } else {
                var resultArray = result[0];
                if(resultArray.password == params.password) {
                    util.jsonWrite(res, {data:result,success:true});
                } else {
                    console.log("对比错误");
                    res.send({success:true})   //username
                }
            }
        })
    },
    getUser: function(req,res){
        var sql_name = $sql.user.select_name;
        // var sql_password = $sql.user.select_password;
        var params = req.body;
        if (params.name) {
            sql_name += "where username ='"+ params.name +"'";
        }
        conn.query(sql_name, params.name, function(err, result) {
            console.log("women " + result);
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }
            // console.log(result);
            if (result[0] === undefined) {
                res.send('-1')   //查询不出username，data 返回-1
            } else {
                jsonWrite(res, result);
            }
        })
    },
    modifyPassword:function (req,res) {
        var sql_modify = $sql.user.update_user;
        var params = req.body;
        console.log(params);
        if (params.id) {
            sql_modify +=  " password = '" + params.pass +
                "',repeatPass = '" + params.checkPass +
                "' where id ='"+ params.id + "'";
        }
        conn.query(sql_modify, params.id, function(err, result) {
            if (err) {
                console.log(err);
            }
            // console.log(result);
            if (result.affectedRows === undefined) {
                res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
            } else {
                res.send('ok');
            }
        })
    }
};
