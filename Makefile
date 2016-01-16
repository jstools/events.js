# --- promise-q

npm.install:
	npm install

test: npm.install
	$(shell npm bin)/mocha tests

# test: test.base
# 	node make build
# 	$(shell npm bin)/karma start karma.conf.js

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
