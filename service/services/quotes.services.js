var models = require('../model/db');
var mysql = require('mysql');
var $sql = require('../model/quotes.model');
var search = require('../model/search.model');
var conn= mysql.createConnection(models.mysql);
var util = require('../libs/commonMethod');
conn.connect();

module.exports = {
    getQuotes(req,res){
        var sqlSelect = $sql.quotes.select_all;
        var sql_name = search.slect_pages(sqlSelect,req.query);
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else{
                util.jsonWrite(res, result);
            }
        });

    },
    getQuotesAndPAY(req,res){
        var sqlSelect = $sql.quotes.getQuotesAndPAY;
        var sql_name = search.slect_pages(sqlSelect,req.query);
        conn.query(sql_name,[req.query.company_id],function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else{
                util.jsonWrite(res, result);
            }
        });
    },
    getSuitQuotesByID(req,res){
        var sqlSelect = $sql.suit_quotes.select_all_By_quotes_id;

        conn.query(sqlSelect,[req.query.id], function(err, result) {
            if (err) {
                console.log("cuowu " + result);
                console.log(err);
            }else{
                for(let i = 0; i < result.length; i++){
                    let data = {
                        suit_id:result[i].suit_id,
                        specifications:result[i].specifications,
                        name:result[i].name,
                        remark:result[i].remark,
                    };
                    result[i].suit = data;
                }
                util.jsonWrite(res, result);
            }
        });
    },
    getQuotesCount(req,res){
        var sql_name = $sql.quotes.select_count;
        conn.query(sql_name, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                util.jsonWrite(res, result);
            }
        });
    },
    getQuotesById(req,res){
        var sql_name = $sql.quotes.select_By_ID;
        conn.query(sql_name,[req.query.quotes_id], function(err, result) {
            if (err) {
                console.log(err);
            }else{
                util.jsonWrite(res, result);
            }
        });
    },

    addQuotes:function (req,res) {
        var sqlName = $sql.quotes.add;
        var value = req.body;
        var end_time = util.formateDate(value.end_time);
        var time = util.formateDate(value.time);

        util.getMaxID('quotes','quotes_id',function(id){
            //quotes_id,company_id,end_time,remark,time,
            // receiving_address,receiving_name,freight_company,accounts_payable
            conn.query(sqlName,[id,value.company_id,end_time,value.remark,time,
                value.receiving_address,value.receiving_name,
                value.freight_company,value.accounts_payable], function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    var sqlAddSuitQuotes = addSuit_quotesSql(value.addSuitQuotes, id);
                    for (let i = 0; i < sqlAddSuitQuotes.length; i++) {
                        conn.query(sqlAddSuitQuotes[i], function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    res.send("success");
                }

            },function (message) {
                console.log(message);
                res.send(message);
            });
        });
    },
    update:function (req,res) {
        var sqlName = $sql.quotes.update;
        var value = req.body;
        var end_time = util.formateDate(value.end_time);
        var time = util.formateDate(value.time);

        conn.query(sqlName,[value.company_id,end_time,value.remark,time,value.receiving_address,
                value.receiving_name,value.freight_company,value.accounts_payable,value.quotes_id],
            function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var sqlDelete = $sql.suit_quotes.delete;
                conn.query(sqlDelete,[value.quotes_id], function(err, result) {
                    if (err) {
                        console.log(err);
                    }else{
                        var sqlAddSuitQuotes = addSuit_quotesSql(value.addSuitQuotes, id);
                        for (var i = 0; i < sqlAddSuitQuotes.length; i++) {
                            conn.query(sqlAddSuitQuotes[i], function (err, result) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                });
                util.jsonWrite(res, result);
            }
        });
    },
    deleteSuit_quotes:function(req,res){
        var sqlName = $sql.quotes.delete;
        conn.query(sqlName,[req.body.quotes_id],function(err,result) {
            if(err) console.log(err);
            if(result){
                var sqlName_ = $sql.suit_quotes.delete;
                conn.query(sqlName_,[req.body.quotes_id],function(err,result) {
                    if(err) console.log(err);
                    if(result){
                        res.send("success");
                    }
                });
            }
        })
    },
    getQuotesAndAcc(req,res){
        var sqlName = $sql.account_statement.add;
        var value = req.body;
        var time = util.formateDate(value.time);

        //account_statement_id, company_id, quotes_id, paid,time
        util.getMaxID('account_statement','account_statement_id',function(id){
            conn.query(sqlName,[id,value.company_id,value.quotes_id,value.paid,time],function(err,result) {
                if(err) console.log(err);
                if(result){
                    var sql_ = 'UPDATE quotes SET now_payable = now_payable + ? WHERE quotes_id = ? AND company_id = ?';
                    conn.query(sql_,[value.paid,value.quotes_id,value.company_id],function(err,result) {
                        if(err){
                            console.log(err);
                        }else{
                            res.send("success");
                        }
                    })

                }
            });
        });
    },
    getAccountStatements(req,res){
        var sqlName = $sql.account_statement.getAccountStatements;
        var value = req.query;

        conn.query(sqlName,[value.company_id,value.quotes_id],function(err,result) {
            if(err) console.log(err);
            if(result){
                util.jsonWrite(res, result);
            }
        });
    },
    deleteACC(reqmres){
        var sqlName = $sql.account_statement.delete;
        var value = req.body;

        conn.query(sqlName,[value.account_statement_id],function(err,result) {
            if(err) console.log(err);
            if(result){
                util.jsonWrite(res, result);
            }
        });
    }
}

var addSuit_quotesSql = function (data,quotes_id,suit_id) {
    var resultSql = [];
    var sql = $sql.suit_quotes.add;

    //INSERT INTO suit_quotes (suit_id,quotes_id,number,price)
    for(var i = 0; i < data.length; i++){
        var str = sql;
        str = str.replace('?',"'" + String(data[i].suit.suit_id) + "'");
        str = str.replace('?',"'" + String(quotes_id) + "'");
        str = str.replace('?',data[i].number);
        str = str.replace('?',data[i].price);
        resultSql.push(str);
    }
    return resultSql;
}
