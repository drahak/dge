var dge = (function( dge ) {

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
     * @param {Number}
     * @return {Boolean}
     */
    dge.isNumber = function( num ) {
        return parseFloat(num) && num == parseFloat(num);
    };

    return dge;

})( dge );