describe('dge.Rectangle', function() {

	var rectangle;
	beforeEach(function() {
		rectangle = new dge.Rectangle(10, 20, 100, 200);
	});

	it('creates a rectangle', function() {
		expect(rectangle.x).toBe(10);
		expect(rectangle.y).toBe(20);
		expect(rectangle.width).toBe(100);
		expect(rectangle.height).toBe(200);
	});

	it('sets ractangle offset', function() {
		var rect = rectangle.offset(20, 30);
		expect(rect.x).toBe(20);
		expect(rect.y).toBe(30);
		expect(rect.width).toBe(100);
		expect(rect.height).toBe(200);
		expect(rect).not.toBe(rectangle);
	});

	it('gets rectangle offset as vector', function() {
		var vec = rectangle.getOffset();
		expect(vec instanceof dge.Vector2).toBeTruthy();
		expect(vec.x).toBe(rectangle.x);
		expect(vec.y).toBe(rectangle.y);
	});

	it('throws an error when you\'re trying to compute area from negative values', function() {
		var error = new Error('Cannot compute area from negative width or height value');
		var rect = rectangle.clone();
		rect.width = -100;
		expect(function() { rect.area(); }).toThrow(error);
	});

	it('computes rectangle area', function() {
		var area = rectangle.area();
		expect(area).toBe(20000);
	});

	it('should create new rectang by calling Rectangle.add', function() {
		var rect = new dge.Rectangle(10, 10, 10, 10);
		var result = rectangle.add(rect);
		expect(result).not.toBe(rectangle);
		expect(result).not.toBe(rect);
	});

	it('adds rectange to this', function() {
		var rect = new dge.Rectangle(10, 10, 10, 10);
		var result = rectangle.add(rect);
		expect(result.x).toBe(20);
		expect(result.y).toBe(30);
		expect(result.width).toBe(110);
		expect(result.height).toBe(210);
	});

	it('adds vector to this', function() {
		var vec = new dge.Vector2(10, 10);
		var result = rectangle.add(vec);
		expect(result.x).toBe(20);
		expect(result.y).toBe(30);
	});

	it('adds given value to this', function() {
		var result = rectangle.add(10, 10, 10, 10);
		expect(result.x).toBe(20);
		expect(result.y).toBe(30);
		expect(result.width).toBe(110);
		expect(result.height).toBe(210);
	});

	it('determines that any rectangle intersects this one', function() {
		rectangle = new dge.Rectangle(10, 20, 100, 200);
		var rec = new dge.Rectangle(0, 10, 20, 11);
		var intersects = rectangle.intersects(rec);
		expect(intersects).toBeTruthy();
	});

	it('determines that any rectange does not intersect this one', function() {
		var rect = new dge.Rectangle(111, 20, 1000, 2000);
		var intersects = rectangle.intersects(rect);
		expect(intersects).toBeFalsy();
	});

});