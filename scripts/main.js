
var sources = [

	// Library sources
	"./dge/helpers",
	"./dge/Object",
	"./dge/Vector2",
	"./dge/CollisionMap",
	"./dge/Rectangle",
	"./dge/DI/Container",
	"./dge/Utils/Input",
	"./dge/Graphics/Renderer",
	"./dge/Graphics/Image",
	"./dge/Graphics/AnimationSheet",
	"./dge/Objects/Control",
	"./dge/Objects/Container",
	"./dge/Objects/DrawableControl",
	"./dge/Objects/GameObject",
	"./dge/Objects/Entity",
	"./dge/Game",
	"./dge/Level",

	"./pacman/Game",
	"./pacman/DIC",
	"./pacman/Entities/PacmanEntity"
];

var Pacman = {
	Entities: {}
};

require(sources, function() {
	var pacman = new Pacman.Game(Pacman.DIC);
});