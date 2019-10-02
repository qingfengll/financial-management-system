var express = require('express');
var router = express.Router();
var  docController=require('../controllers/company.controller');

router.post('/addCompany', docController.addCompany);// 增加用户接口
router.get('/getCompany', docController.getCompany);// 的到所有用户接口
router.post('/getCompanyByName', docController.getCompanyByName);// 根据名字的到所有用户接口
router.post('/getCompanyById', docController.getCompanyById);// 根据名字的到所有用户接口

module.exports = router;
