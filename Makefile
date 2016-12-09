# --- promise-q

install:
	npm install

min: install
	@echo "minified version"
	@$(shell npm bin)/uglifyjs events.js -o events.min.js -c -m

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

master.increaseVersion:
	git fetch origin
	git checkout master
	@git pull origin master
	@node make pkg:increaseVersion

publish: build master.increaseVersion
	git add .
	-git commit -a -n -m "increased version [$(shell node make pkg:version)]"
	@git push origin master
	npm publish

# DEFAULT TASKS

.DEFAULT_GOAL := build
