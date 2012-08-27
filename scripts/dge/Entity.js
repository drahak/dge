dge.Entity = (function() {

    /**
     * Entiry class
     * @author Drahomír Hanák
     */
    var Entity = dge.GameObject.extend({

        /** @type {dge.Vectro2} */
        distance: dge.Vector2.zero(),
        /** @type {Number} */
        frameDiff: 0,
        /** Material type */
        type: dge.GameObject.TYPE.WALK_THROUGH,

        /**
         * Update method
         * @param {Number} time difference
         */
        update: function( diff ) {
            var dist = this.distance.mul(diff).div(1000);
            this.rectangle.vector = this.rectangle.vector.add(dist);
        },

        /**
         * Check if this entity collide with another one
         * @param {dge.GameObject}
         * @return {Boolean}
         */
        collidesWidth: function( gameObject ) {
            if (gameObject.type === dge.GameObject.TYPE.SOLID) {
                console.log("Walking throug the walls! Awesome :)");
            }
        },

        /**
         * Spawn new entity
         * @param {dge.Vector2} new position
         * @return {dge.Entity}
         */
        spawn: function( vector ) {
            var entity = this.clone();
            if (vector && vector instanceof dge.Vector2)
                entity.rectangle.vector = vector;
            return entity;
        }

    });

    return Entity;

})();