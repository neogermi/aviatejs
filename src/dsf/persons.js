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

var personsDsf = new Dsf('persons', {
	mapping :  {
		'type' : {
			'rdfa' : {
				'type' : 'rdf:type', 
				'value' : 'google:Person'
			},
			'stanbol' : {
				'type' : '<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>', 
				'value' : '<http://dbpedia.org/ontology/Person>'
			}
		},
		'name' : {
			'rdfa' : 'google:name',
			'stanbol' : '<http://www.w3.org/2000/01/rdf-schema#label>'
		},
		'depiction' : {
			'stanbol' : 'foaf:depiction'
		},
		'email' : {
			'rdfa' : 'google:mbox'
		},
		'affiliation' : {
			'rdfa' : 'google:affiliation'
		}
	}
});