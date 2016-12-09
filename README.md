jsTools: Events [![](https://img.shields.io/npm/v/events-wrapper.svg)](https://www.npmjs.com/package/events-wrapper) [![](https://img.shields.io/bower/v/events-wrapper.svg)](http://bower.io/search/?q=events-wrapper)
===============

[![Build Status](https://travis-ci.org/jstools/events.svg?branch=master)](https://travis-ci.org/jstools/events)
[![wercker status](https://app.wercker.com/status/54d5da14c71194ac8b5a8b1828a61ce3/s/master "wercker status")](https://app.wercker.com/project/byKey/54d5da14c71194ac8b5a8b1828a61ce3)

Installation
------------
``` sh
npm install events-wrapper --save

# alternatively you can use bower (minified version by default)
bower install events-wrapper --save
```

Usage
-----
``` js
var obj = new Events();

obj.on('foo', function () {
  flag = true;
});

obj.trigger('foo');
```
AngularJS Module
----------------
``` js
angular.module('myApp', ['jstools.events'])

  .controller('AppCtrl', ['$scope', 'Events', function ($scope, Events) {

    var obj = new Events();

    obj.$$on('foo', function () {
      flag = true;
    });

    obj.$$trigger('foo');

  }]);
```
