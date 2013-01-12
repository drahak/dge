dge.MaxRectangle = (function() {

	var _maxArea = 0,
		_largestRect = null,
		_rectangles = [],
		_size = { x: 0, y: 0 };


	function _computeArea(i, j, a, b) {
		if (a < i)
			return -1;
		if (b < j)
			return -1;
		return (a-i+1) * (b-j+1);
	}

	/**
	 * Max rectangle algorithm
	 * @author Drahomír Hanák
	 */
	var MaxRectangle = dge.Object.extend({

		/** @type {dge.CollisionMap} */
		stack: null,

		/**
		 * Max rectangle initialize
		 * @param {dge.CollisionMap} _map
		 * @constructor
		 */
		init: function( _map ) {
			this.stack = _map.clone();

			_size = this.stack.size();
			_maxArea = 0;
			_largestRect = new dge.Rectangle(0, 0, 0, 0);
		},

		/**
		 * Find next largest rectangle and remove it from the stack
		 * @return {dge.Rectangle} largest rectangle in the collision map
		 * @private
		 */
		next: function() {
			var pos;

			// If there is no 1's return 0
			if (!(pos = this.stack.contains(1)))
				return 0;

			// Set largest rectangle position to the first tile contains 1
			_largestRect = new dge.Rectangle(pos.x, pos.y, 0, 0);
			_maxArea = 0; //remove even 1x1 rectangles

			// Try to grow region for each point
			var rectangle;
			for (var i = 0; i < _size.y; i++) {
				for (var j = 0; j < _size.x; j++) {
					rectangle = this._growRegion(i, j);
				}
			}

			// If there is no bigger rectangle then 1x1
			if (this.stack.get(rectangle.x, rectangle.y).type == 0)
				return 0;

			// Clear largest rectangle form stack
			this.stack.clear(rectangle);
			// Add it to local rectangles array
			_rectangles.push(rectangle);

			return rectangle;
		},

		/**
		 * Get rectangles
		 * @return {dge.Rectangle[]}
		 */
		getRectangles: function() {
			return _rectangles;
		},

		/**
		 * Grow region from given point
		 * @param {Number} i row
		 * @param {Number} j column
		 * @return {dge.Rectangle}
		 * @private
		 */
		_growRegion: function(i, j) {
			var a = i, b = j;
			var rowMax = _size.x-1;
			var mapArray = this.stack.get();

			while ((b <= _size.x-1) && mapArray[i] && mapArray[i][b] && mapArray[i][b].type != 0) {
				a = i;
				while ((a <= rowMax) && mapArray[a] && mapArray[a][b] && mapArray[a][b].type == 1)
					a = a + 1;
				a = a - 1;

				if (a < rowMax)
					rowMax = a;

				var area = _computeArea(i, j, a, b);
				if (area >_maxArea) {
					_maxArea = area;
					_largestRect = new dge.Rectangle(j, i, a-i+1, b-j+1);
				}
				b++;
			}

			return _largestRect;
		}

	});

	return MaxRectangle;

})();