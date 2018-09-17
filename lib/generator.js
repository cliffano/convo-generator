const fs = require('fs');
const YeomanGenerator = require('yeoman-generator');

const dialogFlowAgent = require('./agents/dialogflow/generator');
const openApiCloudFunctionsMiddleware = require('./middlewares/openapi-cloudfunctions/generator');

class ConvoGenerator extends YeomanGenerator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('generatorType', { type: String, required: true });
    this.argument('env', { type: String, required: true });
    this.argument('convoSpec', { type: String, required: true });

    const generatorType = this.options.generatorType;
    this.envString = fs.readFileSync(this.options.env, 'utf8');
    this.convoSpecString = fs.readFileSync(this.options.convoSpec, 'utf8');

    let self = this;
    switch(generatorType) {
      case 'dialogflow-agent':
        self.generator = dialogFlowAgent;
        break;
      case 'openapi-cloudfunctions-middleware':
        self.generator = openApiCloudFunctionsMiddleware;
        break;
      default:
        console.error('Unsupported generator type: %s', generatorType);
    }
    this.generator.init(this);
  }

  generate() {
    this.generator.generate(this);
  }
}

module.exports = ConvoGenerator;
