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

var employeesDsf = new Dsf('employees');

employeesDsf.connectorMappers = {};

employeesDsf.filter = function (context, oldMatches) {
	var employees = [];
	$.each(context, function (connectorId, rdf) {
		var mapper = employeesDsf.connectorMappers[connectorId];
		if (mapper) {
			jQuery.merge(employees, mapper(rdf, oldMatches));
		}
	});

	return employees;
};

employeesDsf.connectorMappers['rdfa'] = function (rdf, matches) {
	var ret = [];
	
	rdf
    .where('?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdf.data-vocabulary.org/#Person>')
	.where('?subject <http://rdf.data-vocabulary.org/#affiliation> ?affiliation')
	.where('?subject <http://rdf.data-vocabulary.org/#firstname> ?name')
	.where('?subject <http://rdf.data-vocabulary.org/#lastname> ?lastname')
	.where('?subject <http://rdf.data-vocabulary.org/#mbox> ?email')
	.filter(function () {
		var affiliation = this.affiliation;
		var contains = false;
		jQuery.each (matches, function () {
			if (this.uri.toString() === affiliation.toString()) {
				//TODO: untested code
				contains = true;
				return;
			}
		});
		return contains;
	})
	.each (function () {
		var employee =  {
				uri : this.subject,
				affiliation : this.affiliation,
				name : this.name.toString(),
				lastname : this.lastname.toString(),
				email: this.email.toString()
		};
		ret.push(employee);
	});
    
	return ret;
};

employeesDsf.connectorMappers['stanbol'] = function (rdf, matches) {
	return [];
};