/*
 * Copyright 2011 DFKI GmbH
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileOverview Aviate JS
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 DFKI GmbH
 * @license Apache License, Version 2.0 (LICENSE.txt)
 */

/**
 * Lifting the {@link jQuery} object into an aviate object.
 * @namespace Aviate
 */
(function($, undefined) {

	/**
	 * You can call .aviate() on every jQuery object.
	 */
    $.widget('Aviate.aviate', {

    	// default options
    	options: {
    		//TODO: add specific options!
    		/**
    		 * namespaces to be used!
    		 */
    		namespaces: {},
    		//////////// EVENTS /////////////
    		/**
    		 * ready: called as soon as the object is ready (after _create)
    		 */
    		ready: jQuery.noop,
    		/**
    		 * contextchanged: TODO:
    		 */
    		contextchanged: jQuery.noop,
    		/**
    		 * urischanged: TODO:
    		 */
    		urischanged: jQuery.noop
    	},
		/**
		 * TODO:
		 */
		_cache: {},
		
		/**
		 *  TODO:
		 */
		_matches: [],
		
		/**
		 *  TODO:
		 */
		_oldMatches: [],
		
    	/**
    	 * Aviates the element only once!
    	 */
    	_create: function() {
			jQuery.Aviate.log("info", "Aviate.core", "Start aviating " + this.element);
			this._trigger("ready", this, {});
			jQuery.Aviate.log("info", "Aviate.core", "End with aviating " + this.element);
		},
		
		/**
		 * Is called every time you call .aviate() on an object.
		 */
		_init: function() {
			//ignore
		},
		
		_setOption: function( key, value ) {
			jQuery.Widget.prototype._setOption.apply(this, [key, value]);
			//TO BE COMING in jQueryUI 1.9: super._setOption(key, value);
		},
		
		/**
		 * options:
		 * async: true, false
		 */
		analyze: function (async) {
			jQuery.Aviate.log("info", "Aviate.core", "Start analyze!");
			var that = this;
			var elem = this.element;
			jQuery.each(jQuery.Aviate.connectors, function () {
				jQuery.Aviate.log("info", "Aviate.core", "Starting analysis with connector: '" + this.id + "'!");
				var callback = function (conn) {
					return function (rdf) {
						jQuery.each(that.options.namespaces, function(k, v) {
							rdf.prefix(k, v);
						});
						that._cache[conn.id] = rdf;
						that._trigger('contextchanged', conn, {'rdf': rdf});
						jQuery.Aviate.log("info", "Aviate.core", "Received RDF annotation from connector '" + conn.id + "'!");
					};
				}(this);
				if (async) {
					window.setTimeout(this.analyze(elem, that.options.namespaces, callback), 0); // execute the analysis in an own thread
				} else {
					this.analyze(elem, that.options.namespaces, callback);
				}
			});
			jQuery.Aviate.log("info", "Aviate.core", "Finished task: 'analyze'!");
			
			return this;
		},
		
		filter: function (filterId) {
			if (filterId === undefined) {
				jQuery.Aviate.log("warn", "Aviate.core", "Invoked 'filter' with undefined argument!");
			} else if (typeof filterId === 'string') {
				var that = this;
				this._oldMatches = this._matches;
				this._matches = [];
				$.each (jQuery.Aviate.dsfs, function () {
					if (this.id === filterId) {
						jQuery.Aviate.log("info", "Aviate.core", "Invoking DSF '" + this.id + "'!");
						jQuery.merge(that._matches, this.filter(that, that._cache, that._oldMatches));
					}
				});
			} else {
				jQuery.Aviate.log("warn", "Aviate.core", "Invoked 'filter' with wrong argument: '" + filterId + "'!");
			}
			return this;
		},
		
		query: function (uri, props) {
			var ret = {};
			if (uri === undefined) {
				jQuery.Aviate.log("warn", "Aviate.core", "Invoked 'query' with undefined argument!");
			}
			if (uri instanceof jQuery.rdf.resource &&
					uri.type === 'uri') {
				var that = this;

				jQuery.each(props, function () {
					ret[this] = [];
				});

				jQuery.each(jQuery.Aviate.connectors, function () {
					var retTmp = this.query(uri, props);
					if (retTmp) {
						jQuery.extend(ret, retTmp);
					}

				});
			}
			return ret;
		},
		
		matches: function () {
			return this._matches;
		},
		
		undo: function () {
			this._matches = this._oldMatches;
			this._oldMatches = [];
			return this;
		},
		
		clear: function () {
			this._matches = [];
			this._oldMatches = [];
			return this;
		},
		
		////////////////////////////////
		////////////////////////////////
		////////////////////////////////
		
		add: function (options) {
			//TODO
			return this;
		}, 
		
		remove: function (options) {
			//TODO
			return this;
		},
		
		serialize: function () {
			//TODO: store all annotations to the object
			//TODO: use VIE for that??
			jQuery.Aviate.log("warn", "Aviate.core", "TO IMPLEMENT: serialize()");
			return this;
		}
    });

}(jQuery));

jQuery.Aviate.log = function (level, component, message) {
	switch (level) {
	case "info":
		console.info(component + ' ' + message);
		break;
	case "warn":
		console.warn(component + ' ' + message);
		break;
	case "error":
		console.error(component + ' ' + message);
		break;
	}
}

jQuery.Aviate.dsfs = [];

jQuery.Aviate.registerDsf = function (dsf) {
	//first check if there is already 
	//a domain-specific filter with 'id' registered
	var register = true;
	jQuery.each(jQuery.Aviate.dsfs, function () {
		//TODO: untested code!
		if (this.id === dsf.id) {
			register = false;
			return;
		}
	});
	if (register) {
		jQuery.Aviate.dsfs.push(dsf);
		jQuery.Aviate.log("info", "Aviate.core", "Registered DSF '" + dsf.id + "'");
	} else {
		jQuery.Aviate.log("warn", "Aviate.core", "Did not register DSF, as there is" +
				"already a DSF with the same id registered.");
	}
}

jQuery.Aviate.unregisterDsf = function (dsf) {
	jQuery.each(jQuery.Aviate.dsfs, function () {
		//TODO: untested code!
		if (this.id === dsf.id) {
			//TODO: array slice
			jQuery.Aviate.log("info", "Aviate.core", "De-registered DSF '" + dsf + "'");
			return;
		}
	});
}

jQuery.Aviate.connectors = [];

jQuery.Aviate.registerConnector = function (connector) {
	//first check if there is already 
	//a connector with 'connector.id' registered
	var register = true;
	jQuery.each(jQuery.Aviate.connectors, function () {
		if (this.id === connector.id) {
			register = false;
			return;
		}
	});
	if (register) {
		jQuery.Aviate.connectors.push(connector);
		jQuery.Aviate.log("info", "Aviate.core", "Registered connector '" + connector.id + "'");
	} else {
		jQuery.Aviate.log("warn", "Aviate.core", "Did not register connector, as there is" +
				"already a connector with the same id registered.");
	}
}

jQuery.Aviate.unregisterConnector = function (connector) {
	jQuery.each(jQuery.Aviate.connectors, function () {
		//TODO: untested code!
		if (this.id === connector.id) {
			//TODO: array slice
			jQuery.Aviate.log("info", "Aviate.core", "De-registered connector '" + connector + "'");
			return;
		}
	});
}