dge.MaxRectangle = (function() {

	/**
	 * Max rectangle algorithm
	 * @author Drahomír Hanák
	 */
	var MaxRectangle = dge.Object.extend({

		/** @type {dge.CollisionMap} */
		stack: null,
		/** @type {Number} */
		_maxArea: 0,
		/** @type {dge.Rectangle} */
		_largestRect: null,
		/** @type {dge.Rectangle[]} */
		_rectangles: [],

		/**
		 * Max rectangle initialize
		 * @param {dge.CollisionMap} _map
		 * @constructor
		 */
		init: function( _map ) {
			this.stack = _map.clone();
			this._size = this.stack.size();
			this._maxArea = 0;
			this._largestRect = new dge.Rectangle(0, 0, 0, 0);
		},

		/**
		 * Find next largest rectangle and remove it from the stack
		 * @return {dge.Rectangle} largest rectangle in the collision map
		 * @private
		 */
		next: function() {
			var pos;
			if (!(pos = this.stack.contains(1)))
				return 0;

			this._largestRect = new dge.Rectangle(pos.x, pos.y, 0, 0);
			this._maxArea = 0; //remove even 1x1 rectangles

			var rectangle;
			for (var i = 0; i < this._size.y; i++) {
				for (var j = 0; j < this._size.x; j++) {
					rectangle = this._growRegion(i, j);
				}
			}

			if (this.stack.get(rectangle.x, rectangle.y).type == 0)
				return 0;

			this.stack.clear(rectangle);
			this._rectangles.push(rectangle);
			return rectangle;
		},

		/**
		 * Get rectangles
		 * @return {dge.Rectangle[]}
		 */
		getRectangles: function() {
			return this._rectangles;
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
			var rowMax = this._size.x-1;
			var mapArray = this.stack.get();

			while ((b <= this._size.x-1) && mapArray[i] && mapArray[i][b] && mapArray[i][b].type != 0) {
				a = i;
				while ((a <= rowMax) && mapArray[a] && mapArray[a][b] && mapArray[a][b].type == 1)
					a = a + 1;
				a = a - 1;

				if (a < rowMax)
					rowMax = a;

				var area = this._computeArea(i, j, a, b);
				if (area > this._maxArea) {
					this._maxArea = area;
					this._largestRect = new dge.Rectangle(j, i, a-i+1, b-j+1);
				}
				b++;
			}

			return this._largestRect;
		},


		/**
		 * Compute area of two points
		 * @param {Number} i
		 * @param {Number} j
		 * @param {Number} a
		 * @param {Number} b
		 * @return {Number}
		 * @private
		 */
		_computeArea: function(i, j, a, b) {
			if (a < i)
				return -1;
			if (b < j)
				return -1;
			return (a-i+1) * (b-j+1);
		}
	});

	return MaxRectangle;

})();