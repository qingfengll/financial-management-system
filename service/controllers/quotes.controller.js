var express = require('express');
var router = express.Router();
var docController=require('../services/quotes.services');

router.post('/addQuotes', docController.addQuotes);
router.post('/deleteSuitQuotes', docController.deleteSuit_quotes);
router.post('/update', docController.update);
router.get('/getQuotesCount', docController.getQuotesCount);
router.get('/getQuotes', docController.getQuotes);
router.get('/getQuotesById', docController.getQuotesById);
router.get('/getSuitQuotesByID', docController.getSuitQuotesByID);
router.get('/getQuotesAndPAY', docController.getQuotesAndPAY);
router.post('/getQuotesAndAcc', docController.getQuotesAndAcc);
router.get('/getAccountStatements', docController.getAccountStatements);
router.post('/deleteACC', docController.deleteACC);

module.exports = router;

