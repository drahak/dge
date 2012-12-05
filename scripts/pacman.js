(function( $ ) {

    var level1 = new dge.CollisionMap([
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ], 30);

	// Create system container
	var container = new dge.Container({

		// Game drawing settings
		drawing: {
			base: '#pacman',
			width: 800,
			height: 600
		}

	});

    /**
     * Pacman entity
     * @author Drahomír Hanák
     */
    var PacmanEntity = dge.Objects.Entity.extend({

        /**
         * Initialize entity
         */
        init: function() {
            // Call parent
            this._super.apply(this, arguments);

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

    /**
     * Pacman game class
     * @author Drahomír Hanák
     */
    var Pacman = dge.Game.extend({

        // Assets
        bg: null,
        /** @type {Array}.<dge.Level> */
        levels: [],
        /** @type {dge.Level} */
        level: null,

        inited: false,

        /**
         * Pacman game constructor
         * @constructor
         */
        init: function() {

			// Call parent constructor
			this._super(container);
			var drawing = container.parameters.drawing;

			// Load assets
            this.bg = new dge.Graphics.Image("resources/images/level_background.png");

			// Create level
			this.level = new dge.Level(new dge.Graphics.Renderer(drawing), level1, 30);
			this.level.setMaterial(1, new dge.Graphics.Image("resources/textures/wall.png"));

			// Add controls
			this.addControl('level', this.level);
			this.addControl('pacman', new PacmanEntity(
				new dge.Graphics.Renderer(drawing),
				new dge.Rectangle(dge.vec2(30,30), 30, 30),
				new dge.Graphics.AnimationSheet("resources/sprites/pacman_sprite.png", 100, 32)
			));
        },

        /**
         * Draw method
         */
        draw: function() {
			this.bg.draw(this.renderer);
			this._super();
        },

		/**
		 * Update method
		 * @param {Number} diff
		 */
        update: function( diff ) {
			this._super(diff);
        }

    });

    var pacman = new Pacman();

})( jQuery );