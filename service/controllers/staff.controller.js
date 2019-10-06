var express = require('express');
var router = express.Router();
var  docController=require('../services/staff.services');


router.get('/getStaff', docController.getStaff);//获取员工信息
router.get('/getStaffCount', docController.getStaffCount);//获取用户信息

module.exports = router;