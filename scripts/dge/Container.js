dge.Container = (function() {

    /**
     * Container class
     * @author Drahomír Hanák
     */
    var Container = dge.Object.extend({

        /** @type {Object} */
        parameters: {
			drawing: {
				base: '#dge',
				width: 800,
				height: 600
			}
		},
        /** @type {Object} */
        services: {},

        /**
         * System container
         * @param {Array} params
         * @constructor
         */
        init: function( params ) {
            this.parameters = params;
        },

        /**
         * Create game instance
         * @return {dge.Game}
         */
        createServiceGame: function()  {
            return new dge.Game(this);
        },

        /**
         * Get game service
         * @return {dge.Game}
         */
        getServiceGame: function() {
            if (!this.services["game"] || !(this.services["game"] instanceof dge.Game))
                return this.services["game"] = this.createServiceGame();
            return this.services["game"];
        }

    });

    return Container;

})();