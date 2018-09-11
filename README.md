<img align="right" src="https://raw.github.com/cliffano/convo-generator/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/convo-generator.svg)](http://travis-ci.org/cliffano/convo-generator)
[![Dependencies Status](https://img.shields.io/david/cliffano/convo-generator.svg)](http://david-dm.org/cliffano/convo-generator)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/convo-generator.svg)](https://coveralls.io/r/cliffano/convo-generator?branch=master)
[![Published Version](https://img.shields.io/npm/v/convo-generator.svg)](http://www.npmjs.com/package/convo-generator)
<br/>
[![npm Badge](https://nodei.co/npm/convo-generator.png)](http://npmjs.org/package/convo-generator)

Convo Generator
---------------

Convo Generator is a [Convo](http://github.com/cliffano/convo) agent and middleware generator using [Yeoman](http://yeoman.io/).

This generator reads the environment configuration, Convo specification, and OpenAPI specification, which would then be used to generate:

* A Convo agent in the form of [Dialogflow export zip](https://dialogflow.com/docs/agents/export-import-restore) which can then be imported or restored into your Dialogflow project
* A Convo middleware in the form of [Serverless app with CloudFunctions](https://github.com/serverless/serverless-google-cloudfunctions) which can then be deployed to your GCP project.

Please have a look at [Convo Jenkins](http://github.com/cliffano/convo-jenkins) and [Convo ipify](http://github.com/cliffano/convo-ipify) as examples of how Convo Generator can be used.

Configuration
-------------

Create the following configuration files:

1. [Environment configuration](https://github.com/cliffano/convo/blob/master/docs/environment-configuration.md)
2. [Convo specification](https://github.com/cliffano/convo/blob/master/docs/convo-specification.md)
3. [OpenAPI specification](https://github.com/cliffano/convo/blob/master/docs/openapi-specification.md)

Usage
-----

Generate DialogFlow agent:

    yo convo dialogflow-agent </path/to/env.yaml> </path/to/convo-spec.yaml>

Generate OpenAPI-CloudFunctions middleware:

    yo convo openapi-cloudfunctions-middleware </path/to/env.yaml> </path/to/convo-spec.yaml> </path/to/openapi-spec.yaml>

Colophon
--------

Related Projects:

* [Convo](http://github.com/cliffano/convo) - Specification based voice and text conversation app
* [convo-node](http://github.com/cliffano/convo-node) - node.js utility module for Convo voice framework
* [Convo Jenkins](http://github.com/cliffano/convo-jenkins) - Convo agent and middleware for Jenkins
* [Convo Jenkins Helper](http://github.com/cliffano/convo-jenkins-helper) - Helper node.js module for Convo Jenkins
* [Convo ipify](http://github.com/cliffano/convo-ipify) - Convo agent and middleware for ipify
