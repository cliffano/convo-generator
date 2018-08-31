<img align="right" src="https://raw.github.com/cliffano/convo-generator/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/convo-generator.svg)](http://travis-ci.org/cliffano/convo-generator)

Convo Generator
---------------

Convo Generator is a [Convo](http://github.com/cliffano/convo) agent and middleware generator using [Yeoman](http://yeoman.io/).

Configuration
-------------



Usage
-----

Generate DialogFlow agent:

    yo convo dialogflow-agent </path/to/env.yaml> </path/to/convo-spec.yaml>

Generate OpenAPI-CloudFunctions middleware:

    yo convo openapi-cloudfunctions-middleware </path/to/env.yaml> </path/to/convo-spec.yaml> </path/to/openapi-spec.yaml>

Colophon
--------

Related Projects:

* [convo](http://github.com/cliffano/convo) - Conversation specification based ChatOps tool
* [convo-node](http://github.com/cliffano/convo-node) - node.js module for Convo ChatOps tool

Example Projects:

* [convo-jenkins](http://github.com/cliffano/convo-jenkins) - Convo agent and middleware for Jenkins
* [convo-jenkins-helper](http://github.com/cliffano/convo-jenkins-helper) - Convo helper library for Jenkins
* [convo-ipify](http://github.com/cliffano/convo-ipify) - Convo agent and middleware for ipify
