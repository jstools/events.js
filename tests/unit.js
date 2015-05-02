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
});
