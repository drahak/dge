dge.Object = (function() {

    // Initialize variables
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    /**
     * Clone any object
     * @param {Object} obj
     * @return {Object|Date|Array}
     * @throws {Error}
     */
    var _clone = function( obj ) {
        obj = obj || this;
        if (null == obj || "object" != typeof obj) return obj;

        // Copy Date
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }

        // Copy array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0; i < obj.length; ++i) {
                copy[i] = _clone(obj[i]);
            }
            return copy;
        }

        // Copy Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = _clone(obj[attr]);
                } else {
                    copy[attr] = obj[attr];
                }
            }
            return copy;
        }

        throw 'Unable to copy object. Its type is not supported';
    };

    /**
     * dge.Object
     * @type {Object}
     */
    return {

        /**
         * Inherit methods from object and returns class
         * @param {Object} Properties
         * @return {Function} objet constuctor
         */
        extend: function( prop ) {
            var _super = this.prototype || {};
            if (_super instanceof Object) {
                var parent = {};
                for (var attr in _super) {
                    parent[attr] = _super[attr];
                }
            }

            // Instantiate a base class (but only create the instance,
            // don't run the initialize constructor)
            initializing = true;
            var prototype = typeof this === "function" ? new this() : {};
            initializing = false;

            // Copy the properties over onto the new prototype
            for (var name in prop) {
                // Check if we're overwriting an existing function
                prototype[name] = typeof prop[name] == "function" &&
                    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                    (function(name, fn){
                        return function() {
                            var tmp = this._super;

                            // Add a new ._super() method that is the same method
                            // but on the super-class
                            this._super = _super[name];

                            // The method only need to be bound temporarily, so we
                            // remove it when we're done executing
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;

                            return ret;
                        };
                    })(name, prop[name]) :
                    prop[name];
            }

            // The dummy class constructor
            function Class() {
                // All construction is actually done in the init method
                if ( !initializing && this.initialize )
                    this.initialize.apply(this, arguments);
            }

            // Populate our constructed prototype object
            Class.prototype = prototype;

            // Enforce the constructor to be what we expect
            Class.prototype.constructor = Class;

            // Allow object cloning
            Class.prototype.clone = _clone;

            // Allow parent properties access
            Class.prototype.parent = parent;

            // And make this class extendable
            Class.extend = arguments.callee;

            return Class;
        },

        /**
         * Clone any object
         * @param {Object} obj
         * @return {Object|Date|Array}
         * @throws {Error}
         */
        clone: _clone
    };
})()