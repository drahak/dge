dge.Game = (function( window ) {

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

        /** @type {dge.Container} */
        context: null,

        /** @type {Array}.<Function> */
        _ticks: [],

        /** @type {Number} */
        time: new Date().getTime(),

        /** @param {Function} */
        update: function(diff) {},

        /**
         * Game constructor
         * @param {dge.Container} container
		 * @param {Object} parameters
         * @throws {Error} cannot create context
         * @constructor
         */
        init: function( container ) {

			// Call parent method
			this._super(new dge.Graphics.Renderer(container.parameters.drawing));

            // Create context
            this.context = container;
			$(container.parameters.drawing.base).addClass('dge-base');

			// Setup timer
            this.addTick("repaint", this.repaint);
            this._tick(0);
        },

        /**
         * Add tick
         * @param {String} tickName
         * @param {Function} tickHandle
         */
        addTick: function( tickName, tickHandle ) {
            this._ticks.push({ name: tickName, handle: tickHandle });
        },

        /**
         * Remove tick
         * @param {String} tickName
         */
        removeTick: function( tickName ) {
            var index;
            for (var tick in this._ticks) {
                if ( this._ticks[tick].name == tickName) {
                    index = tick;
                    break;
                }
            }
            this._ticks.splice(index, 1);
        },

        /**
         * Repaint canvas
         * @param {Number} diff
         */
        repaint: function( diff ) {
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
         * On timer tick
         * @private
 		 * @param {Number} diff
         */
        _tick: function( diff ) {
            // Count time for animation frame
            var game = this;
            var lastTime = new Date().getTime(),
                diff = lastTime-game.time;

            // Request animation frame
            requestAnimFrame(function() {
                lastTime = new Date().getTime();
                diff = lastTime-game.time;
                game.diff = diff;

                // Repaint every 60 second
                if (diff >= 30) {
                    for (var i in game._ticks) {
                        game._ticks[i].handle.call(game, diff);
                    }
                    game.time = dge.Object.clone(lastTime);
                }
                game._tick.call(game, diff);
            });
        }

    });

    return Game;

})( window );