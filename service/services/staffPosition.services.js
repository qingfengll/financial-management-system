var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/staffPosition.model');
var search = require('../model/search.model');
var conn= mysql.createConnection(models.mysql);
var util = require('../libs/commonMethod');
conn.connect();

module.exports = {
    getAllStaffPosition(req,res){
        var sql_name = $sql.staffPosition.select_all;
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }
            // if (result[0] === undefined) {
            //     res.send('-1');   //查询不出username，data 返回-1
            // } else {
                console.log(result);
                util.jsonWrite(res, result);
            // }
        });
    
    },
    getStaffPosition(req,res){
        var sql_name = search.slect_pages($sql.staffPosition.select_all,req.query);
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }
            // if (result[0] === undefined) {
            //     res.send('-1');   //查询不出username，data 返回-1
            // } else {
                util.jsonWrite(res, result);
            // }
        });
    },
    getPositionCount(req,res){
        var sql_name = $sql.staffPosition.select_count;
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }
            if (result[0] === undefined) {
                res.send('-1');   //查询不出username，data 返回-1
            } else {
                util.jsonWrite(res, result);
            }
        });
    },
    addPosition:function (req,res) {
        var sqlName = $sql.staffPosition.add;
        var value = req.body;
        util.getMaxID('staff_position','position_id',function(id){
            conn.query(sqlName,[id,value.position_name,value.base_pay,value.remark], function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.send("success");
                }
            },function (message) {
                console.log(message);
                res.send(message);
            });
        });
    },
    updatePosition:function (req,res) {
        var sqlName = $sql.staffPosition.update_position;
        var value = req.body;
            conn.query(sqlName,[value.position_name,value.base_pay,value.remark,value.position_id], function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    res.send("success");
                }
            },function (message) {
                console.log(message);
                res.send(message);
            });
    },
    deletePosition:function(req,res){
        var sqlName = $sql.staffPosition.delete;
        conn.query(sqlName,[req.body.position_id],function(err,result) {
            if(err) console.log(err);
            if(result){
                res.send("success");
            }
        })

    },
}