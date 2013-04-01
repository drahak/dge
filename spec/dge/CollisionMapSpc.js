describe('dge.CollisionMap', function() {

	var collisionMap;
	beforeEach(function() {
		collisionMap = new dge.CollisionMap(
			[
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			],
			32
		);
	});

	it('creates collision map', function() {
		expect(collisionMap.tileSize).toBe(32);
		expect(collisionMap.map.length).toBe(5);
	});

	it('gets any point in a map', function() {
		var point = collisionMap.get(5, 2);
		expect(point.type).toBe(1);
	});

	it('determines that the point is in the map', function() {
		var hasPoint = collisionMap.hasPoint(6, 4);
		expect(hasPoint).toBeTruthy();
	});

	it('determines that the point is out of the map', function() {
		var hasPoint = collisionMap.hasPoint(12, 2);
		expect(hasPoint).toBeFalsy();
	});

	it('checks if map contains given type of filed', function() {
		var containsOne = collisionMap.contains(1);
		expect(containsOne).toBeTruthy();
	});

	it('sets a any position to given type', function() {
		collisionMap.set(2, 2, 1);
		expect(collisionMap.get(2,2).type).toBe(1);
	});

	it('calls for each filed on the map', function() {
		var count = 0;
		collisionMap.each(function( x, y, type ) {
			count++;
		});
		expect(count).toBe(55);
	});

	it('counts size of the map', function() {
		var size = collisionMap.size();
		expect(size.x).toBe(11);
		expect(size.y).toBe(5);
	});

	it('resizes collision map - new values filled with zero', function() {
		collisionMap.resize(20, 10);
		expect(collisionMap.map.length).toBe(10);
		expect(collisionMap.get(15, 5).type).toBe(0);
	});

	it('clears given area in collision map', function() {
		var area = new dge.Rectangle(0, 0, 2, 2);
		collisionMap.clear(area);
		expect(collisionMap.get(0,0).type).toBe(0);
		expect(collisionMap.get(0,3).type).toBe(1);
	});

});