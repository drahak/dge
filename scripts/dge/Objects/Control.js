dge.Objects = dge.Objects || {};

dge.Objects.Control = (function() {

	/**
	 * Component class
	 * @author Drahomír Hanák
	 */
	var Control = dge.Object.extend({

		_invalid: false,

		init: function() {
			this.invalidateControl();
		},

		/**
		 * Is component invalid
		 * @return {Boolean}
		 */
		isControlInvalid: function() {
			return this._invalid;
		},

		/**
		 * Invalidate component
		 * @return {dge.Objects.Component} provides fluent interface
		 */
		invalidateControl: function() {
			this._invalid = true;
			return this;
		},

		/**
		 * Validate component
		 * @return {dge.Objects.Component} provides fluent interface
		 */
		validateControl: function() {
			this._invalid = false;
			return this;
		}

	});

	return Control;

})();