dge.Graphics = dge.Graphics || {};

dge.Graphics.Renderer = (function( $ ) {

	/**
	 * Canvas renderer
	 * @type {Function}
	 */
	var Renderer = dge.Object.extend({

		/** @type HTMLCanvasElement */
		canvas: null,
		/** @type CanvasRenderingContext2D */
		ctx: null,

		/**
		 * Create canvas 2D renderer
		 * @param {Object} drawing
		 */
		init: function( drawing ) {
			this.canvas = $('<canvas></canvas>');
			this.canvas.attr({
				width: drawing.width,
				height: drawing.height
			});
			this.canvas.addClass('dge-renderer');
			this.canvas.appendTo(drawing.base);
			this.ctx = this.canvas.get(0).getContext('2d');
		},

		/**
		 * Clear renderer
		 * @return {dge.Graphics.Renderer} provides fluent interface
		 */
		clear: function() {
			this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
			return this;
		}

	});

	return Renderer;

})( jQuery );