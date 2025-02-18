const express = require('express');
const { getDetikNews } = require('../controllers/news.controller');
const router = express.Router();

router.get('/detik', getDetikNews);

module.exports = router;
