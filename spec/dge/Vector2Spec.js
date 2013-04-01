describe('dge.Vector2', function() {

	var vec;

	beforeEach(function() {
		vec = dge.Vector2.create(1, 2);
	});

	it('Create Vector2', function() {
		expect(vec instanceof dge.Vector2).toBeTruthy();
		expect(vec.x).toBe(1);
		expect(vec.y).toBe(2);
	});

	it('changes Vector2 position', function() {
		vec.set(5, 6);
		expect(vec.x).toBe(5);
		expect(vec.y).toBe(6);
	});

	it('negates Vector2', function() {
		var vec2 = vec.negate();
		expect(vec2.x).toBe(-1);
		expect(vec2.y).toBe(-2);
	});

	it('adds vector to this vector', function() {
		var vec2 = vec.add(dge.Vector2.create(1, 1));
		expect(vec2.x).toBe(2);
		expect(vec2.y).toBe(3);
	});

	it('subtracs vector from this', function() {
		var vec2 = vec.sub(dge.Vector2.create(1, 1));
		expect(vec2.x).toBe(0);
		expect(vec2.y).toBe(1);
	});

	it('multiplied this vector', function() {
		var vec2 = vec.mul(dge.Vector2.create(2,2));
		expect(vec2.x).toBe(2);
		expect(vec2.y).toBe(4);
	});

	it('divides this vector', function() {
		var vec2 = vec.div(dge.Vector2.create(1,2));
		expect(vec2.x).toBe(1);
		expect(vec2.y).toBe(1);
	});

	it('Vector2.dot', function() {
		var dot = vec.dot(dge.Vector2.create(1,1));
		expect(dot).toBe(3);
	});

	it('square this vector', function() {
		var vec2 = vec.square();
		expect(vec2.x).toBe(1);
		expect(vec2.y).toBe(4);
	});

	it('creates absolute value from this vector', function() {
		vec.set(-1, -1);
		var vec2 = vec.abs();
		expect(vec2.x).toBe(1);
		expect(vec2.y).toBe(1);
	});

	it('count length', function() {
		var length = vec.length();
		expect(length).toBe(5);
	});

	it('count remainder after division this vector', function() {
		var mod = vec.mod();
		expect(mod).toBe(Math.sqrt(5));
	});

	it('compares two vectors', function() {
		var equals = vec.equals(dge.Vector2.create(1,2));
		expect(equals).toBeTruthy();
	});

	it('converts to stirng', function() {
		var text = vec.toString();
		expect(text).toBe('(1, 2)');
	});

});