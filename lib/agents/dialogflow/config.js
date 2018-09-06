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
    this.summariseConversations();
  }

  convoSpec() {
    return this.convoSpec;
  }

  conversations() {
    return this._conversations;
  }

  summariseConversations() {
    const self = this;
    this._conversations = [];

    this.convoSpec.conversations.forEach(function (conversation) {
      const _conversation = {
        id: voca.slugify(conversation.name),
        name: conversation.name,
        messages: self.summariseMessages(conversation.messages)
      };
      self._conversations.push(_conversation);
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
}

module.exports = DialogFlowConfig;
