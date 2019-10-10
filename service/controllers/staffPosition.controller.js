var express = require('express');
var router = express.Router();
var  docController=require('../services/staffPosition.services');


router.get('/getAllStaffPosition', docController.getAllStaffPosition);//获取员工信息
// router.get('/getStaffCount', docController.getStaffCount);//获取用户信息

module.exports = router;