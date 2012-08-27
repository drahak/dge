dge.Level = (function() {

    var Level = dge.Object.extend({

        /** @type {Number} tile size */
        tileSize: 40,
        /** @type {dge.CollisionMap} */
        collisionMap: [],
        /** @type {Object}.<dge.Image> */
        material: {},
        /** @type {Array}.<dge.Entity> */
        entities: [],

        /**
         * Create level
         * @param {dge.CollisionMap}
         * @param {Number} tile size
         */
        initialize: function( map, tileSize ) {
            this.collisionMap = map;
            this.tileSize = tileSize;
        },

        /**
         * Set material
         * @param {Number} index
         * @param {dge.Image} image
         */
        setMaterial: function( index, image ) {
            this.material[index] = image;
        },

        /**
         * Draw level
         * @param {dge.Game}
         */
        draw: function( game ) {
            var level = this;

            // Draw map
            this.collisionMap.each(function( x, y, value ) {
                // Check material
                var material = level.material[value];
                if (material && !(material instanceof dge.Image))
                    throw 'Material must be of type dge.Image';

                // Draw image
                if (material) {
                    material.draw(game, dge.vec2(x*this.tileSize, y*this.tileSize));
                }
            });

            // Draw entities
            for (var entity in this.entities) {
                var entity = this.entities[entity];
                entity.draw(game);
            }
        },

        /**
         * Update level
         * @param {Number} time difference
         */
        update: function( diff ) {
            var level = this;
            // Update entities
            for (var entity in this.entities) {
                var entity = this.entities[entity];
                entity.update(diff);
            }

            // Check for entities collision
            for (var entity in this.entities) {
                entity = this.entities[entity];

                this.collisionMap.each(function( x, y, value, rectangle ) {
                    if (rectangle.intersects(entity.rectangle) && value > 0)
                        entity.collidesWidth(new dge.GameObject(rectangle, level.material[value]));
                });
            }
        }

    });

    return Level;

})();