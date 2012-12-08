dge.Core = dge.Core || {};

dge.Core.Game = (function( window ) {

    /**
     * Request animation frame
     * @type {Function}
     */
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /**
     * Game class
     * @author Drahomír Hanák
     */
    var Game = dge.Objects.DrawableControl.extend({

        /** @type {dge.DI.Container} */
        context: null,
        /** @param {dge.GameTime} gameTime */
        update: function(gameTime) {},

        /**
         * Game constructor
         * @param {dge.DI.Container} container
         * @throws {Error} cannot create context
         * @constructor
         */
        init: function( container ) {

			// Call parent method
			this._super(container.create('renderer'));

            // Create context
            this.context = container;
			$(container.parameters['rendering'].base).addClass('dge-base');

			// Setup timer
			var game = this;
			var gameTime = this.context.get('gameTime');
			gameTime.addListener('repaint', function(gameTime) {
				game.repaint.call(game, gameTime);
			});
			this._tick(gameTime);
        },

        /**
         * Repaint canvas
         * @param {dge.GameTime} gameTime
         */
        repaint: function( gameTime ) {
            // Update and redraw
			var args = arguments;
			this.each(function() {
				if (this instanceof dge.Objects.GameObject) {
					this.update.apply(this, args);
				}
			});
            this.draw.call(this);
        },

		/**
		 * Timer tick
		 * @param {dge.GameTime} gameTime
		 * @private
		 */
		_tick: function(gameTime) {
			var self = this;
			gameTime.update();

			requestAnimFrame(function() {
				self._tick.call(self, gameTime)
			});
		}

    });

    return Game;

})( window );