const express = require('express');
const router = express.Router();
const { getAnalogDataByDate } = require('./server');

router.get('/analog/date', getAnalogDataByDate);


module.exports = router;
