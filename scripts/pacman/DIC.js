Pacman.DIC = (function() {

	// Create system container
	return new dge.DI.Container({

		// Game rendering settings
		parameters: {

			// Levels
			level: [
				new dge.CollisionMap([
					[1,1,1,1,1,1,1,1,1,1,1],
					[1,0,0,0,0,0,0,0,0,0,1],
					[1,1,1,1,1,1,1,1,1,0,1],
					[1,0,0,0,0,0,0,0,0,0,1],
					[1,1,1,1,1,1,1,1,1,1,1]
				], 30)
			]

		},

		// Services
		services: {

		}
	});

})();