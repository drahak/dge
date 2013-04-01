dge.Asset = (function() {

	/**
	 * Asset
	 * @author Drahomír Hanák
	 */
	var Asset = dge.Object.extend({

		/**
		 * Abstract class
		 * @constructor
		 */
		init: function() {
			// Add this to loader
			dge.Core.Loader.add(this);
		},

		/**
		 * Load asset
		 * @param {Function} handle
		 */
		load: function(handle) {
			if (!handle || typeof handle != 'function')
				throw new Error('Asset load handle must be of type function');
		}

	});

	return Asset;

})();