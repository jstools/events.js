/* global require, describe, it, beforeEach */

if( typeof require !== 'undefined' ) { // if is nodejs (not browser)

	var Azazel = require('../dist/azazel'),
			assert = require('assert');

}

[false, true].forEach(function (is_target) {

	describe('Azazel' + ( is_target ? ':target' : '' ), function () {

		var obj;

		beforeEach(function () {
			obj = is_target ? new Azazel({ is_target: true }) : new Azazel();
		});

		it('testing target', function () {
			assert.strictEqual( obj.is_target , is_target ? true : undefined );
		});

		it('event suscription', function () {
			var flag = false;

			obj.on('foo', function () {
				flag = true;
			});

			obj.emit('foo');

			assert.strictEqual(flag, true);
		});

		it('event watch', function () {
			var count = 0;

			obj.emit('foo');

			obj.watch('foo', function () {
				count += 1;
			});

			obj.emit('foo');

			assert.strictEqual(count, 2);
		});

		it('event multi-suscription', function () {
			var count = 0;

			obj.on('foo bar', function () {
				count++;
			});

			obj.emit('foo');
			obj.emit('bar');

			assert.strictEqual(count, 2);
		});

		it('event multi-suscription', function () {
			var count = 0;

			obj.on(['foo','bar'], function () {
				count++;
			});

			obj.emit('foo');
			obj.emit('bar');

			assert.strictEqual(count, 2);
		});

		it('event suscription twice', function () {
			var count = false;

			obj.on('foo', function () {
				count++;
			});

			obj.emit('foo');
			obj.emit('foo');

			assert.strictEqual(count, 2);
		});

		it('event suscription once', function () {
			var count = false;

			obj.once('foo', function () {
				count++;
			});

			obj.emit('foo');
			obj.emit('foo');

			assert.strictEqual(count, 1);
		});

		it('event multi-suscription once', function () {
			var count = 0;

			obj.once('foo bar', function () {
				count++;
			});

			obj.emit('foo');
			obj.emit('bar');

			obj.emit('foo');
			obj.emit('bar');

			assert.strictEqual(count, 1);
		});

		it('event suscription off', function () {
			var count = false,
					increaseCount = function () {
						count++;
					};

			obj.on('foo', increaseCount);

			obj.emit('foo');
			obj.emit('foo');

			obj.off('foo', increaseCount);

			obj.emit('foo');

			assert.strictEqual(count, 2);
		});

		it('event multi-suscription off', function () {
			var count = false,
					increaseCount = function () {
						count++;
					};

			obj.on('foo bar', increaseCount);

			obj.emit('foo bar');

			obj.off('foo bar', increaseCount);

			obj.emit('foo bar');

			assert.strictEqual(count, 2);
		});

		it('event passing data', function () {
			var result = false;

			obj.on('foo', function (value) {
				result = value;
			});

			obj.emit('foo', ['bar']);

			assert.strictEqual(result, 'bar');
		});

		it('event passing data', function () {
			var result = false;

			obj.on('foo', function (value, value2) {
				result = value + ', ' + value2;
			});

			obj.emit('foo', ['foo', 'bar']);

			assert.strictEqual(result, 'foo, bar');
		});
	});

});
