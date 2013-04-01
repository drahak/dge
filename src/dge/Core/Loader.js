dge.Core = dge.Core || {};

dge.Core.Loader = (function() {

	/**
	 * Loader class
	 * @author Drahomír Hanák
	 */
	var Loader = dge.Objects.DrawableControl.extend({

		/** @type {Number} process in percentage */
		process: 0,

		/**
		 * Load all assets
		 * @return {dge.Core.Loader}
		 */
		load: function() {
			this.process = Loader._loading.length == 0 ? 100 : 0;
			for (var i in Loader._loading) {
				var asset = Loader._loading[i];
				var loader = this;
				asset.load(function() {
					Loader._loaded.push(asset);
					Loader._loading.splice(i, 1);
					loader.process += (Loader._loading.lenght+Loader._loaded.lenght)/(Loader._loaded.lenght*100);
				});
			}
		}

	});

	Loader._loaded = [];
	Loader._loading = [];

	/**
	 * Add asset to loader
	 * @param {dge.Graphics.Image} asset
	 */
	Loader.add = function(asset) {
		Loader._loading = asset;
	}

	return Loader;

})();