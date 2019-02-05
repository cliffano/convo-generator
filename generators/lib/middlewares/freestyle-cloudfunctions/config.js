const voca = require('voca');
const YAML = require('yaml').default;

/**
 * This class manages Convo specification for Freestyle-CloudFunctions middleware.
 * It provides utility functions used for generating the middleware code via EJS templates.
 */
class FreestyleCloudFunctionsConfig {

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
  }

  /**
   * Creates an ID for the given Convo specification.
   *
   * @return {String} the ID
   */
  id() {
    return voca.slugify(this.convoSpec.info.title).replace('-', '');
  }

  queries() {
    return this._queries;
  }

  summariseQueries() {
    const self = this;
    this._queries = {
      queries: []
    };

    this.convoSpec.conversations.queries.forEach(function (query) {
      const _query = {
        name: query.name,
        messages: query.messages,
        replies: query.replies,
        operation: query.freestyle_cloudfunctions.operation_id
      }
      self._queries.queries.push(_query);
    });
  }
}

module.exports = FreestyleCloudFunctionsConfig;
