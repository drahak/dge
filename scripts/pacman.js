(function( $ ) {

    var level1 = new dge.CollisionMap([
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1]
    ], 30);

    /**
     * Pacman entity
     * @author Drahomír Hanák
     */
    var PacmanEntity = dge.Entity.extend({

        /**
         * Initialize entity
         */
        initialize: function() {
            // Call parent
            this.parent.initialize.apply(this, arguments);

            this.image.addNode("right", [1,2,3,2]);
            this.image.addNode("left", [4,5,6,5]);
            this.image.addNode("down", [7,8,9,8]);
            this.image.addNode("up", [10,11,12,11]);

            dge.Input.bind(dge.Input.D, 'right');
            dge.Input.bind(dge.Input.A, 'left');
            dge.Input.bind(dge.Input.W, 'up');
            dge.Input.bind(dge.Input.S, 'down');
        },

        /**
         * Update method
         * @param diff
         */
        update: function( diff ) {

            // Entity movement
            if (dge.Input.pressed('right')) {
                this.image.setNode('right');
                this.distance.set(60, 0);
            } else if (dge.Input.pressed('left')) {
                this.image.setNode('left');
                this.distance.set(-60, 0);
            } else if (dge.Input.pressed('up')) {
                this.image.setNode('up');
                this.distance.set(0, -60);
            } else if (dge.Input.pressed('down')) {
                this.image.setNode('down');
                this.distance.set(0, 60);
            }

            // Call parent
            this.parent.update.call(this, diff);
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
        initialize: function() {
            // Create system container
            var container = new dge.Container({
                canvas: '#game-canvas'
            });

            // Load assets
            this.bg = new dge.Image("resources/images/level_background.png");
            this.pacman = new PacmanEntity(
                new dge.Rectangle(dge.vec2(30,30), 30, 30),
                new dge.AnimationSheet("resources/sprites/pacman_sprite.png", 80, 32)
            );

            // Create levels
            this.levels.push(new dge.Level(level1, 30));

            this.level = this.levels[0];
            this.level.setMaterial(1, new dge.Image("resources/textures/wall.png"));
            this.level.entities.push(this.pacman);

            // Call parent constructor
            this.parent.initialize.apply(this, [container, container.params.canvas]);
        },

        /**
         * Draw method
         * @param {Object} ctx
         * @param {HTMLCanvasElement} canvas
         */
        draw: function( ctx, canvas ) {
            this.bg.draw(this);

            // Draw level and its entities
            this.level.draw(this);
        },

        update: function( diff ) {
            this.level.update(diff);
        }

    });

    var pacman = new Pacman();

})( jQuery );