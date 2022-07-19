const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

const router = express.Router();

router.get('/', async (req, res) => {
  const records = await models.MusicWebsite.findAll();
  res.json(records.map((r) => r.toJSON()));
});

module.exports = router;
