dge.Vector2 = (function() {

    /**
     * Vector2 class
     * @author Drahomír Hanák
     */
    var Vector2 = dge.Object.extend({

        /**
         * Create Vector2
         * @param {Number} x
         * @param {Number} y
         * @constructor
         */
        init: function( x, y ) {
            if (arguments.length === 2  && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ){
                this.x = arguments[0];
                this.y = arguments[1];
            } else if (arguments.length === 0) {
                this.x = 0;
                this.y = 0;
            } else {
                throw 'Arguments must be 2 numbers or nothing at all';
            }
        },

        /**
         * Set new value
         * @param {Number} x
         * @param {Number} y
         */
        set: function( x, y ) {
            if (arguments.length === 2  && typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ){
                this.x = arguments[0];
                this.y = arguments[1];
            } else if (arguments.length === 0) {
                this.x = 0;
                this.y = 0;
            } else {
                throw 'Arguments must be 2 numbers or nothing at all';
            }
        },

        /**
         * Negate vector
         * @return {dge.Vector2}
         */
        negate: function() {
            return new Vector2( -this.x, -this.y );
        },

        /**
         * Add Vector2
         * @param {Number|Vector2} count
         * @return {dge.Vector2}
         */
        add: function( count ) {
            var output = new Vector2( this.x, this.y );
            if (typeof count === "number") {
                output.x += count;
                output.y += count;
            } else if (count instanceof Vector2) {
                output.x += count.x;
                output.y += count.y;
            } else {
                throw 'Arguments must be a number or dge.Vector2 instance';
            }
            return output;
        },

        /**
         * Add Vector2
         * @param {Number|Vector2} count
         * @return {dge.Vector2}
         */
        sub: function( count ) {
            var output = new Vector2( this.x, this.y );
            if (typeof count === "number") {
                output.x -= count;
                output.y -= count;
            } else if (count instanceof Vector2) {
                output.x -= count.x;
                output.y -= count.y;
            } else {
                throw 'Arguments must be a number or dge.Vector2 instance';
            }
            return output;
        },

        /**
         * Multiplied Vector2
         * @param {Number|Vector2} count
         * @return {dge.Vector2}
         */
        mul: function( count ) {
            var output = new Vector2( this.x, this.y );
            if (typeof count === 'number') {
                output.x *= count;
                output.y *= count;
            } else if (count instanceof Vector2) {
                output.x *= count.x;
                output.y *= count.y;
            } else {
                throw 'Argument must be of type "Vector2" or "number"';
            }
            return output;
        },

        /**
         * Divide Vector2
         * @return {dge.Vectro2}
		 * @param {Number|dge.Vector2} count
         */
        div: function( count ) {
            var output = new Vector2( this.x, this.y );
            if (typeof count === 'number') {
                output.x /= count;
                output.y /= count;
            } else if (count instanceof Vector2) {
                output.x /= count.x;
                output.y /= count.y;
            } else {
                throw 'Argument must be of type "Vector2" or "number"';
            }
            return output;
        },

        /**
         * Dot Vector2
         * @param {dge.Vector2} vector
         * @return {Number}
         */
        dot: function( vector ) {
            if (!(vector instanceof Vector2)) {
                throw 'Argument must be of type "Vector2"';
            }
            return (this.x * vector.x) + (this.y * vector.y);
        },

        /**
         * Square Vector2
         * @return {dge.Vector2}
         */
        square: function() {
            return new Vector2( this.x * this.x, this.y * this.y );
        },

        /**
         * Absolute value of Vector2
         * @return {dge.Vector2}
         */
        abs: function() {
            return new Vector2( Math.abs(this.x), Math.abs(this.y) );
        },

        /**
         * Vector2 length
         * @return {Number}
         */
        length: function() {
            return (this.x * this.x) + (this.y * this.y);
        },

        /**
         * Modulus Vector2
         * @return {Number}
         */
        mod: function() {
            return Math.sqrt(this.length());
        },

        /**
         * Compare two vectors
         * @param {dge.Vector2} vector
         * @return {Boolean}
         */
        equals: function( vector ) {
            return ((vector.x === this.x) && (vector.y === this.y));
        },

        /**
         * Return Vector2 as string
         * @return {String}
         */
        toString: function() {
            return '(' + this.x + ', ' + this.y + ')';
        }

    });

    /**
     * Create zero Vector
     * @return {Vector2}
     */
    Vector2.zero = function() {
        return new Vector2(0,0);
    };

    /**
     * Create Vector2
     * @param {Number} x
     * @param {Number} y
     * @return {Vector2}
     */
    Vector2.create = function( x, y ) {
        return new Vector2(x,y);
    };

    return Vector2;

})();