dge.Objects.GameObject = (function() {

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
    var GameObject = dge.Objects.DrawableControl.extend({

		/** @type {dge.Graphics.Image} */
		image: null,
        /** @type {dge.Rectangle} */
        rectangle: null,
        /** @type {Number} */
        type: _type.SOLID,

        /**
         * Create game object
		 * @param {dge.Graphics.Renderer} renderer
         * @param {dge.Rectangle} rectangle
         * @param {dge.Graphics.Image} image
         * @constructor
         */
        init: function( renderer, rectangle, image ) {
            this.rectangle = rectangle;
            this.image = image;

			this._super(renderer);
        },

		/**
		 * Draw game object
		 */
		draw: function() {
			this._super();
			if (this.image) {
				this.image.draw(this.renderer, this.rectangle.vector);
			}
		},

		/**
		 * Update control
		 * @param {dge.GameTime} gameTime
		 */
		update: function(gameTime) {
			var args = arguments;
			this.each(function() {
				this.update.apply(this, args);
			});

			if (this.image && this.image.update) {
				this.image.update.call(this.image, gameTime);
			}
		},

        /**
         * Set game object position
         * @param {dge.Vector2} vector
         */
        setPosition: function( vector ) {
            this.rectangle.vector = vector;
        },

		/**
		 * Get game object position
		 * @return {dge.Vector2}
		 */
		getPosition: function() {
			return this.rectangle.vector;
		}

    });

    // Game object types
    GameObject.TYPE = _type;

    return GameObject;

})();