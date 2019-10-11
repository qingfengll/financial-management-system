var models = require('../model/db');
var util = require('../libs/commonMethod');
var mysql = require('mysql');
var $sql = require('../model/parts.model');
var conn= mysql.createConnection(models.mysql);
var search = require('../model/search.model');
conn.connect();


module.exports = {
    add:function (req,res) {
        var sqlName = $sql.parts.add;
        var value = req.body;

        util.getMaxID('parts','parts_id',function(parts_id){
            console.log("ID" + parts_id);
            util.getMaxID('material_parts','material_parts_id',function(id){
                var sql_M_P = addParts_materialSql(value.addMaterialData,parts_id,id);
                //INSERT INTO parts(`parts_id`,`name`,specifications,unit,remark)VALUES (?,?,?,?,?)
                conn.query(sqlName,[parts_id,value.name,value.specifications,value.unit,value.remark], function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        var boo = true;
                        for(var i = 0; i < sql_M_P.length; i++){
                            conn.query(sql_M_P[i], function(err, result) {
                                if (err) {
                                    boo = false
                                    console.log(err);
                                }
                            });
                        }
                        if (boo) {
                            util.jsonWrite(res, result);
                        }
                    }
                },function (message) {
                    console.log(message);
                    res.send(message);
                });
            });
        });
    },
    getAll:function (req,res) {
        var sql = $sql.parts.select_all;
        var sql_name = search.slect_pages(sql,req.query);
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else {
                util.jsonWrite(res, result);
            }
        });
    },
    getAllPart:function(req,res){
        var sql = $sql.parts.select_all;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else {
                util.jsonWrite(res, result);
            }
        });
    },
    getPartsCount(req,res){
        var sql_name = $sql.parts.select_count;
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result[0] === undefined) {
                res.send('-1');   //查询不出username，data 返回-1
            } else {
                util.jsonWrite(res, result);
            }
        });
    },
    getMaterialParts:function (req,res) {
        var sqlName = $sql.material_parts.getAllByPartsId;

        conn.query(sqlName,req.query.id, function(err, result) {
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
    update:function (req,res) {
        var sqlName = $sql.parts.update;
        var data = req.body;

        //UPDATE parts SET name=?,specifications=?,unit=?,remark=? WHERE (parts_id=?)
        conn.query(sqlName,[data.name,data.specifications,data.unit,data.remark,data.parts_id], function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var sqlDelete = $sql.material_parts.delete;
                conn.query(sqlDelete,[data.parts_id], function(err, result) {
                    if (err) {
                        console.log(err);
                    }else{
                        util.getMaxID('material_parts','material_parts_id',function(id) {
                            var sql_M_P = addParts_materialSql(data.addMaterialData, data.parts_id, id);
                                for (var i = 0; i < sql_M_P.length; i++) {
                                    conn.query(sql_M_P[i], function (err, result) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            }
                        );
                    }
                });
                util.jsonWrite(res, result);
            }
        });
    },
    delete:function (req,res) {
        var sqlName = $sql.parts.delete;
        var sqlM_P_Name = $sql.material_parts.delete;

        conn.query(sqlM_P_Name,[req.body.id], function(err, result) {
            if(err){
                console.log(err);
                util.jsonWrite(res);
            }else{
                conn.query(sqlName,[req.body.id], function(err, result) {
                    if(err){
                        console.log(err);
                        util.jsonWrite(res);
                    }else{
                        util.jsonWrite(res,result);
                    }
                });
            }
        });
    }
};

var addParts_materialSql = function (data,parts_id,material_parts_id) {
    var resultSql = [];
    var sql = 'INSERT INTO material_parts (material_parts_id,length,price,number,material_id,parts_id) VALUES (?,?,?,?,?,?);';

    for(var i = 0; i < data.length; i++){
        var str = sql;
        str = str.replace('?',"'" + String(material_parts_id) + "'");
        material_parts_id = util.IdADD_1(material_parts_id);
        str = str.replace('?',data[i].length);
        str = str.replace('?',data[i].price);
        str = str.replace('?',data[i].number);
        str = str.replace('?',"'" + data[i].material_id + "'");
        str = str.replace('?',"'" + parts_id + "'");

        resultSql.push(str);
    }

    return resultSql;
}
