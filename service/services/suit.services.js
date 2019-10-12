var models = require('../model/db');
var util = require('../libs/commonMethod');
var mysql = require('mysql');
var $sql = require('../model/suit.model');
var conn= mysql.createConnection(models.mysql);
var search = require('../model/search.model');
conn.connect();

module.exports = {
    getAll:function (req,res) {
        var sql = $sql.suit.select_all;
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
    getAllSuit:function (req,res) {
        var sql = $sql.suit.select_all;
        conn.query(sql, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else {
                util.jsonWrite(res, result);
            }
        });
    },
    getSuitCount(req,res){
        var sql_name = $sql.suit.select_count;
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
    add:function (req,res) {
        var sqlName = $sql.suit.add;
        var value = req.body;

        util.getMaxID('suit','suit_id',function(suit_id){
            util.getMaxID('parts_suit','parts_suit_id',function(id){
                var sql_M_P = addParts_SuitSql(value.addPartsData,suit_id,id);
                //INSERT INTO suit (suit_id, name, specifications, remark, image) VALUES (?,?,?,?,?);
                conn.query(sqlName,[suit_id,value.name,value.specifications,value.remark,value.image], function(err, result) {
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
    update:function (req,res) {
        var sqlName = $sql.suit.update;
        var data = req.body;

        //UPDATE suit SET name=?, specifications=?, remark=? WHERE suit_id=?;
        conn.query(sqlName,[data.name,data.specifications,data.remark,data.suit_id], function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var sqlDelete = $sql.parts_suit.delete;
                conn.query(sqlDelete,[data.suit_id], function(err, result) {
                    if (err) {
                        console.log(err);
                    }else{
                        util.getMaxID('parts_suit','parts_suit_id',function(id) {
                                var sql_M_P = addParts_SuitSql(data.addPartsData, data.suit_id, id);
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
        var sqlName = $sql.suit.delete;
        var sqlM_P_Name = $sql.parts_suit.delete;

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
    },
    getPartsSuit:function (req,res) {
        var sqlName = $sql.parts_suit.getAllBySuitId;

        conn.query(sqlName,req.query.id, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }
            if (result[0] === undefined) {
                res.send('-1');   //查询不出username，data 返回-1
            } else {
                for(let i = 0; i < result.length; i++){
                    let parts = {};
                    parts.parts_id = result[i].parts_id;
                    parts.name = result[i].name;
                    parts.specifications = result[i].specifications;
                    parts.util = result[i].util;
                    parts.remark = result[i].remark;
                    result[i].parts = parts;
                }
                util.jsonWrite(res, result);
            }
        });
    },
}

var addParts_SuitSql = function (data,suit_id,parts_suit_id) {
    var resultSql = [];
    var sql = $sql.parts_suit.add;
    // add:'INSERT INTO parts_suit(parts_suit_id,parts_id,suit_id,
    // number,' +
    // 'price,pipe_cutting,weld,polish,drill,deep_tapping,' +
    // 'clipped_board,punching,bend,A_pillar,wage_cost,' +
    // 'material_loss,profit,other_cost)VALUES' +
    // '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',

    for(var i = 0; i < data.length; i++){
        var str = sql;
        str = str.replace('?',"'" + String(parts_suit_id) + "'");
        parts_suit_id = util.IdADD_1(parts_suit_id);
        str = str.replace('?',"'" + data[i].parts.parts_id + "'");
        str = str.replace('?',"'" + suit_id + "'");
        str = str.replace('?',data[i].number);
        str = str.replace('?',data[i].price);
        str = str.replace('?',data[i].pipe_cutting);
        str = str.replace('?',data[i].weld);
        str = str.replace('?',data[i].polish);
        str = str.replace('?',data[i].drill);
        str = str.replace('?',data[i].deep_tapping);
        str = str.replace('?',data[i].clipped_board);
        str = str.replace('?',data[i].punching);
        str = str.replace('?',data[i].bend);
        str = str.replace('?',data[i].A_pillar);
        str = str.replace('?',data[i].wage_cost);
        str = str.replace('?',data[i].material_loss);
        str = str.replace('?',data[i].profit);
        str = str.replace('?',data[i].other_cost);
        resultSql.push(str);
    }

    return resultSql;
}
