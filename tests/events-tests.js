/* global require, describe, it, beforeEach, process */

if( typeof require !== 'undefined' ) { // if is nodejs (not browser)

var Events = require( process.env.TEST_JS === 'min' ? '../events.min' : '../events' ),
		assert = require('assert');

/* eslint-disable */
	console.log('testing', process.env.TEST_JS === 'min' ? 'events.min.js' : 'events.js' );
/* eslint-enable */
}


describe('Events', function () {

	var obj;

	beforeEach(function () {
		obj = new Events();
	});

	it('event suscription', function () {
		var flag = false;

		obj.on('foo', function () {
			flag = true;
		});

		obj.trigger('foo');

		assert.strictEqual(flag, true);
	});

	it('event multi-suscription', function () {
		var count = 0;

		obj.on('foo bar', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 2);
	});

	it('event multi-suscription', function () {
		var count = 0;

		obj.on(['foo','bar'], function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 2);
	});

	it('event suscription twice', function () {
		var count = false;

		obj.on('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		assert.strictEqual(count, 2);
	});

	it('event suscription once', function () {
		var count = false;

		obj.once('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		assert.strictEqual(count, 1);
	});

	it('event multi-suscription once', function () {
		var count = 0;

		obj.once('foo bar', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 1);
	});

	it('event suscription off', function () {
		var count = false,
				increaseCount = function () {
					count++;
				};

		obj.on('foo', increaseCount);

		obj.trigger('foo');
		obj.trigger('foo');

		obj.off('foo', increaseCount);

		obj.trigger('foo');

		assert.strictEqual(count, 2);
	});

	it('event multi-suscription off', function () {
		var count = false,
				increaseCount = function () {
					count++;
				};

		obj.on('foo bar', increaseCount);

		obj.trigger('foo bar');

		obj.off('foo bar', increaseCount);

		obj.trigger('foo bar');

		assert.strictEqual(count, 2);
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (e, value) {
			assert.strictEqual(e.name, 'foo');
			result = value;
		});

		obj.trigger('foo', ['bar']);

		assert.strictEqual(result, 'bar');
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (e, value, value2) {
			assert.strictEqual(e.name, 'foo');
			result = value + ', ' + value2;
		});

		obj.trigger('foo', ['foo', 'bar']);

		assert.strictEqual(result, 'foo, bar');
	});
});

describe('Events:target', function () {

	var obj;

	beforeEach(function () {
		obj = function () {};
		new Events(obj);
	});

	it('event suscription', function () {
		var flag = false;

		obj.on('foo', function () {
			flag = true;
		});

		obj.trigger('foo');

		assert.strictEqual(flag, true);
	});

	it('event multi-suscription', function () {
		var count = 0;

		obj.on('foo bar', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 2);
	});

	it('event multi-suscription', function () {
		var count = 0;

		obj.on(['foo','bar'], function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 2);
	});

	it('event suscription twice', function () {
		var count = false;

		obj.on('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		assert.strictEqual(count, 2);
	});

	it('event suscription once', function () {
		var count = false;

		obj.once('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		assert.strictEqual(count, 1);
	});

	it('event multi-suscription once', function () {
		var count = 0;

		obj.once('foo bar', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('bar');

		obj.trigger('foo');
		obj.trigger('bar');

		assert.strictEqual(count, 1);
	});

	it('event suscription off', function () {
		var count = false,
				increaseCount = function () {
					count++;
				};

		obj.on('foo', increaseCount);

		obj.trigger('foo');
		obj.trigger('foo');

		obj.off('foo', increaseCount);

		obj.trigger('foo');

		assert.strictEqual(count, 2);
	});

	it('event multi-suscription off', function () {
		var count = false,
				increaseCount = function () {
					count++;
				};

		obj.on('foo bar', increaseCount);

		obj.trigger('foo bar');

		obj.off('foo bar', increaseCount);

		obj.trigger('foo bar');

		assert.strictEqual(count, 2);
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (e, value) {
			assert.strictEqual(e.name, 'foo');
			result = value;
		});

		obj.trigger('foo', ['bar']);

		assert.strictEqual(result, 'bar');
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (e, value, value2) {
			assert.strictEqual(e.name, 'foo');
			result = value + ', ' + value2;
		});

		obj.trigger('foo', ['foo', 'bar']);

		assert.strictEqual(result, 'foo, bar');
	});
});
