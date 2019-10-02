var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/sqlMap');
var conn= mysql.createConnection(models.mysql);
conn.connect();

module.exports = {
    addUser:function(){
        var sql = $sql.user.add;
        var params = req.body;
        console.log(params);
        console.log(params.birth);
        conn.query(sql, [params.name, params.account, params.pass, params.checkPass,
            params.email, params.phone, params.card, dateStr(params.birth), params.sex], function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        })
    },
    login:function(){
        var sql_name = $sql.user.select_name;
        var params = req.body;
        if (params.name) {
            sql_name += " where username ='"+ params.name +"'";
            console.log(sql_name);
        }
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result[0] === undefined) {
                res.send({failure:true})   //查询不出username，data 返回-1
            } else {
                var resultArray = result[0];
                if(resultArray.password == params.password) {
                    jsonWrite(res, {data:result,success:true});
                } else {
                    console.log("对比错误");
                    res.send({success:true})   //username
                }
            }
        })
    },
    getUser: function(){
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
    updateUser:function(){
        var sql_update = $sql.user.update_user;
        var params = req.body;
        console.log(params);
        if (params.id) {
            sql_update  += " email = '" + params.email +
                "',phone = '" + params.phone +
                "',card = '" + params.card +
                "',birth = '" + params.birth +
                "',sex = '" + params.sex +
                "' where id ='"+ params.id + "'";
        }
        conn.query(sql_update, params.id, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            if (result.affectedRows === undefined) {
                res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
            } else {
                res.send('ok');
            }
        })
    },
    modifyPassword:function () {
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
