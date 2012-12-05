dge.Objects.Entity = (function() {

    /**
     * Entiry class
     * @author Drahomír Hanák
     */
    var Entity = dge.Objects.GameObject.extend({

        /** @type {dge.Vector2} */
        distance: dge.Vector2.zero(),
        /** @type {Number} */
        frameDiff: 0,
        /** Material type */
        type: dge.Objects.GameObject.TYPE.WALK_THROUGH,

        /**
         * Update method
         * @param {Number} time difference
         */
        update: function( diff ) {
			var old = this.rectangle.vector;
            var dist = this.distance.mul(diff).div(1000);
            this.rectangle.vector = this.rectangle.vector.add(dist);
			if (!this.rectangle.vector.equals(old)) {
				this.invalidateControl();
			}
        },

        /**
         * Check if this entity collide with another one
         * @param {dge.GameObject}
         * @return {Boolean}
         */
        collidesWidth: function( gameObject ) {
            if (gameObject.type === dge.GameObject.TYPE.SOLID) {
                this.distance = dge.vec2(0, 0);
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