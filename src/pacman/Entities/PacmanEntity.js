Pacman.Entities.PacmanEntity = (function() {

    /**
     * Pacman entity
     * @author Drahomír Hanák
     */
    var PacmanEntity = dge.Objects.Entity.extend({

		/**
		 * Initialize entity
		 * @param {dge.Graphics.Renderer} renderer
		 */
        init: function(renderer) {
            // Call parent
            this._super(
				renderer,
				new dge.Rectangle(30, 30, 30, 30),
				new dge.Graphics.AnimationSheet("resources/sprites/pacman_sprite.png", 5, 32)
			);

            this.image.addNode("right", [1,2,3,2]);
            this.image.addNode("left", [4,5,6,5]);
            this.image.addNode("down", [7,8,9,8]);
            this.image.addNode("up", [10,11,12,11]);

			dge.Utils.Input.bind(dge.Utils.Input.D, 'right');
			dge.Utils.Input.bind(dge.Utils.Input.A, 'left');
			dge.Utils.Input.bind(dge.Utils.Input.W, 'up');
			dge.Utils.Input.bind(dge.Utils.Input.S, 'down');
        },

        /**
         * Update method
         * @param diff
         */
        update: function( diff ) {

			// Call parent
			this._super(diff);

            // Entity movement
            if (dge.Utils.Input.pressed('right')) {
                this.image.setNode('right');
                this.distance.set(60, 0);
            } else if (dge.Utils.Input.pressed('left')) {
                this.image.setNode('left');
                this.distance.set(-60, 0);
            } else if (dge.Utils.Input.pressed('up')) {
                this.image.setNode('up');
                this.distance.set(0, -60);
            } else if (dge.Utils.Input.pressed('down')) {
                this.image.setNode('down');
                this.distance.set(0, 60);
            }

			this.invalidateControl();
        },

        /**
         * Called when thi entity collides with another game object
         * @paran {dge.GameObject}
         */
        collidesWidth: function( gameObject ) {
            if (gameObject.type === dge.GameObject.TYPE.SOLID) {
                console.log("Walking through the walls! Awesome :)");
            }
        }

    });

	return PacmanEntity;

})();