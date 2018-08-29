const fs = require('fs');
const DialogFlowConfig = require('./config');

/**
 * Parse additional arguments and initialise configurations.
 *
 * @param {Object} generator: the Convo generator object
 */
function init(generator) {
  generator.argument('convoSpec', { type: String, required: true });

  const convoSpecString = fs.readFileSync(generator.options.convoSpec, 'utf8');
  generator.config = new DialogFlowConfig(convoSpecString);
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

  ['agent.json', 'package.json'].forEach(function (fileName) {
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/' + fileName + '.ejs'),
      generator.destinationPath(fileName),
      generator.params
    );
  });

  generator.config.conversations().forEach(function (conversation) {
    generator.params.conversation = conversation;
    generator.fs.copyTpl(
      generator.templatePath('agents/dialogflow/intent.json.ejs'),
      generator.destinationPath('intents/' + conversation.name + '.json'),
      generator.params
    );
  });

  generator.config.conversations().forEach(function (conversation) {
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
}

module.exports = {
  init: init,
  generate: generate
}
