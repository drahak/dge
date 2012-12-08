var dge = (function( dge ) {

	// Using Box2D
	/**
	var	b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData = Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	*/


	// Dge engine
    var dge = dge || {};

    /**
     * Vector2 class
     * @see dge.Vector2
     */
    dge.vec2 = function() {
        return dge.Vector2.create.apply(this, arguments);
    };

    /**
     * Is number
     * @param {Number} num
     * @return {Boolean}
     */
    dge.isNumber = function( num ) {
        return num == parseFloat(num);
    };

    return dge;

})( dge );