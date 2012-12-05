dge.GameTime = (function() {

	/**
	 * Game Time class
	 * @author Drahomír Hanák
	 */
	var GameTime = dge.Object.extend({

		/**
		 * @type {Object}
		 * @private
		 */
		_listeners: {},

		/** @type {Date} time now */
		now: new Date(),
		/** @type {Date} last time */
		last: new Date(),
		/** @type {Number} Elapsed time from previous frame */
		elapsedTime: 0,
		/** @type {Number} Elapsed total time */
		elapsedTotalTime: 0,
		/** @type {Number} */
		frameRate: 60,

		/**
		 * @param {Number} frameRate
		 * @constructor
		 */
		init: function( frameRate ) {
			this.frameRate = frameRate;

			this.now = new Date();
			this.last = new Date();
			this.elapsedTime = 0;
			this.elapsedTotalTime = 0;
			this.frames = 0;
		},


		/**
		 * Add timer tick listener
		 * @param {String} name
		 * @param {Function} handle
		 * @return {dge.GameTime}
		 */
		addListener: function(name, handle) {
			this._listeners[name] = handle;
			return this;
		},

		/**
		 * Remove timer tick listener
		 * @param {String} name
		 * @return {dge.GameTime}
		 */
		removeListener: function(name) {
			if (this._listeners[name])
				this._listeners.splice(this._listeners.indexOf(this._listeners[name]), 1);
			return this;
		},

		/**
		 * Trigger all listeners
		 * @return {dge.GameTime}
		 */
		triggerListeners: function() {
			for (var i in this._listeners) {
				this._listeners[i].call(this._listeners[i], this);
			}
			return this;
		},

		/**
		 * Update game time
		 */
		update: function() {
			this.now = new Date();
			this.elapsedTime = this.now.getTime()-this.last.getTime();
			this.elapsedTotalTime += this.elapsedTime;

			if (this.elapsedTime > 1000/this.frameRate) {
				this.triggerListeners();
				this.last = new Date();
				this.frames++;
			}
		}

	});

	return GameTime;

})();