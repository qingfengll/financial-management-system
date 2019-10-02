var express = require('express');
var router = express.Router();
var  docController=require('../controllers/user.controller');

router.post('/addUser', docController.addUser);// 增加用户接口
router.post('/login', docController.login);//用户登陆
router.get('/getUser', docController.getUser);//获取用户信息
router.post('/updateUser', docController.updateUser)//更新用户信息
router.post('/modifyPassword', docController.modifyPassword);//修改密码

module.exports = router;
