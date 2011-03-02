/*
 * Copyright 2011 IKS Project
 * Copyright 2011 GENTICS Software GmbH, Vienna
 * Copyright 2011 evo42 communications Ltd.
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
 * @fileOverview Semantic Interaction Framework - Core
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
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
    		/**
    		 * connectors: holds an array of functions that retrieve
    		 * a connector and check whether to use it or not. 
    		 */
    		connectors: [function (c) {return true;}],
    		//////////// EVENTS /////////////
    		/**
    		 * ready: called as soon as the object is ready (after _create)
    		 */
    		ready: jQuery.noop,
    		/**
    		 * contextchanged: called every time the context is changed
    		 */
    		contextchanged: jQuery.noop,
    		/**
    		 * urischanged: called every time a URI is added or removed
    		 */
    		urischanged: jQuery.noop
    	},
		/**
		 * holds an {@link jQuery.rdf} object from every connector.
		 */
		_context: {},
		/**
		 * matches: holds all matches from the previous query.
		 * Is an array of plain JS objects.
		 */
		_matches: [],
    	/**
    	 * Aviates the element only once!
    	 */
    	_create: function() {
			jQuery.Aviate.log("info", "Aviate.core", "Start aviating " + this.element);
			this._trigger("ready", this, {});
			jQuery.Aviate.log("info", "Aviate.core", "End with aviating " + this.element);
		},
		
		/**
		 * Is called every time you call .aviate(...) on an object.
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
				if (this.analyze) {
					jQuery.Aviate.log("info", "Aviate.core", "Starting analysis with " + this);
					var callback = function (conn) {
						return function (rdf) {
							that._context[conn.id] = rdf;
							that._trigger('contextchanged', conn, {'rdf': rdf});
							jQuery.Aviate.log("info", "Aviate.core", "Received RDF annotation from connector '" + conn.id + "'!");
						};
					}(this);
					if (async) {
						window.setTimeout(this.analyze(elem, callback), 0); // execute the analysis in an own thread
					} else {
						this.analyze(elem, callback);
					}
				} else {
					jQuery.Aviate.log("info", "Aviate.core", "Connector '" + this.id + "' does not support 'analyze()'!");
				}
			});
			jQuery.Aviate.log("info", "Aviate.core", "Finished analyze!");
			
			return this;
		},
		
		query: function (options) {
			if (options === undefined) {
				//TODO:
			} else if (options instanceof jQuery.rdf.resource &&
					options.type === 'uri') {
				var ret = [];
				$.each(this._context, function (connectorId, rdf) {
					rdf
					.where(options.value + ' ?p ?o')
					.each(function () {
						//TODO: untested code!
						console.log(this.p + " " + this.o);
						//TODO: ret.push()
					});
				});
				this._matches = ret;
			} else if (typeof options === 'string') {
				var matches = [];
				var that = this;
				$.each (jQuery.Aviate.dsms, function () {
					if (this.id === options) {
						jQuery.Aviate.log("info", "Aviate.core", "Invoking DSM '" + options + "'!");
						jQuery.merge(matches, this.query(that._context, that._matches));
					}
				});
				this._matches = matches;
			} else {
				jQuery.Aviate.log("warn", "Aviate.core", "Invoked 'query' with wrong argument: '" + options + "'!");
			}
			return this;
		}, 
		
		matches: function () {
			return this._matches;
		},
		
		clear: function () {
			this._matches = [];
			return this;
		},
		
		add: function (options) {
			if (options instanceof jQuery.rdf.resource &&
					options.type === 'uri') {
				// add to uris array and trigger event
				this.options.uris.push[options];
				this._trigger("urischanged", options, {"method" : "add"});
			} else if (typeof options === 'object') {
				// add annotation (property -> value) to this
				// element.
				// options needs to be in the following format:
				//options = {prop: <property>, object: <object>};
				//, where prop must be of type jQuery.uri and
				// object can either be a 'string', a 'float' or a jQuery.uri
				//TODO: where should we store the annotations?
				//TODO: context? -> special key for added annotations?
			}
		}, 
		
		remove: function (options) {
			if (options instanceof jQuery.rdf.resource &&
					options.type === 'uri') {
			//TODO: untested code!
			jQuery.each(uris, function () {
				if (this === options) {
					//TODO: array slice
					this._trigger("urischanged", options, {"method" : "remove"});
					return;
				}
			});
			} else if (typeof options === 'object') {
				jQuery.Aviate.log("warn", "Aviate.core", "TO IMPLEMENT: remove({prop, object}");
			}
		},
		
		serialize: function () {
			//TODO: store all annotations to the object
			//TODO: use VIE for that??
			jQuery.Aviate.log("warn", "Aviate.core", "TO IMPLEMENT: serialize()");
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

jQuery.Aviate.dsms = [];

jQuery.Aviate.registerDsm = function (dsm) {
	//first check if there is already 
	//a domain-specific mapping with 'id' registered
	var register = true;
	jQuery.each(jQuery.Aviate.dsms, function () {
		//TODO: untested code!
		if (this.id === dsm.id) {
			register = false;
			return;
		}
	});
	if (register) {
		jQuery.Aviate.dsms.push(dsm);
		jQuery.Aviate.log("info", "Aviate.core", "Registered DSM '" + dsm.id + "'");
	} else {
		jQuery.Aviate.log("warn", "Aviate.core", "Did not register DSM, as there is" +
				"already a DSM with the same id registered.");
	}
}

jQuery.Aviate.unregisterDsm = function (dsm) {
	jQuery.each(jQuery.Aviate.dsms, function () {
		//TODO: untested code!
		if (this.id === dsm.id) {
			//TODO: array slice
			jQuery.Aviate.log("info", "Aviate.core", "De-registered DSM '" + dsm + "'");
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