const userApi = require('./api/userApi');
const company = require('./api/company.api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/user', userApi);
app.use('/company', company);
app.listen(3000);
console.log('success listen at port: 3000')
