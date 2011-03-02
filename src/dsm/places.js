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
 * @fileOverview Semantic Interaction Framework - DSM - Places
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

var placesDsm = new Dsm('places');

placesDsm.connectorMappers = {};

placesDsm.query = function (context, matches) {
	var places = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = placesDsm.connectorMappers[connectorId];
		if (mapper) {
			jQuery.merge(places, mapper(rdf, matches));
		}
	});

	return places;
};

placesDsm.connectorMappers['rdfa'] = function (rdf) {
	 var ret = [];
	 rdf
	.where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Address>')
	.where('?subject <http://rdf.data-vocabulary.org/#locality> ?name')
	.each (function () {
		var place =  {
				uri : this.subject,
				name : this.name.toString().replace(/"/g, '')
		};
		ret.push(place);
	});

	return ret;
};

placesDsm.connectorMappers['stanbol'] = function (rdf, matches) {
    var ret = [];
    
    rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://dbpedia.org/ontology/Place>')
    .where('?subject <http://www.w3.org/2000/01/rdf-schema#label> ?name')
	.optional('?subject <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long')
	.optional('?subject <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat')
	.optional('?subject <http://dbpedia.org/ontology/postalCode> ?pc')
	.each (function () {
		var place = {
				uri : this.subject,
				name : this.name.toString().replace(/"/g, ''),
				latitude : (this.lat)? parseFloat(this.lat.toString().replace(/"/g, '')) : undefined,
				longitude : (this.long)? parseFloat(this.long.toString().replace(/"/g, '')) : undefined,
				postalCode : (this.pc)? this.pc.toString().replace(/"/g, '') : undefined,
		};
		ret.push(place);
	});
    
	return ret;	
};