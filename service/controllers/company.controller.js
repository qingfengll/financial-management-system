var express = require('express');
var router = express.Router();
var docController=require('../services/company.services');

router.post('/addCompany', docController.addCompany);// 增加用户接口
router.post('/delete', docController.delete);// 删除用户接口
router.post('/update', docController.update);// 修改用户接口
router.get('/getCompany', docController.getCompany);// 的到所有用户接口
router.post('/getCompanyByName', docController.getCompanyByName);// 根据名字的到所有用户接口
router.post('/getCompanyById', docController.getCompanyById);// 根据名字的到所有用户接口

module.exports = router;
