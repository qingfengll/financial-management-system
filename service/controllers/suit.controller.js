var express = require('express');
var router = express.Router();
var docController=require('../services/suit.services');

router.get('/getAll', docController.getAll);
router.get('/getSuitCount', docController.getSuitCount);
router.post('/add', docController.add);
router.post('/update', docController.update);
router.post('/delete', docController.delete);
router.get('/getPartsSuit', docController.getPartsSuit);

module.exports = router;

