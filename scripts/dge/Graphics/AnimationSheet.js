dge.Graphics.AnimationSheet = (function() {

    /**
     * AnimationSheet class
     * @author Drahomír Hanák
     */
    var AnimationSheet = dge.Graphics.Image.extend({

        /**
         * Animation sheet
         * @param {String} source
         * @param {Number} interval (in ms)
         * @param {Number} tileSize
         * @constructor
         */
        init: function( source, interval, tileSize ) {

            // Parent constructor
            this.parent.init.call(this, source);

            // Set variables
            this.interval = interval;
            this.tileSize = tileSize;
            this.index = AnimationSheet.count++;
            this.nodes = {};
			this.lastUpdate = new Date().getTime();
        },

        /** @type {Image} */
        img: new Image(),
        /**@type {Number} current animation tile index */
        current: null,
        /** @type {Number} time difference */
        step: 0,
        /** @type {Number} current anim tile index */
        animIndex: 0,
		/** @type {Number} last animation update */
		lastUpdate: 0,

        /**
         * Add node to animation sheet
         * @param {String} node name
         * @param {Array}.<Number> array of steps (tile indexes) from sheet
         */
        addNode: function( name, steps ) {
            this.nodes[name] = steps;
            this.current = name;
        },

        /**
         * Set current node
         * @param {String} active node name
         */
        setNode: function( name ) {
            this.current = name;
        },

        /**
         * Draw animation sheet
         * @param {dge.Graphics.Renderer} renderer
         * @param {dge.Vector2} vector
		 * @param {Number} diff
         */
        draw: function( renderer, vector ) {

            // Get position
            if (vector instanceof dge.Vector2)
                this.rectangle.vector = vector;

            // Some private variables, steps contains current animation node
            var steps = this.nodes[this.current];

            // Animation tick
			var diff = new Date().getTime()-this.lastUpdate;
            this.step += diff;
            if( this.step > this.interval ) {
                this.step = 0;
                this.animIndex = this.animIndex+1 >= steps.length ? 0 : (this.animIndex+1);
				this.lastUpdate = new Date().getTime();
            }

            // Draw animation tile
            this.drawTile(renderer, this.rectangle.vector, steps[this.animIndex], this.tileSize);
        }
    });

    // Static variables
    AnimationSheet.count = 0;

    return AnimationSheet;

})();

