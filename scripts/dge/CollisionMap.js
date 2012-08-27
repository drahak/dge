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
         * @param {Array}.<Array> map
         */
        initialize: function( map, tileSize ) {
            this.tileSize = tileSize;
            for (var y in map) {
                this.map[y] = this.map[y] || [];
                for (var x in map[y]) {
                    this.map[y][x] = {
                        type: map[y][x],
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
         * Set collision to any point
         * @param {Number} x grid position
         * @param {Number} y grid position
         */
        set: function( x, y, collision ) {
            if ( this.get(x, y) )
                this.map[y][x] = {
                    type: collision,
                    rect: new dge.Rectangle(dge.vec2(x*this.tileSize, y*this.tileSize), this.tileSize, this.tileSize)
                };
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
                        if ( !this.map[y][x] || this.map[y][x] && this.map[y][x].type === 0 )
                            this.map[y][x].type = 0;
                    }
                }
            }
        },

        /**
         * Clear (null) collision map area
         * @param {Number} from X
         * @param {Number} from Y
         * @param {Number} to X
         * @param {Number} to Y
         */
        clear: function( fromX, fromY, toX, toY ) {
            fromX = fromX || 0;
            fromY = fromY || 0;
            toX = toX || this.map[0].length;
            toY = toY || this.map.length;
            for ( var y = fromY; y < toY; y++  ) {
                for ( var x = fromX; x < toX; x++ ) {
                    if ( this.get(x, y) )
                        this.map[y][x].type = 0;
                }
            }
        },

        /**
         * For each map
         * @param {Function} callback function
         */
        each: function( handle ) {
            for ( var y in this.map ) {
                for ( var x in this.map[y] ) {
                    handle.apply(this, [x, y, this.get(x, y).type, this.get(x, y).rect]);
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