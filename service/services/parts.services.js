var models = require('../model/db');
var util = require('../libs/commonMethod');
var mysql = require('mysql');
var $sql = require('../model/parts.model');
var conn= mysql.createConnection(models.mysql);
conn.connect();


module.exports = {
    add:function (req,res) {
        var sqlName = $sql.parts.add;
        var value = req.body;

        util.getMaxID('material','material_id',function(id){
            console.log("ID " + id);
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
};
