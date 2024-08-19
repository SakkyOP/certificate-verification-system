const router = require('express').Router();
const { storage } = require('../services');
const { fileController } = require('../controllers');

router.post('/upload', storage.any('excel'), fileController);

module.exports = router