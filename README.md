<img align="right" src="https://raw.github.com/cliffano/convo-generator/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/convo-generator.svg)](http://travis-ci.org/cliffano/convo-generator)
[![Dependencies Status](https://img.shields.io/david/cliffano/convo-generator.svg)](http://david-dm.org/cliffano/convo-generator)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/convo-generator.svg)](https://coveralls.io/r/cliffano/convo-generator?branch=master)
[![Published Version](https://img.shields.io/npm/v/generator-convo.svg)](http://www.npmjs.com/package/generator-convo)
<br/>
[![npm Badge](https://nodei.co/npm/convo-generator.png)](http://npmjs.org/package/convo-generator)

Convo Generator
---------------

Convo Generator is a [Convo](http://github.com/cliffano/convo) agent and middleware generator using [Yeoman](http://yeoman.io/).

This generator reads the environment configuration, Convo specification, and OpenAPI specification, which would then be used to generate:

* A Convo agent in the form of [Dialogflow export zip](https://dialogflow.com/docs/agents/export-import-restore) which can then be imported or restored into your Dialogflow project
* A Convo middleware in the form of [Serverless app with CloudFunctions](https://github.com/serverless/serverless-google-cloudfunctions) which can then be deployed to your GCP project.

Please have a look at [Convo Thomas](http://github.com/cliffano/convo-thomas), [Convo Hacker News](http://github.com/cliffano/convo-hacker-news), and [Convo Jenkins](http://github.com/cliffano/convo-jenkins) as examples of how Convo Generator can be used.

Installation
------------

Install [Yeoman](http://yeoman.io/), [Serverless](https://serverless.com/), [dialogflow-cli](https://www.npmjs.com/package/dialogflow-cli):

    npm install -g yo serverless dialogflow-cli

Install Convo Generator itself:

    npm install -g convo-generator

Configuration
-------------

Create the following mandatory configuration files:

* [Environment configuration](https://github.com/cliffano/convo/blob/master/docs/conf-environment.md)
* [Convo specification](https://github.com/cliffano/convo/blob/master/docs/conf-convo-specification.md)

And depending on the middleware type specified in your Convo specification, you need to provide these additional configuration files:

| Middleware Type | Configuration File |
|-----------------|--------------------|
| OpenAPI-CloudFunctions | [OpenAPI specification](https://github.com/cliffano/convo/blob/master/docs/conf-openapi-specification.md) |

Usage
-----

Generate DialogFlow agent:

    yo convo dialogflow-agent <path/to/env.yaml> <path/to/convo-spec.yaml>

Deploy the generated agent:

    dialogflow-cli import --credentials <path/to/project-credentials.json> <path/to/generated-agent-dir/>

Alternatively, you can zip up the generated agent, and then [import or restore the zip file](https://dialogflow.com/docs/agents/export-import-restore) to Dialogflow.

Generate FreeStyle-CloudFunctions middleware:

    yo convo freestyle-cloudfunctions-middleware <path/to/env.yaml> <path/to/convo-spec.yaml> <path/to/openapi-spec.yaml>

Generate OpenAPI-CloudFunctions middleware:

    yo convo openapi-cloudfunctions-middleware <path/to/env.yaml> <path/to/convo-spec.yaml> <path/to/openapi-spec.yaml>

Deploy the generated middleware:

    serverless deploy

Colophon
--------

Related Projects:

* [Convo](http://github.com/cliffano/convo) - Specification-based voice and text conversation library
* [convo-node](http://github.com/cliffano/convo-node) - node.js utility module for Convo library
* [Convo Thomas](http://github.com/cliffano/convo-thomas) - Convo agent for Thomas the Tank Engine Facts
* [Convo Hacker News](http://github.com/cliffano/convo-hacker-news) - Convo agent and middleware for Hacker News
* [Convo Jenkins](http://github.com/cliffano/convo-jenkins) - Convo agent and middleware for Jenkins
