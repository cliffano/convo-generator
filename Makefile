ci: clean deps lint

clean:
	rm -rf stage

deps:
	npm install .

lint:
	npm run-script lint

test:
	npm link
	mkdir -p stage
	cd stage && ../node_modules/yo/lib/cli.js convo-openapi3-cloudfunctions-middleware ../../convo/examples/jenkins.yaml ../../swaggy-jenkins/spec/jenkins-api.yml

deploy:
	cd stage && npm link convo-node && npm link convo-jenkins-helper && npm install . && ../node_modules/serverless/bin/serverless deploy

destroy:
	cd stage && ../node_modules/serverless/bin/serverless remove

.PHONY: ci clean deps lint test deploy destroy
