dge.Objects.DrawableControl = (function() {

	/**
	 * Control class
	 * @author Drahomír Hanák
	 */
	var DrawableControl = dge.Objects.Container.extend({

		/** @type {dge.Graphics.Renderer} */
		renderer: null,
		/** @type {dge.Vector2} */
		position: dge.Vector2.zero(),

		/**
		 * Initialize drawable component
		 * @param {Object} renderer
		 * @constructor
		 */
		init: function( renderer ) {
			this._super();
			if (!(renderer instanceof dge.Graphics.Renderer)) {
				throw new Error('Drawable control expects dge.Graphics.Renderer instance in constructor.');
			}
			this.renderer = renderer;
		},

		/**
		 * Draw method
		 */
		draw: function() {
			var args = arguments;
			this.each(function(control, name) {
				if (this.isControlInvalid()) {
					this.renderer.clear();
					this.draw.apply(this, args);
					this.validateControl();
				}
			});
		}

	});

	return DrawableControl;

})();