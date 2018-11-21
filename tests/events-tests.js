/* global require, describe, it, beforeEach */

if( typeof require !== 'undefined' ) { // if is nodejs (not browser)

	var Azazel = require('../dist/azazel'),
			assert = require('assert')

}

function _syncNextTick (fn) { fn.apply(this, arguments) }
var _asyncNextTick = setTimeout;

[_syncNextTick, _asyncNextTick].forEach(function (_nextTick, i) {

var is_async = i > 0
var _options = {
	async: is_async,
};

[false, true].forEach(function (is_target) {

	describe((is_async ? '[async]' : '[sync]') + ' Azazel' + ( is_target ? ':target' : '' ), function () {

		var obj

		beforeEach(function () {
			obj = is_target ? new Azazel({ is_target: true }, _options) : new Azazel(null, _options)
		})

		it('testing target', function () {
			assert.strictEqual( obj.is_target , is_target ? true : undefined )
		})

		it('event subscription', function (done) {
			var flag = false

			obj.on('foo', function () {
				flag = true
			})

			obj.emit('foo')

			_nextTick(function () {
				console.log('event subscription')
				assert.strictEqual(flag, true)
				done()
			})

		})

		it('event watch', function (done) {
			var count = 0

			obj.emit('foo')

			obj.watch('foo', function () {
				count += 1
			})

			obj.emit('foo')

			_nextTick(function () {
				assert.strictEqual(count, 2)
				done()
			})

		})

		it('event watch args (pre)', function (done) {
			var same_args = 'same_args', args = [same_args], result

			obj.emit('foo', args)

			obj.watch('foo', function (_result) {
				result = _result
			})

			_nextTick(function () {
				assert.strictEqual(result, same_args)
				done()
			})

		})

		it('event watch args (post)', function (done) {
			var same_args = 'same_args', args = [same_args], result

			obj.watch('foo', function (_result) {
				result = _result
			})

			obj.emit('foo', args)

			_nextTick(function () {
				assert.strictEqual(result, same_args)
				done()
			})
		})

		it('event watch this (pre)', function (done) {
			var same_this = {}, result

			obj.emit('foo', [null], same_this)

			obj.watch('foo', function (_result) {
				assert.strictEqual(_result, null)
				result = this
			})

			_nextTick(function () {
				assert.strictEqual(result, same_this)
				done()
			})

		})

		it('event watch this (pre)', function (done) {
			var same_this = {}, result

			obj.watch('foo', function (_result) {
				assert.strictEqual(_result, null)
				result = this
			})

			obj.emit('foo', [null], same_this)

			_nextTick(function () {
				assert.strictEqual(result, same_this)
				done()
			})

		})

		it('event multi-subscription', function (done) {
			var count = 0

			obj.on('foo bar', function () {
				count++
			})

			obj.emit('foo')
			obj.emit('bar')

			_nextTick(function () {
				assert.strictEqual(count, 2)
				done()
			})

		})

		it('event multi-subscription', function (done) {
			var count = 0

			obj.on(['foo','bar'], function () {
				count++
			})

			obj.emit('foo')
			obj.emit('bar')

			_nextTick(function () {
				assert.strictEqual(count, 2)
				done()
			})

		})

		it('event subscription twice', function (done) {
			var count = false

			obj.on('foo', function () {
				count++
			})

			obj.emit('foo')
			obj.emit('foo')

			_nextTick(function () {
				assert.strictEqual(count, 2)
				done()
			})

		})

		it('event subscription once', function (done) {
			var count = false

			obj.once('foo', function () {
				count++
			})

			obj.emit('foo')
			obj.emit('foo')

			_nextTick(function () {
				assert.strictEqual(count, 1)
				done()
			})

		})

		it('event multi-subscription once', function (done) {
			var count = 0

			obj.once('foo bar', function () {
				count++
			})

			obj.emit('foo')
			obj.emit('bar')

			obj.emit('foo')
			obj.emit('bar')

			_nextTick(function () {
				assert.strictEqual(count, 1)
				done()
			})

		})

		it('event subscription off', function (done) {
			var count = false,
					increaseCount = function () {
						count++
					}

			obj.on('foo', increaseCount)

			obj.emit('foo')
			obj.emit('foo')

			_nextTick(function () {
				obj.off('foo', increaseCount)

				obj.emit('foo')

				_nextTick(function () {
					assert.strictEqual(count, 2)
					done()
				})
			})

		})

		it('event multi-subscription off', function (done) {
			var count = false,
					increaseCount = function () {
						count++
					}

			obj.on('foo bar', increaseCount)

			obj.emit('foo bar')

			_nextTick(function () {
				obj.off('foo bar', increaseCount)

				obj.emit('foo bar')

				_nextTick(function () {
					assert.strictEqual(count, 2)
					done()
				})
			})

		})

		it('event passing data', function (done) {
			var result = false

			obj.on('foo', function (value) {
				result = value
			})

			obj.emit('foo', ['bar'])

			_nextTick(function () {
				assert.strictEqual(result, 'bar')
				done()
			})
		})

		it('event passing data', function (done) {
			var result = false

			obj.on('foo', function (value, value2) {
				result = value + ', ' + value2
			})

			obj.emit('foo', ['foo', 'bar'])

			_nextTick(function () {
				assert.strictEqual(result, 'foo, bar')
				done()
			})
		})
	})

})

})
