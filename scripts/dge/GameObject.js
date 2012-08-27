dge.GameObject = (function() {

    // Material types - local copy
    var _type = {
        // Solid material
        SOLID: 1,
        // Walk throught
        WALK_THROUGH: 0
    }

    /**
     * GameObject class
     * @author Drahomír Hanák
     */
    var GameObject = dge.Object.extend({

        /** @type {dge.Image} */
        image: null,
        /** @type {dge.Rectangle} */
        rectangle: null,
        /** @type {Number} */
        type: _type.SOLID,

        /**
         * Create game object
         * @param {dge.Rectangle}
         * @param {dge.Image}
         * @constructor
         */
        initialize: function( rectangle, image ) {
            this.rectangle = rectangle;
            this.image = image;
        },

        /**
         * Draw game object
         * @param {dge.Game}
         */
        draw: function( game ) {
            this.image.draw(game, this.rectangle.vector);
        },

        /**
         * Set game object position
         * @param {dge.Vector2}
         */
        setPosition: function( vector ) {
            this.rectangle.vector = vector;
        }

    });

    // Game object types
    GameObject.TYPE = _type;

    return GameObject;

})();