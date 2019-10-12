var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/staff.model');
var search = require('../model/search.model');
var conn= mysql.createConnection(models.mysql);
var util = require('../libs/commonMethod');
conn.connect();

module.exports = {
    getStaff(req,res){
        var sqlSelect = "select staff.*,job.position_name as job_name,job.base_pay,job.overtime_hourly_wage from staff left join staff_position job on staff.position_id = job.position_id"
        var sql_name = search.slect_pages(sqlSelect,req.query);
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
    getStaffCount(req,res){
        var sql_name = $sql.staff.select_count;
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
    getStaffById(req,res){
        var sql_name = $sql.staff.select_fromID;
        conn.query(sql_name,[req.query.staff_id], function(err, result) {
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
    addStaff:function (req,res) {
        var sqlName = $sql.staff.add;
        var value = req.body;
        var birthday = util.formateDate(value.birthday);
        util.getMaxID('staff','staff_id',function(id){
            conn.query(sqlName,[id,value.name,value.phone,value.position_id,value.sex,birthday,value.id_card,value.remark,value.overtime], function(err, result) {
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
    updateStaff:function (req,res) {
        var sqlName = $sql.staff.update_staff;
        var value = req.body;
        var birthday = util.formateDate(value.birthday);
            conn.query(sqlName,[value.name,value.phone,value.position_id,value.sex,birthday,value.id_card,value.remark,value.overtime,value.staff_id], function(err, result) {
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
    deleteStaff:function(req,res){
        var sqlName = $sql.staff.delete;
        conn.query(sqlName,[req.body.staff_id],function(err,result) {
            if(err) console.log(err);
            if(result){
                res.send("success");
            }
        })

    },
}