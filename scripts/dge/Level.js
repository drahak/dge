dge.Level = (function() {

    var Level = dge.Objects.GameObject.extend({

        /** @type {Number} tile size */
        tileSize: 40,
        /** @type {dge.CollisionMap} */
        collisionMap: [],
        /** @type {Object}.<dge.Graphics.Image> */
        material: {},

        /**
         * Create level
		 * @param {dge.Graphics.Renerer} renderer
         * @param {dge.CollisionMap} map
         * @param {Number} tileSize
         */
        init: function( renderer, map, tileSize ) {
			this._super(renderer, new dge.Rectangle(0, 0, 0, 0), null);

            this.collisionMap = map;
            this.tileSize = tileSize;
        },

        /**
         * Set material
         * @param {Number} index
         * @param {dge.Graphics.Image} image
		 * @return {dge.Level}
         */
        setMaterial: function( index, image ) {
            this.material[index] = image;
			return this;
        },

        /**
         * Draw level
         */
        draw: function() {
			this._super();
            var level = this;

            // Draw map
            this.collisionMap.each(function( x, y, value ) {
                // Check material
                var material = level.material[value];
                if (material && !(material instanceof dge.Graphics.Image))
                    throw 'Material must be of type dge.Graphics.Image';

                // Draw image
                if (material) {
                    material.draw(level.renderer, dge.vec2(x*this.tileSize, y*this.tileSize));
                }
            });
        },

        /**
         * Update level
         * @param {Number} diff
         */
        update: function( diff ) {
			this._super(diff);

            // Check for entities collision
            for (var entity in this.entities) {
                entity = this.entities[entity];
				this.collides(entity);
            }
        },

		/**
		 * Trigger entity collidesWith
		 * @param {dge.Objects.Entity} entity
		 */
		collides: function( entity ) {
			this.collisionMap.each(function( x, y, value, rectangle ) {
				if (rectangle.intersects(entity.rectangle) && value > 0)
					entity.collidesWidth(new dge.Objects.GameObject(rectangle, level.material[value]));
			});
		}

    });

    return Level;

})();