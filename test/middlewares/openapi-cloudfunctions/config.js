const assert = require('assert');
const fs = require('fs');
const Config = require('../../../lib/middlewares/openapi-cloudfunctions/config');

describe('OpenAPI-CloudFunctions Middleware Config', function() {
  beforeEach(function () {
    const envString = fs.readFileSync('test/fixtures/env.yaml', 'utf8');
    const convoSpecString = fs.readFileSync('test/fixtures/convo.yaml', 'utf8');
    const openApiSpecString = fs.readFileSync('test/fixtures/openapi.yaml', 'utf8');
    this.config = new Config(envString, convoSpecString, openApiSpecString);
  });
  describe('apis', function() {
    it('should contain default API', function() {
      assert.equal(Object.keys(this.config.apis()).includes('defaultApi'), true);
    });
    it('should contain non-default API based on the tag', function() {
      assert.equal(Object.keys(this.config.apis()).includes('someTagApi'), true);
    });
  });
  describe('queries', function() {
    it('should contain all queries', function() {
      const queries = this.config.queries();
      assert.equal(queries.queries.length, 2);
    });
    it('should contain query with default API', function() {
      const queries = this.config.queries();
      assert.equal(queries.queries[1].name, 'Submitting data');
      assert.equal(queries.queries[1].api, 'someTagApi');
      assert.equal(queries.queries[1].method, 'postData2');
      assert.equal(queries.queries[1].replies.en, 'Finished sending your data');
      assert.equal(queries.queries[1].messages.en.length, 2);
      assert.equal(queries.queries[1].replies.de, 'Fertig Senden Ihrer Daten');
      assert.equal(queries.queries[1].messages.de.length, 1);
    });
    it('should contain query with non-default API', function() {
      const queries = this.config.queries();
      assert.equal(queries.queries[0].name, 'Retrieving data');
      assert.equal(queries.queries[0].api, 'defaultApi');
      assert.equal(queries.queries[0].method, 'getData1');
      assert.equal(queries.queries[0].replies.en, 'Here is your data... {{data}}');
      assert.equal(queries.queries[0].messages.en.length, 3);
      assert.equal(queries.queries[0].messages.en[0], 'Get me my data from {{dataSource}} right now');
      assert.equal(queries.queries[0].messages.en[1], 'G\'day, I want my data now from {{dataSource}}');
      assert.equal(queries.queries[0].messages.en[2], 'Retrieve from {{dataSource}} my data');
      assert.equal(queries.queries[0].replies.de, 'Hier sind Ihre Daten ... {{data}}');
      assert.equal(queries.queries[0].messages.de.length, 1);
      assert.equal(queries.queries[0].messages.de[0], 'Hol mir meine Daten');
    });
  });
  describe('basicHttpAuths', function() {
    it('should return true when it contains basic HTTP authentications', function() {
      assert.equal(this.config.hasBasicHttpAuths(), true);
    });
    it('should retrieve basic HTTP authentications', function() {
      const basicHttpAuths = this.config.basicHttpAuths();
      assert.equal(basicHttpAuths.length, 2);
      assert.equal(basicHttpAuths[0], 'some_http_basic_auth1');
      assert.equal(basicHttpAuths[1], 'some_http_basic_auth2');
    });
  });
});
