# --- promise-q

install:
	npm install

min: install
	@echo "minified version"
	@$(shell npm bin)/uglifyjs azazel.js -o azazel.min.js -c -m

test.events:
	$(shell npm bin)/mocha tests

test.events-min: export TEST_JS = min
test.events-min: min
	$(shell npm bin)/mocha tests

karma:
	@$(shell npm bin)/karma start karma.conf.js

karma.min: export TEST_JS = min
karma.min: min
	@$(shell npm bin)/karma start karma.conf.js

test: install test.events test.events-min karma karma.min

build: test
	node make build

publish:
  npm version patch -m "Increased version to %s"
  @git push origin master
  npm publish
  git tag -a $(shell npm view azazel version) -m "Release of version $(shell npm view azazel version)"
  git push --tags

# DEFAULT TASKS

.DEFAULT_GOAL := build
