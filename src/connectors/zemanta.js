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

var zemantaConnector = new Connector('zemanta', {
	"proxy_url" : "../../utils/proxy/proxy.php",
	"zemanta_url" : "http://api.zemanta.com/services/rest/0.0/",
	"api_key" : ""
});

zemantaConnector.analyze = function (object, callback) {
	jQuery.Aviate.log("warn", "Aviate.Connector(" + this.id + ")", "TO BE IMPLEMENTED: analyze()!");
};