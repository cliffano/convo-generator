const fs = require('fs');
const OpenApiCloudFunctionsConfig = require('./config');

/**
 * Parse additional arguments and initialise configurations.
 *
 * @param {Object} generator: the Convo generator object
 */
function init(generator) {
  generator.argument('openApiSpec', { type: String, required: true });
  const openApiSpecString = fs.readFileSync(generator.options.openApiSpec, 'utf8');

  generator.config = new OpenApiCloudFunctionsConfig(generator.envString, generator.convoSpecString, openApiSpecString);
  generator.params = {
    config: generator.config
  };
}

/**
 * Generate middleware files from EJS templates.
 *
 * @param {Object} generator: the Convo generator object
 */
function generate(generator) {
  generator.log('Generating Convo OpenAPI-CloudFunctions Middleware templates for %s specification', generator.config.convoSpec.info.title);

  ['.gitignore', 'index.js', 'package.json', 'serverless.yml'].forEach(function (fileName) {
    generator.fs.copyTpl(
      generator.templatePath('middlewares/openapi-cloudfunctions/' + fileName + '.ejs'),
      generator.destinationPath(fileName),
      generator.params
    );
  });
}

module.exports = {
  init: init,
  generate: generate
}
