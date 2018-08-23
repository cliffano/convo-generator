const convo = require('convo-node');
const fs = require('fs');
const YeomanGenerator = require('yeoman-generator');

class ConvoGenerator extends YeomanGenerator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('convoSpec', { type: String, required: true });
    this.argument('openApi3Spec', { type: String, required: true });

    const convoSpecString = fs.readFileSync(this.options.convoSpec, 'utf8');
    const openApi3SpecString = fs.readFileSync(this.options.openApi3Spec, 'utf8');
    this.config = new convo.openApi3CloudFunctions.Config(convoSpecString, openApi3SpecString);
    this.params = {
      config: this.config
    };
  }

  generate() {
    this.log('Generating Convo OpenAPI3-CloudFunctions Middleware templates for %s specification', this.config.convoSpec.info.title);

    const self = this;
    ['.gitignore', 'index.js', 'package.json', 'serverless.yml'].forEach(function (fileName) {
      self.fs.copyTpl(
        self.templatePath(fileName + '.ejs'),
        self.destinationPath(fileName),
        self.params
      );
    });
  }
}

module.exports = ConvoGenerator;
