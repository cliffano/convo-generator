const assert = require('assert');
const fs = require('fs');
const Config = require('../../../lib/agents/dialogflow/config');

describe('DialogFlow Agent Config', function() {
  beforeEach(function () {
    const envString = fs.readFileSync('test/fixtures/env.yaml', 'utf8');
    const convoSpecString = fs.readFileSync('test/fixtures/convo.yaml', 'utf8');
    const config = new Config(envString, convoSpecString);
    this.conversations = config.conversations();
  });
  describe('queries', function() {
    it('should contain all languages', function() {
      assert.equal(Object.keys(this.conversations.queries[0].messages)[0], 'en');
      assert.equal(Object.keys(this.conversations.queries[0].messages)[1], 'de');
    });
    it('should contain all messages', function() {
      assert.equal(this.conversations.queries[0].messages.en.length, 3);
      assert.equal(this.conversations.queries[0].messages.de.length, 1);
      assert.equal(this.conversations.queries[1].messages.en.length, 2);
      assert.equal(this.conversations.queries[1].messages.de.length, 1);
    });
    it('should contain fragments and params', function() {
      assert.equal(this.conversations.queries[0].messages.en[0].text, 'Get me my data from {{dataSource}} right now');
      assert.equal(this.conversations.queries[0].messages.en[0].fragments.length, 3);
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[0].text, 'Get me my data from ');
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[0].is_param, false);
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[1].text, 'dataSource');
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[1].is_param, true);
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[2].text, ' right now');
      assert.equal(this.conversations.queries[0].messages.en[0].fragments[2].is_param, false);
      assert.equal(this.conversations.queries[0].messages.en[0].params.length, 1);
      assert.equal(this.conversations.queries[0].messages.en[0].params[0], 'dataSource');
    });
    it('should handle message with single fragment and no param', function() {
      assert.equal(this.conversations.queries[1].messages.en[0].text, 'Here\'s my data');
      assert.equal(this.conversations.queries[1].messages.en[0].fragments.length, 1);
      assert.equal(this.conversations.queries[1].messages.en[0].params.length, 0);
    });
  });
});
