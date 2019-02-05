const fs = require('fs');
const FreestyleCloudFunctionsConfig = require('./config');

/**
 * Parse additional CLI arguments and initialise configurations.
 *
 * @param {Object} generator: the Convo generator object
 */
function init(generator) {
  generator.config = new FreestyleCloudFunctionsConfig(generator.envString, generator.convoSpecString);
  generator.params = {
    config: generator.config
  };
}

/**
 * Generate middleware files from EJS templates based on environment configuration, and Convo specification.
 *
 * @param {Object} generator: the Convo generator object
 */
function generate(generator) {
  generator.log('Generating Convo Freestyle-CloudFunctions Middleware templates for %s specification', generator.config.convoSpec.info.title);

  ['.gitignore', 'index.js', 'package.json', 'serverless.yml'].forEach(function (fileName) {
    generator.fs.copyTpl(
      generator.templatePath('middlewares/freestyle-cloudfunctions/' + fileName + '.ejs'),
      generator.destinationPath(fileName),
      generator.params
    );
  });
}

module.exports = {
  init: init,
  generate: generate
}
