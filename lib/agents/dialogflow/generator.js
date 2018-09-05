const fs = require('fs');
const voca = require('voca');
const DialogFlowConfig = require('./config');

/**
 * Parse additional arguments and initialise configurations.
 *
 * @param {Object} generator: the Convo generator object
 */
function init(generator) {
  generator.config = new DialogFlowConfig(generator.envString, generator.convoSpecString);
  generator.params = {
    config: generator.config
  };
}

/**
 * Generate agent files from EJS templates.
 *
 * @param {Object} generator: the Convo generator object
 */
function generate(generator) {
  generator.log('Generating Convo DialogFlow Agent templates for %s specification', generator.config.convoSpec.info.title);
  const conversations = generator.config.conversations();

  ['agent.json', 'package.json'].forEach(function (fileName) {
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/' + fileName + '.ejs'),
      generator.destinationPath(fileName),
      generator.params
    );
  });

  ['welcome.json', 'fallback.json'].forEach(function (fileName) {
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/' + fileName + '.ejs'),
      generator.destinationPath('intents/' + fileName),
      generator.params
    );
  });

  conversations.forEach(function (conversation) {
    generator.params.conversation = conversation;
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/intent.json.ejs'),
      generator.destinationPath('intents/' + conversation.name + '.json'),
      generator.params
    );
  });

  conversations.forEach(function (conversation) {
    generator.params.conversation = conversation;
    Object.keys(conversation.messages).forEach(function (language) {
      generator.params.language = language;
      generator.fs.copyTpl(
        generator.templatePath('agents/dialogflow/intent_usersays_lang.json.ejs'),
        generator.destinationPath('intents/' + conversation.name + '_usersays_' + language + '.json'),
        generator.params
      );
    });
  });

  var params = {};
  conversations.forEach(function (conversation) {
    Object.keys(conversation.messages).forEach(function (language) {
      conversation.messages[language].forEach(function (message) {
        message.params.forEach(function (param) {
          params[param] = {
            synonyms: [param, voca.titleCase(param)],
            languages: []
          };
          if (!params[param].languages.includes(language)) {
            params[param].languages.push(language);
          }
        });
      });
    });
  });

  Object.keys(params).forEach(function (paramName) {
    const param = params[paramName];
    param.name = paramName;
    generator.params.param = param;
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/entity.json.ejs'),
      generator.destinationPath('entities/' + param.name + '.json'),
      generator.params
    );
  });

  Object.keys(params).forEach(function (paramName) {
    const param = params[paramName];
    param.name = paramName;
    generator.params.param = param;
    param.languages.forEach(function (language) {
      generator.fs.copyTpl(
        generator.templatePath('agents/dialogflow/entity_entries_lang.json.ejs'),
        generator.destinationPath('entities/' + param.name + '_entries_' + language + '.json'),
        generator.params
      );
    });
  });
}

module.exports = {
  init: init,
  generate: generate
}
