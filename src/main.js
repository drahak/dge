var sources = {
	dge: [
		"./dge/dge",
		"./dge/Object",
		"./dge/Vector2",
		"./dge/CollisionMap",
		"./dge/Rectangle",
		"./dge/GameTime",
		"./dge/Asset"
	],
	Objects: [
		"./dge/Objects/Control",
		"./dge/Objects/Container",
		"./dge/Objects/DrawableControl",
		"./dge/Objects/GameObject",
		"./dge/Objects/Entity"
	],
	Graphics: [
		"./dge/Graphics/Renderer",
		"./dge/Graphics/Image",
		"./dge/Graphics/AnimationSheet"
	],
	Core:  [
		"./dge/Core/Loader",
		"./dge/Core/Game",
		"./dge/Core/Level"
	],
	DI: ["./dge/DI/Container"],
	Utils: ["./dge/Utils/Input"]
}

define('dge', sources.dge, function() { return dge; });
define('dge.DI', sources.DI, function() { return dge.DI; });
define('dge.Utils', sources.Utils, function() { return dge.Utils; });
define('dge.Graphics', sources.Graphics, function() { return dge.Graphics; });
define('dge.Objects', sources.Objects, function() { return dge.Objects; });
define('dge.Core', sources.Core, function() { return dge.Core; });

var gameSources = [
	"./pacman/Game",
	"./pacman/DIC",
	"./pacman/Entities/PacmanEntity"
];

define('Pacman', gameSources, function() { return Pacman; });

var Pacman = {
	Entities: {}
};


define(function(require) {
	var engine = require('dge');
	var DI = require('dge.DI');
	var utils = require('dge.Utils');
	var graphics = require('dge.Graphics');
	var objects = require('dge.Objects');
	var core = require('dge.Core');

	var Pacman = require('Pacman');

	var game = new Pacman.Game(Pacman.DIC);
})
/**
require(sources, function() {
	require(gameSources, function() {
		var pacman = new Pacman.Game(Pacman.DIC);
	})
});*/