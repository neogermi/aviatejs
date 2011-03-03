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

var personsDsm = new Dsm('persons');

personsDsm.connectorMappers = {};

personsDsm.query = function (context, matches) {
	var persons = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = personsDsm.connectorMappers[connectorId];
		if (mapper) {
			//TODO: check for duplicates (URI)
			jQuery.merge(persons, mapper(rdf, matches));
		}
	});

	return persons;
};

personsDsm.connectorMappers['rdfa'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Person>')
	.where('?subject <http://rdf.data-vocabulary.org/#affiliation> ?affiliation')
	.where('?subject <http://rdf.data-vocabulary.org/#firstname> ?name')
	.where('?subject <http://rdf.data-vocabulary.org/#mbox> ?email')
	.each (function () {
		var person =  {
				uri : this.subject,
				name : this.name.toString(),
				affiliation : this.affiliation,
				email : this.email.toString()
		};
		ret.push(person);
	});
    
	return ret;	
};

personsDsm.connectorMappers['stanbol'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject <http://purl.org/dc/terms/type> <http://dbpedia.org/ontology/Person>')
	.where('?subject <http://fise.iks-project.eu/ontology/selected-text> ?name')
	.where('?subject <http://fise.iks-project.eu/ontology/confidence> ?confidence')
    .each (function () {
		var person =  {
				uri : this.subject,
				name : this.name.toString(),
				affiliation : undefined,
				email : undefined,
				confidence: this.confidence.toString()
		};
		ret.push(person);
	});
    
	return ret;	
};