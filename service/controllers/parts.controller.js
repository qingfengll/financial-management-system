var express = require('express');
var router = express.Router();
var docController=require('../services/parts.services');

router.post('/add', docController.add);// 获得零件信息
router.get('/getMaterial', docController.getMaterial);
router.post('/update', docController.update);
router.post('/delete', docController.delete);

module.exports = router;

