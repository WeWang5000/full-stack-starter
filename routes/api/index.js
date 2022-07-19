const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/musicwebsite', require('./musicwebsite'));
router.use('/passwords', require('./passwords'));
router.use('/users', require('./users'));

module.exports = router;
