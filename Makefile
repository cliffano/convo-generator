ci: clean deps lint install

clean:
	rm -rf stage

deps:
	npm install .

lint:
	npm run-script lint

install:
	npm link

.PHONY: ci clean deps lint install
