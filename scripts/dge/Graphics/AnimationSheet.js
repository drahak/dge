dge.Graphics.AnimationSheet = (function() {

	/**
	 * AnimationSheet class
	 * @author Drahomír Hanák
	 */
	var AnimationSheet = dge.Graphics.Image.extend({

		/**
		 * Animation sheet
		 * @param {String} source
		 * @param {Number} delay animation tile change delay
		 * @param {Number} tileSize
		 * @constructor
		 */
		init: function( source, delay, tileSize ) {

			// Parent constructor
			this.parent.init.call(this, source);

			// Set variables
			this.delay = delay;
			this.tileSize = tileSize;
			this.index = AnimationSheet.count++;
			this.nodes = {};
			this.lastUpdate = new Date().getTime();
		},

		/** @type {Image} */
		img: new Image(),
		/**@type {Number} current animation tile index */
		current: null,
		/** @type {Number} current anim tile index */
		animIndex: 0,

		/**
		 * Add node to animation sheet
		 * @param {String} name of node
		 * @param {Array} steps array of steps (tile indexes) from sheet
		 */
		addNode: function( name, steps ) {
			this.nodes[name] = steps;
			this.current = name;
		},

		/**
		 * Set current node
		 * @param {String} name of active node
		 */
		setNode: function( name ) {
			this.current = name;
		},

		/**
		 * Draw animation sheet
		 * @param {dge.Graphics.Renderer} renderer
		 * @param {dge.Vector2} vector
		 */
		draw: function( renderer, vector ) {

			// Get position
			if (vector instanceof dge.Vector2)
				this.rectangle = this.rectangle.offset(vector);

			// Active node steps
			var steps = this.nodes[this.current];

			// Draw animation tile
			this.drawTile(renderer, this.rectangle.getOffset(), steps[this.animIndex], this.tileSize);
		},

		/**
		 * Animation tick
		 * @param {dge.GameTime} gameTime
		 */
		update: function(gameTime) {
			var steps = this.nodes[this.current];
			if (gameTime.frames%this.delay == 0) {
				this.animIndex = this.animIndex+1 >= steps.length ? 0 : (this.animIndex+1);
			}
		}
	});

	// Static variables
	AnimationSheet.count = 0;

	return AnimationSheet;

})();

