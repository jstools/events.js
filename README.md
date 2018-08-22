# @kilt/azazel

Another events handler/wrapper that can be attached to an object.

[![](https://img.shields.io/npm/v/@kilt/azazel.svg)](https://www.npmjs.com/package/@kilt/azazel)
[![Build Status](https://travis-ci.org/kiltjs/azazel.svg?branch=master)](https://travis-ci.org/kiltjs/azazel)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Installation
------------
``` sh
npm install @kilt/azazel --save
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
