dge.Graphics = dge.Graphics || {};

// Game resource - Image
dge.Graphics.Image = (function() {

    /**
     * Image class
     * @author Drahomír Hanák
     */
    var Img = dge.Object.extend({

        /** @type {dge.Rectangle} image retangle */
        rectangle: null,

        /**
         * Image constructor
         * @param {String} source
         * @constructor
         */
        init: function( source ) {
            this.img = new Image();
            this.source = source;
            this.rectangle = new dge.Rectangle(0, 0, 0, 0);

            // Load image to get sizes
            var img = this;
            this.load(function() {
                img.rectangle.width = this.width;
                img.rectangle.height = this.height;
            });
        },

        /**
         * Check if the image hasn't been loaded yet
         * @param {Function} handle on load
         * @return {dge.Graphics.Image}
         */
        load: function( handle ) {
            var img;
            if( Img.cache[this.source] && typeof Img.cache[this.source] == "object" ) {
                img = Img.cache[this.source];
                return handle.call(img);
            } else {
                img = new Image();
                img.onload = function() {
                    return handle.call(this);
                };
                img.src = this.source;
                Img.cache[this.source] = img;
            }
            return this;
        },

        /**
         * Draw image
         * @param {dge.Graphics.Renderer} renderer
         * @param {dge.Vector2} vector
         */
        draw: function( renderer, vector ) {
            var that = this;

            // Get position
            if (vector && vector instanceof dge.Vector2)
                this.rectangle = this.rectangle.offset(vector);

            // Load & draw image
            return this.load(function() {
				renderer.ctx.drawImage(this, that.rectangle.x, that.rectangle.y);
            });
        },

        /**
         * Draw image tile
         * @param {dge.Graphics.Renderer} renderer
         * @param {dge.Vector2} vector
         * @param {Number} index
         * @param {Number} tileSize
         */
        drawTile: function( renderer, vector, index, tileSize ) {
            var that = this;

            // Get position
            if (vector instanceof dge.Vector2)
                vector = dge.Vector2.zero();

            // Load resource
            return this.load(function() {

                // Get tile column and row
                var row = Math.ceil(index/(this.width/tileSize))-1,
                    column = index-((this.width/tileSize)*row)-1;

                // Draw image on canvas
				renderer.ctx.drawImage(this,
                    column*tileSize, row*tileSize,
                    tileSize, tileSize,
                    that.rectangle.x, that.rectangle.y,
                    tileSize, tileSize
                );
            });
        }
    });

    /**
     * Store all loded images here
     * by dge.Image.load() method
     * @type {Object}
     */
    Img.cache = {};

    return Img;
})();