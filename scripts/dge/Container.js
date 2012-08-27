dge.Container = (function() {

    /**
     * Container class
     * @author Drahomír Hanák
     */
    var Container = dge.Object.extend({

        /** @type {Object} */
        params: {},
        /** @type {Object} */
        services: {},

        /**
         * System container
         * @param {Array} params
         * @constructor
         */
        initialize: function( params ) {
            this.params = params;
        },

        /**
         * Create game instance
         * @return {dge.Game}
         */
        createServiceGame: function()  {
            return new dge.Game(this, this.params['canvas']);
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