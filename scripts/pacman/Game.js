Pacman.Game = (function () {

	/**
	 * Pacman game class
	 * @author Drahomír Hanák
	 */
	var Game = dge.Game.extend({

		// Assets
		bg:null,
		/** @type {Array}.<dge.Level> */
		levels:[],
		/** @type {dge.Level} */
		level:null,

		inited:false,

		/**
		 * Pacman game constructor
		 * @constructor
		 */
		init:function (container) {

			// Call parent constructor
			this._super(container);

			// Load assets
			this.bg = new dge.Graphics.Image("resources/images/level_background.png");

			// Create level
			this.level = new dge.Level(this.context.create('renderer'), container.parameters.level[0], 30);
			this.level.setMaterial(1, new dge.Graphics.Image("resources/textures/wall.png"));

			// Add controls
			this.addControl('level', this.level);
			this.addControl('pacman', new Pacman.Entities.PacmanEntity(
				this.context.create('renderer'),
				new dge.Rectangle(dge.vec2(30, 30), 30, 30),
				new dge.Graphics.AnimationSheet("resources/sprites/pacman_sprite.png", 5, 32)
			));
		},

		/**
		 * Draw method
		 */
		draw:function () {
			this.bg.draw(this.renderer);
			this._super();
		},

		/**
		 * Update method
		 * @param {dge.GameTime} gameTime
		 */
		update:function (gameTime) {
			this._super(gameTime);
		}

	});

	return Game;

})();