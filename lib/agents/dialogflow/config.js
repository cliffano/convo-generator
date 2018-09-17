const _ = require('lodash');
const voca = require('voca');
const YAML = require('yaml').default;

/**
 * This class manages Convo specification for DialogFlow agent.
 * It provides utility functions used for generating the agent code via EJS templates.
 */
class DialogFlowConfig {

  /**
   * Initialises config and spec objects.
   * Creates spec summaries, which will be used for EJS templates processing.
   *
   * @param {String} envString: environment configuration YAML string
   * @param {String} convoSpecString: Convo specification YAML string
   */
  constructor(envString, convoSpecString) {
    this.env = YAML.parse(envString);
    this.convoSpec = YAML.parse(convoSpecString);
    this.summariseQueries();
    this.summariseLanguages();
  }

  convoSpec() {
    return this.convoSpec;
  }

  queries() {
    return this._queries;
  }

  languages() {
    return this._languages;
  }

  summariseQueries() {
    const self = this;
    this._queries = {
      queries: []
    };

    this.convoSpec.conversations.queries.forEach(function (query) {
      const _query = {
        id: voca.slugify(query.name),
        name: query.name,
        messages: self.summariseMessages(query.messages)
      };
      self._queries.queries.push(_query);
    });
  }

  summariseMessages(messages) {
    var _messages = {};
    Object.keys(messages).forEach(function (language) {
      _messages[language] = [];
      messages[language].forEach(function (message) {
        var _message = {
          text: message,
          fragments: [],
          params: []
        };

        // identify message fragments by splitting on parameters
        var fragments = message.replace(/\{\{/g, '{').replace(/\}\}/g, '}').split(/[\{,\}]/);

        // identify the parameters within the message
        var params = message.match(/\{\{[^\{\}]+\}\}/g);
        // trim the leading and trailing param curly braces
        if (params) {
          params.forEach(function (param) {
            const _param = param.replace(/^\{\{|\}\}$/g, '');
            _message.params.push(_param);
          });
        }

        if (fragments) {
          fragments.forEach(function (fragment) {
            var _fragment = {
              text: fragment,
              is_param: params ? _message.params.includes(fragment) : false
            };
            _message.fragments.push(_fragment);
          });
        }

        _messages[language].push(_message);
      });
    });
    return _messages;
  }

  summariseLanguages() {
    const self = this;
    this._languages = [];

    let greetingsLanguages = Object.keys(this.convoSpec.conversations.greetings.replies);
    let unknownsLanguages = Object.keys(this.convoSpec.conversations.unknowns.replies);

    let queriesLanguages = [];
    this.convoSpec.conversations.queries.forEach(function (query) {
      queriesLanguages = _.union(queriesLanguages, Object.keys(query.messages));
    });

    this._languages = _.union(greetingsLanguages, unknownsLanguages, queriesLanguages);
  }
}

module.exports = DialogFlowConfig;
