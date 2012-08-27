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
    var Game = dge.Object.extend({

        /** @type {dge.Container} */
        context: null,

        /** @type {Array}.<Function> */
        _ticks: [],

        /** @type {Number} */
        time: new Date().getTime(),

        /** @param {Function} */
        update: function(diff) {},

        /** @typ {Function} */
        draw: function(context, canvas) {},

        /**
         * Game constructor
         * @param {dge.Container} container
         * @param {String|HTMLCanvasElement} canvas
         * @throws {Error} cannot create context
         * @constructor
         */
        initialize: function( container, canvas ) {
            // Get canvas element
            this.canvas = (typeof canvas === "string" ? $(canvas).get(0) : canvas.get(0));
            this.width = this.canvas.width;
            this.height = this.canvas.height;

            // Check canvas
            if (!this.canvas)
                throw new Error("Canvas not found");
            if (this.canvas && !this.canvas.getContext)
                throw new Error("Cannot create drawing context on " + this.canvas);

            // Create context
            this.ctx = this.canvas.getContext('2d');
            this.context = container;

            this.addTick("repaint", this.repaint);
            this._tick(0);
        },

        /**
         * Add tick
         * @param {String} tick name
         * @param {Function} handle
         */
        addTick: function( tickName, tickHandle ) {
            this._ticks.push({ name: tickName, handle: tickHandle });
        },

        /**
         * Remove tick
         * @param {String} name
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
         * @param {Number} time difference
         */
        repaint: function( diff ) {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update and redraw
            this.update.call(this, diff);
            this.draw.apply(this, [this.ctx, this.canvas]);
        },

        /**
         * On timer tick
         * @param {Number} time difference
         * @private
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