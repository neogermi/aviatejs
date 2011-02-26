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
 * @fileOverview Semantic Interaction Framework - DSF - Companies
 * @author <a href="mailto:sebastian.germesin@dfki.de">Sebastian Germesin</a>
 * @copyright (c) 2011 IKS Project
 * @copyright (c) 2011 GENTICS Software GmbH, Vienna
 * @copyright (c) 2011 evo42 communications Ltd.
 * @license Apache License, Version 2.0 (LICENSE.txt)
 * @version 1.0
 */

if ( !SIF.Dsfs ) SIF.Dsfs = {};

/**
 * register the dsf with a unique name
 */
SIF.Dsfs.companies = new SIF.Dsf('sif.dsf.companies');

SIF.Dsfs.companies.options = {};

SIF.Dsfs.companies.connectorMappers = {};

SIF.Dsfs.companies.init = function () {
};

/**
 * Retrieves and !filters! all companies from a {@link SIF.Smartobject}.
 * A company has a name, latitude, longitude, url.
 * @example
 * var company = 
 * {
 *   uri       : jQuery.uri("..."),
 *   name      : "DFKI GmbH",
 *   latitude  : "49.23485",
 *   longitude : "6.994402",
 *   url       : "http://www.dfki.de"
 * }
 * @return {Object}
 */
SIF.Smartobject.prototype.companies = function () {
	var copy = this.copy();
	copy.matches = [];
	for (var connectorId in SIF.ConnectorManager.connectors) {
		var mapper = SIF.Dsfs.companies.connectorMappers[connectorId];

		if (mapper) {
			var rdf = copy.getContext().rdf[connectorId];
			if (rdf) {
				copy.matches = SIF.Utils.concatDistinct(copy.matches, mapper(rdf, this.matches));
			}
		}
	}
	return copy;
}

/**
 * Returns an array of companies.
 */
SIF.Dsfs.companies.connectorMappers['sif.connector.Rdfa'] = function (rdf, matches) {
    var ret = [];

    rdf
	.where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Organization>')
	.where('?subject <http://rdf.data-vocabulary.org/#name> ?name')
	.optional('?subject <http://rdf.data-vocabulary.org/#url> ?url')
	.optional('?subject <http://rdf.data-vocabulary.org/#latitude> ?latitude')
	.optional('?subject <http://rdf.data-vocabulary.org/#longitude> ?longitude')
	.each (function () {
		var company =  {
				uri : this.subject,
				name : this.name.toString(),
				url : (this.url)? this.url.toString() : undefined,
				latitude : (this.latitude)? this.latitude.toString() : undefined,
				longitude : (this.longitude)? this.longitude.toString() : undefined
		};
		ret.push(company);
	});
    
	return ret;	
}

/**
 * Returns an array of companies.
 */
SIF.Dsfs.companies.connectorMappers['sif.connector.Stanbol'] = function (rdf, matches) {
    var ret = [];

    rdf
	.where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.opengis.net/gml/_Feature>')
	.where('?subject ?p ?o')
	.where('?subject <http://www.w3.org/2000/01/rdf-schema#label> ?name')
	.where('?subject <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long')
	.where('?subject <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat')
	.where('?subject <http://www.w3.org/2000/01/rdf-schema#comment> ?comment')
	.each (function () {
		var company = {
				uri : this.subject,
				name : this.name.toString().replace(/"/g, ''),
				url : (this.url)? this.url.toString().replace(/"/g, '') : undefined,
				latitude : (this.lat)? parseFloat(this.lat.toString().replace(/"/g, '')) : undefined,
				longitude : (this.long)? parseFloat(this.long.toString().replace(/"/g, '')) : undefined,
			    comment : (this.comment)? this.comment.toString().replace(/"/g, '') : undefined
		};
	});
    
	return ret;	
}