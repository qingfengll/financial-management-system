var models = require('../model/db');
var util = require('../libs/commonMethod');
var mysql = require('mysql');
var $sql = require('../model/material.model');
var conn= mysql.createConnection(models.mysql);
conn.connect();

module.exports = {
    add:function (req,res) {
        var sqlName = $sql.materila.add;
        var value = req.body;
        util.getMaxID('material','material_id',function(id){
            // INSERT INTO `material` (`material_id`,`width`,`heigjt`,`thick`,`count`,`name`,`price`)VALUES(?,?,?,?,?,?,?)',
            conn.query(sqlName,[id,value.width,value.height,value.thick,value.count,value.name,value.price], function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    util.jsonWrite(res, result);
                }
            },function (message) {
                console.log(message);
                res.send(message);
            });
        });
    },
    delete:function(req,res){
        console.log("shanchu");
        var sqlName = $sql.materila.delete;
        console.log(req.body.id);
        console.log(sqlName);
        conn.query(sqlName,[req.body.id],function (err,result) {
            if(err) console.log(err);
            if(result) util.jsonWrite(res,result);
        })

    },
    update:function(req,res){
        var sqlName = $sql.materila.update;
        var data = req.body;
        //UPDATE `material` SET `width`=?, `heigjt`=?, `thick`=?, `count`=?, `name`=?, `price`=? WHERE (`material_id`=?)
        conn.query(sqlName,[data.width,data.height,data.thick,
            data.count,data.name,data.price,data.material_id],function (err,result) {
            if(err) console.log(err);
            if(result) util.jsonWrite(res,result);
        })
    },
    getMaterial:function (req, res) {
        var sqlName = $sql.materila.select_all;

        conn.query(sqlName, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                util.jsonWrite(res, result);
            }
        })
    },
};
