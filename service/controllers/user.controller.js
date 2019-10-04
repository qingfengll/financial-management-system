var express = require('express');
var router = express.Router();
var  docController=require('../services/user.services');

router.post('/login', docController.login);//用户登陆
router.get('/getUser', docController.getUser);//获取用户信息
router.post('/modifyPassword', docController.modifyPassword);//修改密码

module.exports = router;
