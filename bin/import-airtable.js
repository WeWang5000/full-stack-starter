#!/usr/bin/env node

'use strict';

const fetch = require('node-fetch');

const models = require('../models');

fetch(`https://api.airtable.com/v0/apparv2j6EOOrgYaX/Table%201?api_key=keyFqsLeVJmDj3HEX`)
  .then((response) => response.json())
  .then(async (data) => {
    for (const record of data.records) {
      const { fields } = record;
      const musicwebsite = models.MusicWebsite.build({
        Name: fields.Name,
        Created: fields.Created,
        Pictures: fields.Pictures?.[0]?.url,
        Audio: fields.Audio?.[0]?.url,
      });
      await musicwebsite.save();
    }
  });
