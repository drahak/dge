describe('dge library', function() {
	it('creates dge.Vector2 with dge.vec2 function', function() {
		var vec = dge.vec2(1, 2);
		expect(vec instanceof dge.Vector2).toBeTruthy();
		expect(vec.x).toBe(1);
		expect(vec.y).toBe(2);
	});

	it('checks number', function() {
		expect(dge.isNumber(2)).toBeTruthy();
		expect(dge.isNumber('0string')).toBeFalsy();
	});
});