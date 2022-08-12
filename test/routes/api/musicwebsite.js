const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/musicwebsite', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['musicwebsite', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of musicwebsites', async () => {
      const response = await testSession.get('/api/musicwebsite').expect(HttpStatus.OK);
      const musicwebsite = response.body;
      assert.deepStrictEqual(musicwebsite.length, 2);
    });
  });

  describe('GET /:id', () => {
    it('returns one musicwebsite by id', async () => {
      const response = await testSession.get('/api/musicwebsite/1').expect(HttpStatus.OK);
      const musicwebsite = response.body; // all data coming back from server
      assert.deepStrictEqual(musicwebsite.Name, 'San Jose');
      assert.deepStrictEqual(musicwebsite.Created, '2019');
      assert.deepStrictEqual(musicwebsite.Pictures, 'xxx');
      assert.deepStrictEqual(musicwebsite.Audio, 'xxx');
    });

    it('returns NOT FOUND for an id not in the database', async () => {
      await testSession.get('/api/musicwebsite/0').expect(HttpStatus.NOT_FOUND);
    });
  });

  context('authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new musicwebsite', async () => {
        const response = await testSession //testing sending to the server
          .post('/api/musicwebsite')
          .set('Accept', 'application/json')
          .send({
            Name: 'This is a new musicwebsite Title',
            Created: 'This is a new musicwebsite Text',
            Pictures: 'https://via.placeholder.com/512',
            Audio: 'https://via.placeholder.com/512',
          })
          .expect(HttpStatus.CREATED);

        const { id, Name, Created, Pictures, Audio } = response.body; //checking response of service is correct
        assert(id);
        assert.deepStrictEqual(Name, 'This is a new musicwebsite Title');
        assert.deepStrictEqual(Created, 'This is a new musicwebsite Text');
        assert.deepStrictEqual(Pictures, 'https://via.placeholder.com/512');
        assert.deepStrictEqual(Audio, 'https://via.placeholder.com/512');

        const musicwebsite = await models.MusicWebsite.findByPk(id); //checking if it is found on data base
        assert(musicwebsite);
        assert.deepStrictEqual(musicwebsite.Name, 'This is a new musicwebsite Title');
        assert.deepStrictEqual(musicwebsite.Created, 'This is a new musicwebsite Text');
        assert.deepStrictEqual(musicwebsite.Pictures, 'https://via.placeholder.com/512');
        assert.deepStrictEqual(musicwebsite.Audio, 'https://via.placeholder.com/512');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing musicwebsite', async () => {
        const response = await testSession
          .patch('/api/musicwebsite/1')
          .set('Accept', 'application/json')
          .send({
            Name: 'This is an updated musicwebsite Title',
            Created: 'This is an updated musicwebsite Text',
            Pictures: 'https://updated.com/url',
            Audio: 'https://updated.com/url',
          })
          .expect(HttpStatus.OK);

        const { id, Name, Created, Pictures, Audio } = response.body;
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is an updated musicwebsite Title');
        assert.deepStrictEqual(Created, 'This is an updated musicwebsite Text');
        assert.deepStrictEqual(Pictures, 'https://updated.com/url');
        assert.deepStrictEqual(Audio, 'https://updated.com/url');

        const musicwebsite = await models.MusicWebsite.findByPk(id);
        assert(musicwebsite);
        assert.deepStrictEqual(musicwebsite.Name, 'This is an updated musicwebsite Title');
        assert.deepStrictEqual(musicwebsite.Created, 'This is an updated musicwebsite Text');
        assert.deepStrictEqual(musicwebsite.Pictures, 'https://updated.com/url');
        assert.deepStrictEqual(musicwebsite.Audio, 'https://updated.com/url');
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing musicwebsite', async () => {
        await testSession.delete('/api/musicwebsite/1').expect(HttpStatus.OK);
        const musicwebsite = await models.MusicWebsite.findByPk(1);
        assert.deepStrictEqual(musicwebsite, null);
      });
    });
  });
});
