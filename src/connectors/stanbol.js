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

if ( !SIF.Connectors ) SIF.Connectors = {};

/**
 * register the connector with a unique name
 */
SIF.Connectors.stanbol = new SIF.Connector('sif.connector.Stanbol');

SIF.Connectors.stanbol.options = {
		"stanbol_enhancer_url" : "http://stanbol.demo.nuxeo.com/engines/",
		"stanbol_entityhub_url" : "http://stanbol.demo.nuxeo.com/entityhub/",
		"dataType" : "application/rdf+json"
};

SIF.Connectors.stanbol.init = function () {
	//TODO: what needs to be initialized for stanbol?
}

SIF.Connectors.stanbol.analyze = function (obj, success, error) {
	if (obj == undefined) {
		SIF.log ("warn", "SIF.Connectors.stanbol#analyze", "Undefined object!");
		return;
	}
	
	var text = extractText(obj);
	if (text.length == 0) {
		SIF.log ("warn", "SIF.Connectors.stanbol#analyze", "Could not extract text from object!");
		return
	}
	
	var enhancerOutput = queryEnhancer(text);
	if (enhancerOutput.status == 200) {
		var responseObj = jQuery.parseJSON(enhancerOutput.responseText);
		var rdf = parseEnhancerOutput(responseObj);
		var rdf2 = fillWithEntityHubInfo(rdf);
		success(rdf, this);
	} else {
		error("Could not extract information from enhancer!");
	}
}

queryEnhancer = function (text) {
	if (SIF.options.proxy_url) {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: SIF.options.proxy_url,
			data: {
    			proxy_url: SIF.Connectors.stanbol.options.stanbol_enhancer_url, 
    			content: text,
    			verb: "POST",
    			format: SIF.Connectors.stanbol.options.dataType
			}
		});
	} else {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: SIF.Connectors.stanbol.options.stanbol_enhancer_url, 
			data: text,
			dataType: SIF.Connectors.stanbol.options.dataType
		});
	}
}

queryEntityHub = function (uri) {
	if (SIF.options.proxy_url) {
		return jQuery.ajax({
			async: false,
			type: "POST",
			url: SIF.options.proxy_url,
			data: {
    			proxy_url: SIF.Connectors.stanbol.options.stanbol_entityhub_url + "sites/entity?id=" + uri, 
    			content: "",
    			verb: "GET",
    			format: "application/rdf+json"
			}
		});
	} else {
		return jQuery.ajax({
			async: false,
			type: "GET",
			url: SIF.Connectors.stanbol.options.stanbol_entityhub_url + "sites/entity?id=" + uri,
			data: text,
			dataType: SIF.Connectors.stanbol.options.dataType
		});
	}
}

extractText = function (obj) {
	if (obj.get(0).tagName && obj.get(0).tagName == 'TEXTAREA') {
		return obj.val();
	} else if (obj.html) {
		return obj.html();
	} else {
		return "";
	}
}

parseEnhancerOutput = function (data) {
	return jQuery.rdf().load(data, {});
}

fillWithEntityHubInfo = function (rdf) {
	jQuery.each(rdf.databank.objectIndex, function (uri) {
		var uriStr = uri.toString().replace(/"/g, '').replace(/</, '').replace(/>/, '');
		var result = queryEntityHub(uriStr);
		if (result.status == 200) {
			var resultText = result.responseText;
			var resultObj = jQuery.parseJSON(resultText);
			rdf.load(resultObj);
		};
	});
	return rdf;
}
