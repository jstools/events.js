describe('jstool-events: Events', function () {

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

		expect(flag).toBe(true);
	});

	it('event suscription twice', function () {
		var count = false;

		obj.on('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		expect(count).toBe(2);
	});

	it('event suscription once', function () {
		var count = false;

		obj.once('foo', function () {
			count++;
		});

		obj.trigger('foo');
		obj.trigger('foo');

		expect(count).toBe(1);
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

		expect(count).toBe(2);
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (value) {
			result = value;
		});

		obj.trigger('foo', ['bar']);

		expect(result).toBe('bar');
	});

	it('event passing data', function () {
		var result = false;

		obj.on('foo', function (value, value2) {
			result = value + ', ' + value2;
		});

		obj.trigger('foo', ['foo', 'bar']);

		expect(result).toBe('foo, bar');
	});
});
