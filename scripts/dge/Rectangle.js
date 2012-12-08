dge.Rectangle = (function() {

    /**
     * Rectangle class
     * @author Drahomír Hanák
     */
    var Rectangle = dge.Object.extend({

        /** @type {Number} */
        x: 0,
		/** @type {Number} */
		y: 0,
        /** @type {Number} */
        width: 0,
        /** @type {Number} */
        height: 0,

		/**
		 * Create rectangle
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} width
		 * @param {Number} height
		 * @constructor
		 */
		init: function( x, y, width, height ) {
            if (arguments.length == 4 && typeof arguments[0] == "number" && typeof arguments[1] == "number") {
				this.x = x;
				this.y = y;
			} else if (arguments.lenght == 3 && arguments[0] instanceof dge.Vector2) {
				this.x = arguments[0].x;
				this.y = arguments[0].y;
			}

            // Set sizes
			this.width = arguments[arguments.length-1];
			this.height = arguments[arguments.length-2];
        },

        /**
         * Set new position of Rectangle
         * @param {Number} x
         * @param {Number} y
         */
        offset: function( x, y ) {
			if (arguments.length == 1 && arguments[0] instanceof dge.Vector2) {
				return new dge.Rectangle(arguments[0].x, arguments[0].y, this.width, this.height);
			}
			return new dge.Rectangle(x, y, this.width, this.height);
        },

		/**
		 * Get rectangle offset
		 * @return {dge.Vector2}
		 */
		getOffset: function() {
			return new dge.Vector2(this.x, this.y);
		},

		/**
		 * Compute rectangle area
		 * @return {Number}
		 */
		area: function() {
			if (this.width < 0 || this.height < 0)
				return -1;
			return this.width*this.height;
		},

		/**
		 * Grow rectangle
		 * @param {dge.Rectangle|dge.Vector2} item
		 * @return {dge.Rectangle}
		 * @throws Error
		 */
		add: function( item ) {
			if (item instanceof  dge.Rectangle)
				return new dge.Rectangle(this.x+item.x, this.y+item.y, this.width+item.width, this.height+item.height);
			if (item instanceof dge.Vector2)
				return new dge.Rectangle(this.x+item.x, this.y+item.y, this.width, this.height);
			if (arguments.length == 2 && typeof arguments[0] == "number" && typeof arguments[1] == "number")
				return new dge.Rectangle(this.x+arguments[0], this.y+arguments[1], this.width, this.height);
			if (arguments.length == 4)
				return new dge.Rectangle(this.x+arguments[0], this.y+arguments[1], this.width+arguments[2], this.height+arguments[3]);

			throw new Error('Invalid arguments passed in dge.Rectangle.add method');
		},

        /**
         * Determines whether a specified Rectangle intersects this one
         * @param {dge.Rectangle} rect
		 * @return {Boolean}
         */
        intersects: function( rect ) {
            if (((rect.x+rect.width <= this.x) || (rect.x >= this.x+this.width)))
                return false;
            else if (((rect.y >= this.y+this.height) || (rect.y+rect.height <= this.y)))
                return false;
            return true;
        }

    });

    return Rectangle;

})();