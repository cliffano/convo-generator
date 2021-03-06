const voca = require('voca');
const YAML = require('yaml').default;

/**
 * This class manages Convo and OpenAPI specifications for OpenAPI-CloudFunctions middleware.
 * It provides utility functions used for generating the middleware code via EJS templates.
 */
class OpenApiCloudFunctionsConfig {

  /**
   * Initialises config and spec objects.
   * Creates spec summaries, which will be used for EJS templates processing.
   *
   * @param {String} envString: environment configuration YAML string
   * @param {String} convoSpecString: Convo specification YAML string
   * @param {String} openApiSpecString: OpenAPI specification YAML string
   */
  constructor(envString, convoSpecString, openApiSpecString) {
    this.env = YAML.parse(envString);
    this.convoSpec = YAML.parse(convoSpecString);
    this.openApiSpec = YAML.parse(openApiSpecString);
    this.summariseApis();
    this.summariseQueries();
    this.summariseSecuritySchemes();
  }

  /**
   * Creates an ID for the given Convo specification.
   *
   * @return {String} the ID
   */
  id() {
    return voca.slugify(this.convoSpec.info.title).replace('-', '');
  }

  apis() {
    return this._apis;
  }

  summariseApis() {
    const self = this;
    let hasDefaultApi = false;
    this._apis = {};

    Object.keys(this.openApiSpec.paths).forEach(function (pathKey) {
      const methods = self.openApiSpec.paths[pathKey];
      Object.keys(methods).forEach(function (methodKey) {
        const methodValue = methods[methodKey];
        const tags = methodValue.tags;
        if (!tags || tags.length === 0) {
          hasDefaultApi = true;
        } else {
          tags.forEach(function (tag) {
            if (!self._apis[tag]) {
              self._apis[tag + 'Api'] = voca.titleCase(tag) + 'Api';
            }
          });
        }
      });
    });

    // if any of the methods does not have any tag, that method is part of the default API
    if (hasDefaultApi) {
      this._apis['defaultApi'] = 'DefaultApi';
    }
  }

  queries() {
    return this._queries;
  }

  summariseQueries() {
    const self = this;
    this._queries = {
      queries: []
    };

    function _getQueryApi(operationId) {
      let queryApi = 'defaultApi';

      Object.keys(self.openApiSpec.paths).forEach(function (pathKey) {
        const methods = self.openApiSpec.paths[pathKey];
        Object.keys(methods).forEach(function (methodKey) {
          const methodValue = methods[methodKey];
          if (methodValue.operationId === operationId) {
            const tags = methodValue.tags;
            if (tags && tags.length > 0) {
              // multiple tags indicate that the operation is part of multiple
              // APIs, defaulting to use the first tag defined
              queryApi = tags[0] + 'Api';
            }
          }
        });
      });

      return queryApi;
    }

    this.convoSpec.conversations.queries.forEach(function (query) {
      const _query = {
        name: query.name,
        messages: query.messages,
        replies: query.replies,
        api: _getQueryApi(query.openapi_cloudfunctions.operation_id),
        method: query.openapi_cloudfunctions.operation_id
      }
      self._queries.queries.push(_query);
    });
  }

  basicHttpAuths() {
    return this._basicHttpAuths;
  }

  hasBasicHttpAuths() {
    return (this._basicHttpAuths && this._basicHttpAuths.length > 0);
  }

  summariseSecuritySchemes() {
    const self = this;
    this._basicHttpAuths = [];
    Object.keys(this.openApiSpec.components.securitySchemes).forEach(function (securitySchemeKey) {
      const securityScheme = self.openApiSpec.components.securitySchemes[securitySchemeKey];
      if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
        self._basicHttpAuths.push(securitySchemeKey);
      }
    });
  }
}

module.exports = OpenApiCloudFunctionsConfig;
