jEngine: Events [![wercker status](https://app.wercker.com/status/54d5da14c71194ac8b5a8b1828a61ce3/s "wercker status")](https://app.wercker.com/project/bykey/54d5da14c71194ac8b5a8b1828a61ce3)
===============
[![Bower version](https://badge.fury.io/bo/jstools-events.svg)](http://badge.fury.io/bo/jstools-events)
[![npm version](https://badge.fury.io/js/jstools-events.svg)](http://badge.fury.io/js/jstools-events)
[![Build Status](https://travis-ci.org/jstools/events.svg?branch=master)](https://travis-ci.org/jstools/events)
Installation
------------
``` sh
npm install jstools-events --save
```
or
``` sh
bower install jn-events --save
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
