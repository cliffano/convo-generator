ci: clean deps lint test install

clean:
	rm -rf stage

deps:
	npm install .

deps-local:
	cd ../convo-node && npm link

lint:
	npm run-script lint

test:
	npm run-script test

install:
	npm link

.PHONY: ci clean deps deps-local lint test install
