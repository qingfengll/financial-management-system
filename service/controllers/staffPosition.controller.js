var express = require('express');
var router = express.Router();
var  docController=require('../services/staffPosition.services');


router.get('/getAllStaffPosition', docController.getAllStaffPosition);//获取员工信息
router.get('/getPositionCount', docController.getPositionCount);//获取员工总数
router.get('/getStaffPosition', docController.getStaffPosition);//获取员工信息
router.post('/addPosition', docController.addPosition);
router.post('/updatePosition', docController.updatePosition);// 修改用户接口
router.post('/deletePosition', docController.deletePosition);

module.exports = router;