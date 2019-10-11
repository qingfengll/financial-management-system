var express = require('express');
var router = express.Router();
var docController=require('../services/parts.services');

router.post('/add', docController.add);// 获得零件信息
router.get('/getAll', docController.getAll);
router.get('/getAllPart', docController.getAllPart);
router.get('/getMaterialParts', docController.getMaterialParts);
router.post('/update', docController.update);
router.post('/delete', docController.delete);
router.get('/getPartsCount', docController.getPartsCount);

module.exports = router;

