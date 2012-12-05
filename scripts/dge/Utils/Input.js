dge.Utils = dge.Utils || {};

dge.Utils.Input = (function( $ ) {

    var Input = {
        // All callbacks
        binds: {},

        // Current pressed key
        pressedKey: 0,

        // Arrows
        ARROW: {
            LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40
        },

        // Alphabet
        A: 65, B: 66, C: 67, D: 68, E: 69,
        F: 70, G: 71, H: 72, I: 73, J: 74,
        K: 75, L: 76, M: 77, N: 78, O: 79,
        P: 80, Q: 81, R: 82, S: 83, T: 84,
        U: 85, V: 86, W: 87, X: 88, Y: 89,
        Y: 90,

        // Numbers
        N0: 48, N1: 49, N2: 50, N3: 51,
        N4: 52, N5: 53, N6: 54, N7: 55,
        N8: 56, N9: 57,

        // Useable keys
        CTRL: 17, ENTER: 13, ALT: 18, SPACE: 32,
        TAB: 9, SHIFT: 16, PAUSE: 19, CAPS: 20,
        ESC: 27, DEL: 46, INSERT: 45, HOME: 36,
        END: 35,

        /**
         * Input styte
         * @param {Number} key code
         * @param {String} name
         */
        bind: function( key, name ) {
            return this.binds[name] = key;
        },

        /**
         * Is key pressed
         * @param {Number|String} key code or bind name
         * @return {Boolean}
         */
        pressed: function( key ) {
            if (typeof key === "number") {
                if (this.pressedKey === key)
                    return true;
            } else if(typeof key === "string") {
                if (this.pressedKey === this.binds[key])
                    return true;
            }
            return false;
        }
    };

    // Observ canvas and save keyCode of current keydown
    $('html, body').on('keydown', function( event ) {
        event = $.event.fix(event);
        Input.pressedKey = event.keyCode;
    }).keyup(function() {
        Input.pressedKey = 0;
    });

    return Input;

})( jQuery );