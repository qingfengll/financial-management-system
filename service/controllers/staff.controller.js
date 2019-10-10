var express = require('express');
var router = express.Router();
var  docController=require('../services/staff.services');


router.get('/getStaff', docController.getStaff);//获取员工信息
router.get('/getStaffCount', docController.getStaffCount);//获取员工总数
router.post('/addStaff', docController.addStaff);
router.get('/getStaffById',docController.getStaffById);
router.post('/updateStaff', docController.updateStaff);// 修改用户接口
router.post('/deleteStaff', docController.deleteStaff);

module.exports = router;