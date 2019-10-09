var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/staff.model');
var search = require('../model/search.model');
var conn= mysql.createConnection(models.mysql);
var util = require('../libs/commonMethod');
conn.connect();

module.exports = {
    getStaff(req,res){
        var sqlSelect = "select staff.*,job.position_name as job_name,job.base_pay from staff left join staff_position job on staff.position_id = job.position_id"
        var sql_name = search.slect_pages(sqlSelect,req.query);
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
    }
}