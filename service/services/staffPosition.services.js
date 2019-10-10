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
    // getStaffCount(req,res){
    //     var sql_name = $sql.staff.select_count;
    //     conn.query(sql_name, function(err, result) {
    //         if (err) {
    //             console.log("cuowu " + result);
    //             console.log(err);
    //         }
    //         if (result[0] === undefined) {
    //             res.send('-1');   //查询不出username，data 返回-1
    //         } else {
    //             util.jsonWrite(res, result);
    //         }
    //     });
    // }
}