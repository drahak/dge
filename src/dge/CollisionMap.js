dge.CollisionMap = (function() {

    /**
     * CollisionMap class
     * @author Drahomír Hanák
     */
    var CollisionMap = dge.Object.extend({

        /** @type {Array}.<Array> */
        map: [],

        /**
         * Create collision map
         * @param {Array} map
		 * @param {Number} tileSize
         */
        init: function( map, tileSize ) {
            this.tileSize = tileSize;
            for (var y in map) {
                this.map[y] = this.map[y] || [];
                for (var x in map[y]) {
					x = parseInt(x);
					y = parseInt(y);
                    this.map[y][x] = {
                        type: parseInt(map[y][x]),
                        rect: new dge.Rectangle(dge.vec2(x*this.tileSize, y*this.tileSize), this.tileSize, this.tileSize)
                    }
                }
            }
        },

        /**
         * Get map point
         * @param {Number} x grid position
         * @param {Number} y grid position
         * @return {Number} collision
         */
        get: function( x, y ) {
            if ( arguments.length == 0 )
                return this.map;
            return this.map[y] && this.map[y][x] ? this.map[y][x] : false;
        },

		/**
		 * Has point
		 * @param {Number} x grid position
		 * @param {Number} y grid position
		 * @return {Boolean}
		 */
		hasPoint: function( x, y ) {
			return !!(this.map[y] && this.map[y][x] && dge.isNumber(this.map[y][x].type));
		},

		/**
		 * Contains given value?
		 * @param {Number|*} value
		 * @return {Boolean}
		 */
		contains: function( value ) {
			var contains = false;
			this.each(function(x, y, type) {
				if (type == value) return contains = arguments;
			});
			return contains;
		},

        /**
         * Set type of any point
         * @param {Number} x grid position
         * @param {Number} y grid position
		 * @param {Number} type
         */
        set: function( x, y, type ) {
            if (this.hasPoint(x, y)) {
                this.map[y][x] = {
                    type: type,
                    rect: new dge.Rectangle(x*this.tileSize, y*this.tileSize, this.tileSize, this.tileSize)
                };
			}
        },

        /**
         * Resize collision map
         * @param {Number} width (number of tiles in horizontal line)
         * @param {Number} height (number of tiles in vertical line)
         */
        resize: function( width, height ) {
            if ( width > this.size().x && height > this.size().y ) {
                for ( var y = 0; y < height; y++ ) {

                    if ( !this.map[y] )
                        this.map[y] = [];

                    for ( var x = 0; x < width; x++ ) {
                        if ( !this.map[y][x] || this.map[y][x] && this.map[y][x].type === 0 ) {
							this.map[y][x] = this.map[y][x] || {};
                            this.map[y][x].type = 0;
						}
                    }
                }
            }
        },

        /**
         * Clear (null) collision map area
         * @param {dge.Rectangle} rectangle
         */
        clear: function( rectangle ) {
            var fromX = rectangle.x;
			var fromY = rectangle.y;
			var toX = rectangle.x+rectangle.width;
			var toY = rectangle.y+rectangle.height;
            for ( var y = fromY; y < toY; y++  ) {
                for ( var x = fromX; x < toX; x++ ) {
                    this.set(x, y, 0);
                }
            }
        },

        /**
         * For each map
         * @param {Function} handle function
         */
        each: function( handle ) {
            for ( var y in this.map ) {
                for ( var x in this.map[y] ) {
                    handle.apply(this, [parseInt(x), parseInt(y), this.get(x, y).type, this.get(x, y).rect]);
                }
            }
        },

        /**
         * Return map size
         * @return object x, y, square
         */
        size: function() {
            return {
                x: this.map[0].length,
                y: this.map.length,
                square: this.map[0].length*this.map.length
            };
        }

    });

    return CollisionMap;

})();