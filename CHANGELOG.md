# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.5] - 2019-02-06

### Added
- Add Freestyle-CloudFunctions middleware type

### Changed
- ID is now variable name friendly

### Fixed
- Fix webhook enablement to check for any middleware instead of specific OpenApi-CloudFunctions type #3

## [0.0.4] - 2019-02-04

### Changed
- Dialogflow agent enables webhook only when Convo spec contains a middleware #3
- Upgrade middleware convo-node dependency to 0.0.3

### Added
- Parameterise serverless.yaml template credentials config

### Fixed
- Fix responses array syntax in DialogFlow intent template

## [0.0.3] - 2019-01-30

### Changed
- Move lib/ folder under generators/ for inclusion in Yeoman

## [0.0.2] - 2019-01-24

### Added
- Add support for query replies pre-defined in Convo specification
- Add support for webhook-less Dialogflow agent

### Changed
- Retrieve Dialogflow supported languages from Convo specification #2

### Removed
- Remove character escaping for JSON property values #1

## [0.0.1] - 2018-09-11

### Added
- Initial version
