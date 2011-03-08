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

Dsf = function(id, options) {

	this.id = id;
	this.options = options;
	
	$.Aviate.registerDsf(this);
};

Dsf.prototype.filter = function (aviate, context, oldMatches) {
	var entities = [];
	var that = this;
	
	jQuery.each(context, function (connId, rdf) {
		rdf
		.where('?subject' + ' ' +
				that.options.mapping.type[connId].type + ' ' + 
				that.options.mapping.type[connId].value)
		.each(function () {
			var entity = {};
			var subject = this.subject;
			var triples = rdf.databank.subjectIndex[subject];
			jQuery.each(that.options.mapping, function (key, val) {
				//TODO: key === '*'
				if (key !== 'type') {
					entity[key] = [];
					if (val[connId]) {
						var prop = jQuery.rdf.resource(val[connId], { namespaces: rdf.databank.namespaces });
						jQuery.each(triples, function () {
							if (this.property === prop) {
								entity[key].push(this.object);
							}
						});
						if (entity[key].length === 0) {
							//get it from another connector!
							var queryResult = aviate.query(subject, [prop]);
							if (queryResult[prop]) {
								jQuery.extend(entity[key], queryResult[prop]);
							}
						}
					}
				}
			});
			entities.push(entity);
		});
		
	});
	
	return entities;
};