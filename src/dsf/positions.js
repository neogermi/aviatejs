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

var positionsDsf = new Dsf('positions');

positionsDsf.connectorMappers = {};

positionsDsf.filter = function (context, oldMatches) {
	var positions = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = positionsDsf.connectorMappers[connectorId];
		if (mapper) {
			jQuery.merge(positions, mapper(rdf, oldMatches));
		}
	});

	return positions;
};

positionsDsf.connectorMappers['rdfa'] = function (rdf, matches) {
	var ret = [];
	
	rdf
	.where('?subject <http://rdf.data-vocabulary.org/#latitude> ?latitude')
	.where('?subject <http://rdf.data-vocabulary.org/#longitude> ?longitude')
	.each (function () {
		var position =  {
				uri : this.subject,
				latitude : parseFloat(this.latitude.toString().replace(/"/g, '')),
				longitude : parseFloat(this.longitude.toString().replace(/"/g, ''))
		};
		ret.push(position);
	});
	
	return ret;
};