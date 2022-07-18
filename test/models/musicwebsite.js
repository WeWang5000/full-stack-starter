const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');
const { before, iteratee } = require('lodash');
const musicwebsite = require('../../models/musicwebsite');

describe('models.MusicWebsite', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['musicwebsite']);
  });

  it('create a new MusicWebsite record', async () => {
    let MusicWebsite = models.MusicWebsite.build({
      Name: 'San Jose',
      Created: '2019',
      Pictures: 'xxx',
      Audio: 'xxx',
    });
    assert.deepStrictEqual(MusicWebsite.id, null);
    await MusicWebsite.save();
    assert(MusicWebsite.id);

    assert.deepStrictEqual(MusicWebsite.Name, 'San Jose');
    assert.deepStrictEqual(MusicWebsite.Created, '2019');
    assert.deepStrictEqual(MusicWebsite.Pictures, 'xxx');
    assert.deepStrictEqual(MusicWebsite.Audio, 'xxx');
  });
  it('fetches all the time', async () => {
    const results = await models.MusicWebsite.findAll();
    assert.deepStrictEqual(results.length, 2);
    console.log(results);
  });
});
