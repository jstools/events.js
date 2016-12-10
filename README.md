# Azazel

Another events handler that can be attached to an object.

[![](https://img.shields.io/npm/v/azazel.svg)](https://www.npmjs.com/package/azazel) [![](https://img.shields.io/bower/v/azazel.svg)](http://bower.io/search/?q=azazel) [![Build Status](https://travis-ci.org/kiltjs/azazel.svg?branch=master)](https://travis-ci.org/kiltjs/azazel)

Installation
------------
``` sh
npm install azazel --save

# alternatively you can use bower (minified version by default)
bower install azazel --save
```

Usage
-----
``` js
var obj = new Azazel();

obj.on('foo', function () {
  flag = true;
});

obj.trigger('foo');
```
