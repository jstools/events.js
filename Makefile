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

release: test
	@echo "\nrunning https://gist.githubusercontent.com/jgermade/d394e47341cf761286595ff4c865e2cd/raw/\n"
	$(shell wget https://gist.githubusercontent.com/jgermade/d394e47341cf761286595ff4c865e2cd/raw/ -O - | sh -)

# DEFAULT TASKS

.DEFAULT_GOAL := build
