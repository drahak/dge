Pacman.Game = (function () {

	/**
	 * Pacman game class
	 * @author Drahomír Hanák
	 */
	var Game = dge.Core.Game.extend({

		// Assets
		bg: null,
		/** @type {Array}.<dge.Level> */
		levels: [],
		/** @type {dge.Level} */
		level: null,

		/**
		 * Pacman game constructor
		 * @constructor
		 */
		init: function (container) {

			// Call parent constructor
			this._super(container);

			// Load assets
			this.bg = new dge.Graphics.Image("resources/images/level_background.png");

			// Create level
			this.level = new dge.Core.Level(this.context.create('renderer'), container.parameters.level[0], 30);
			this.level.setMaterial(1, new dge.Graphics.Image("resources/textures/wall.png"));

			// Add controls
			this.addControl('level', this.level);
			this.addControl('pacman', new Pacman.Entities.PacmanEntity(this.context.create('renderer')));
		},

		/**
		 * Draw method
		 */
		draw: function () {
			this.bg.draw(this.renderer);
			this._super();
		},

		/**
		 * Update method
		 * @param {dge.GameTime} gameTime
		 */
		update: function (gameTime) {
			//this.context.get('world').Step(gameTime.elapsedTime, 5);
			this._super(gameTime);
		}

	});

	return Game;

})();