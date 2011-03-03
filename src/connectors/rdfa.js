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


var rdfaConnector = new Connector('rdfa');

rdfaConnector.analyze = function (object, callback) {
	if (object == undefined) {
		jQuery.Aviate.log ("warn", "Aviate.Connector('" + this.id + "')", "Given object is undefined!");
		return;
	} else if (typeof object === 'object') {
		//does only work on objects that have the 'typeof' attribute set!
		if (object.attr('typeof')) {
			//use rdfQuery to analyze the object
			var rdf = jQuery( object ).rdfa();
			callback(rdf);
		} else {
			jQuery.Aviate.log("info", "Aviate.Connector(" + this.id + ")", "Object has no 'typeof' attribute! Trying to find children.");
			var rdf = jQuery.rdf();
			object.find('[typeof]').each(function(i, e) {

				var rdfa = jQuery(e).rdfa();
				$.each(rdfa.databank.triples(), function () {
					rdf.add(this);
				});
				//merging the results into the main object
				rdfa.databank.triples().each(function () {
					rdf.add(this);
				});
			});
			callback(rdf);
		}
	} else {
		jQuery.Aviate.log("error", "Aviate.Connector(" + this.id + ")", "Expected object, found: '" + (typeof object) + "'");
	}
};