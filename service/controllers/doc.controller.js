var mongoose = require("mongoose");

var docModel = require("../models/doc.server.model");

module.exports = {
    create: function(req, res, next) {

        // var docEntity = new docModel(req.body);
        var docEntity = new docModel({
            title: 'aaa',
            type: 'dd',
            ext: '.jpg',
            size: 1024,
            Content: 'dsf ',
            created: Date.now(),
            creater: 'dsfadf '

        });
        console.log(docEntity);
        docModel.create(docEntity, function(err) {
            if (err) return next(err);

            return res.json(docEntity);
        });


    },
    getList: function(req, res, next) {

        var pagesize = parseInt(req.query.pagesize, 10) || 10;
        var pagestart = parseInt(req.query.pagestart, 10) || 1;
        console.log(pagesize + "  " + pagestart);
        docModel.find()
            .skip((pagestart - 1) + pagestart)
            .limit(pagesize).exec(function(err, results) {
            if (err) return next(err);
            if (!results) return next(new Error('doc not  found'));

            return res.json(results);
            //return res.json({id:1,name:"dddd"});
        });
    },
    getById: function(req, res, next) {
        //if (!did) return next(new Error('did not found'));
        console.log( req.params.did);
        docModel.findOne({
            _id: req.params.did
        })
            .exec(function(err, results) {
                if (err) return next(err);
                if (!results) return next(new Error('doc not  found'));

                return res.json(results);
            });
    }
};
