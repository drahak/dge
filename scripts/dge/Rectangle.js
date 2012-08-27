dge.Rectangle = (function() {

    /**
     * Rectangle class
     * @author Drahomír Hanák
     */
    var Rectangle = dge.Object.extend({

        /** @type {dge.Vector2} */
        vector: 0,
        /** @type {Number} */
        width: 0,
        /** @type {Number} */
        height: 0,

        /**
         * Create rectangle
         * @param {dge.Vector2}
         * @param {Number} width
         * @param {Number} height
         */
        initialize: function( vector, width, height ) {
            this.vector = (arguments.length == 4 && typeof arguments[0] == "number" && typeof arguments[1] == "number") ?
                dge.Vector2.create(arguments[0], arguments[1]) :
                vector;

            // Check vector
            if (!(vector instanceof dge.Vector2))
                throw 'Fisrt arguments must be of type "Vector2" or two "Numbers"';

            // Set sizes
            this.width = width;
            this.height = height;
        },

        /**
         * Set new position of Rectangle
         * @param {Number} x
         * @param {Number} y
         */
        offset: function( x, y ) {
            this.vector.set(x, y);
        },

        /**
         * Determines whether a specified Rectangle intersects this Rectangle
         * @param {dge.Rectangle}
         * @return {Boolean}
         */
        intersects: function( rect ) {
            if (((rect.vector.x+rect.width <= this.vector.x) || (rect.vector.x >= this.vector.x+this.width)))
                return false;
            else if (((rect.vector.y >= this.vector.y+this.height) || (rect.vector.y+rect.height <= this.vector.y)))
                return false;
            return true;
        }

    });

    return Rectangle;

})();