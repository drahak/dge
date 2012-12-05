dge.DI = dge.DI || {};

dge.DI.Container = (function() {

    /**
     * System Container
     * @author Drahomír Hanák
     */
    var Container = dge.Object.extend({

        /** @type {Object} */
        parameters: {
			rendering: {
				base: '#dge',
				width: 800,
				height: 600
			},

			frameRate: 60
		},

        /** @type {Object} */
        services: {

			renderer: {
				factory: function() {
					return new dge.Graphics.Renderer(this.parameters['rendering']);
				}
			},

			gameTime: {
				factory: function() {
					return new dge.GameTime(this.parameters['frameRate']);
				}
			}

		},

        /**
         * System container
         * @param {Object} container
         * @constructor
         */
        init: function(container) {
			this.parameters = $.extend({}, container.parameters || {}, this.parameters);
			this.services = $.extend({}, container.services || {}, this.services);
        },

		/**
		 * Add service factory
		 * @param {String} name
		 * @param {Function} service
		 * @return {dge.DI.Container}
		 */
    	factory: function(name, service) {
			this.services[name] = this.services[name] || {};
			this.services[name].factory = service;
			return this;
		},

		/**
		 * Create service
		 * @param {String} name
		 * @return {Object}
		 */
		create: function(name) {
			return this.services[name].factory.apply(this, Array.prototype.slice.call(arguments, 1));
		},

		/**
		 * Get service
		 * @param {String} name
		 * @return {Object}
		 */
		get: function(name) {
			if (!this.services[name].service) {
				return this.services[name].service = this.create(name);
			}
			return this.services[name].service;
		}

    });

    return Container;

})();