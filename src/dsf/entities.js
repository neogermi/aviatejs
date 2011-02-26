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
 * @fileOverview Semantic Interaction Framework - Entities
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
SIF.Dsfs.entities = new SIF.Dsf('sif.dsf.entities');

SIF.Dsfs.entities.options = {};

SIF.Dsfs.entities.connectorMappers = {};

SIF.Dsfs.entities.init = function () {
};

/**
 * Retrieve all entities from a {@link SIF.Smartobject}.
 * An entity has all properties in it.
 * @example
 * var entity = 
 * {
 * 	...
 * }
 * @return {Object}
 */

SIF.Smartobject.prototype.entities = function () {
	var copy = this.copy();
	copy.matches = [];
	for (var connectorId in SIF.ConnectorManager.connectors) {
		var mapper = SIF.Dsfs.entities.connectorMappers[connectorId];

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
 * Returns an array of entities.
 */
SIF.Dsfs.entities.connectorMappers['sif.connector.Rdfa'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject ?p ?o')
	.each (function () {
		var entity =  {
				uri : this.subject,
				property : this.p,
				object : this.o
		};
		ret.push(entity);
	});
    
	return ret;	
}

SIF.Dsfs.entities.connectorMappers['sif.connector.Stanbol'] = function (rdf, matches) {
    var ret = [];

    rdf
    .where('?subject ?p ?o')
	.each (function () {
		var entity =  {
				uri : this.subject,
				property : this.p,
				object : this.o
		};
		ret.push(entity);
	});
    
	return ret;
}