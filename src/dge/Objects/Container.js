dge.Objects.Container = (function() {

	/**
	 * Drawable object
	 * @author Drahomír Hanák
	 */
	var Container = dge.Objects.Control.extend({

		/** @type {Object} */
		_children: {},

		init: function() {
			this._super();
			this._children = {};
		},

		/**
		 * Add component
		 * @param {String} name
		 * @param {dge.Objects.Control} Control
		 * @return {dge.Objects.Container}
		 */
		addControl: function( name, Control ) {
			if (!(Control instanceof  dge.Objects.Control)) {
				throw new Error('Child component must be an instance of dge.Objects.Component');
			}

			this._children[name] = Control;
			return this;
		},

		/**
		 * Get component by name
		 * @param {String} name
		 * @return {dge.Objects.Component}
		 */
		getControl: function( name ) {
			return this._children[name];
		},

		/**
		 * Get all children components
		 * @return {Array}
		 */
		getControls: function() {
			return this._children;
		},

		/**
		 * For each children
		 * @param {Function} handle
		 */
		each: function(handle) {
			for (var i in this._children) {
				handle.call(this._children[i], this._children[i], i);
			}
		}

	});

	return Container;

})();