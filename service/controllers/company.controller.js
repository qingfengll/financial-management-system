var models = require('../model/db');
var util = require('../libs/commonMethod');
var mysql = require('mysql');
var $sql = require('../model/company.model');
var conn= mysql.createConnection(models.mysql);
conn.connect();

module.exports = {
    addCompany:function () {
        console.log(util.getMaxID('company_id','company'));
    },
    getCompany:function (req, res) {
        var sqlName = $sql.company.select_all;

        conn.query(sqlName, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                util.jsonWrite(res, result);
            }
        })
    },
    getCompanyByName:function (req,res) {
        var value = req.body;
        var sqlName = $sql.company.select_fromName;

        conn.query(sqlName,value.name, function(err, result) {
            console.log(this.sql);
            if (err) {
                console.log(err);
            }
            if (result) {
                util.jsonWrite(res, result);
            }
        })
    },
    getCompanyById:function (req,res) {
        var value = req.body;
        var sqlName = $sql.company.select_fromID;

        conn.query(sqlName,value.id, function(err, result) {
            console.log(this.sql);
            if (err) {
                console.log(err);
            }
            if (result) {
                util.jsonWrite(res, result);
            }
        })
    }
};
