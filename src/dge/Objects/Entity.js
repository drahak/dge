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
         * @param {dge.GameTime} gameTime
         */
        update: function( gameTime ) {
			this._super(gameTime);
			var old = this.rectangle.getOffset();
            var dist = this.distance.mul(gameTime.elapsedTime).div(1000);
			this.rectangle = this.rectangle.offset(this.rectangle.getOffset().add(dist));
			if (!this.rectangle.getOffset().equals(old)) {
				this.invalidateControl();
			}
        },

        /**
         * Check if this entity collide with another one
         * @param {dge.GameObject} gameObject
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
         * @param {dge.Vector2} vector
         * @return {dge.Entity}
         */
        spawn: function( vector ) {
            var entity = this.clone();
            if (vector && vector instanceof dge.Vector2)
                entity.rectangle.offset(vector);
            return entity;
        }

    });

    return Entity;

})();