$(document).ready(function(){var n={rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",xsd:"http://www.w3.org/2001/XMLSchema#",dc:"http://purl.org/dc/elements/1.1/",foaf:"http://xmlns.com/foaf/0.1/",vcard:"http://www.w3.org/2006/vcard/ns#",biografr:"http://biografr.com/ontology#"},i={"<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>":{type:"relation",aliases:["a","kind of"]},"<http://www.w3.org/2000/01/rdf-schema#label>":{type:"property",aliases:["aka",
"also known as"]},"<http://xmlns.com/foaf/0.1/Person>":{type:"class",aliases:["person"]},"<http://xmlns.com/foaf/0.1/firstName>":{type:"property",aliases:["first name","forename"]},"<http://xmlns.com/foaf/0.1/givenname>":{type:"property",aliases:["middle name"]},"<http://xmlns.com/foaf/0.1/surname>":{type:"property",aliases:["surname","last name"]},"<http://www.w3.org/2006/vcard/ns#Address>":{type:"class",aliases:["place","address"]},"<http://www.w3.org/2006/vcard/ns#street-address>":{type:"property",
aliases:["house","street"]},"<http://www.w3.org/2006/vcard/ns#locality>":{type:"property",aliases:["town","city"]},"<http://www.w3.org/2006/vcard/ns#region>":{type:"property",aliases:["county","area"]},"<http://www.w3.org/2006/vcard/ns#country>":{type:"property",aliases:["country"]},"<http://biografr.com/ontology#hasBirthPlace>":{type:"relation",range:"<http://www.w3.org/2006/vcard/ns#Address>",aliases:["born in","birth place","born"]},"<http://biografr.com/ontology#bornOn>":{type:"property",range:"<http://www.w3.org/2001/XMLSchema#date>",
aliases:["birth date","date of birth","born on","born"]},"<http://biografr.com/ontology#gender>":{type:"property",aliases:["gender","sex"]},"<http://biografr.com/ontology#hasGrandparent>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["grandparent"]},"<http://biografr.com/ontology#hasGrandmother>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["grandmother","grandma","nan","granny"]},"<http://biografr.com/ontology#hasGrandfather>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",
aliases:["grandfather","grandpa"]},"<http://biografr.com/ontology#hasGrandchild>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["grandchild"]},"<http://biografr.com/ontology#hasGrandson>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["grandson"]},"<http://biografr.com/ontology#hasGranddaughter>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["granddaughter"]},"<http://biografr.com/ontology#hasParent>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",
aliases:["parent"]},"<http://biografr.com/ontology#hasFather>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["father","dad"]},"<http://biografr.com/ontology#hasMother>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["mother","mum"]},"<http://biografr.com/ontology#hasChild>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["child"]},"<http://biografr.com/ontology#hasSon>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["son"]},
"<http://biografr.com/ontology#hasDaughter>":{type:"relation",range:"<http://xmlns.com/foaf/0.1/Person>",aliases:["daughter"]}},t=$.rdf.ruleset().prefix("foaf",n.foaf).prefix("biografr",n.biografr).add("?child biografr:hasFather ?father",["?child a foaf:Person","?father a foaf:Person","?child biografr:hasParent ?father","?father biografr:hasChild ?child",'?father biografr:gender "male"']).add("?child biografr:hasMother ?mother",["?child a foaf:Person","?mother a foaf:Person","?child biografr:hasParent ?mother",
"?mother biografr:hasChild ?child",'?mother biografr:gender "female"']).add(["?gchild biografr:hasParent ?parent","?parent biografr:hasParent ?gparent"],["?gchild a foaf:Person","?gparent a foaf:Person","?gchild biografr:hasGrandparent ?gparent","?gparent biografr:hasGrandchild ?gchild"]).add(["?parent biografr:hasChild ?child",'?child biografr:gender "male"'],["?parent a foaf:Person","?child a foaf:Person","?parent biografr:hasSon ?child"]).add(["?parent biografr:hasChild ?child",'?child biografr:gender "female"'],
["?parent a foaf:Person","?child a foaf:Person","?parent biografr:hasDaughter ?child"]).add("?parent biografr:hasSon ?child",["?parent a foaf:Person","?child a foaf:Person","?parent biografr:hasChild ?child",'?child biografr:gender "male"']).add("?parent biografr:hasDaughter ?child",["?parent a foaf:Person","?child a foaf:Person","?parent biografr:hasChild ?child",'?child biografr:gender "female"']).add(["?gparent biografr:hasGrandchild ?gchild",'?gchild biografr:gender "male"'],["?gparent a foaf:Person",
"?gchild a foaf:Person","?gparent biografr:hasGrandson ?gchild"]).add(["?gparent biografr:hasGrandchild ?gchild",'?gchild biografr:gender "female"'],["?gparent a foaf:Person","?gchild a foaf:Person","?gparent biografr:hasGranddaughter ?gchild"]).add("?gparent biografr:hasGrandson ?gchild",["?gparent a foaf:Person","?gchild a foaf:Person","?gparent biografr:hasGrandchild ?gchild",'?gchild biografr:gender "male"']).add("?gparent biografr:hasGranddaughter ?gchild",["?gparent a foaf:Person","?gchild a foaf:Person",
"?gparent biografr:hasGrandchild ?gchild",'?gchild biografr:gender "female"']).add(["?gchild biografr:hasGrandparent ?gparent",'?gparent biografr:gender "male"'],["?gparent a foaf:Person","?gchild a foaf:Person","?gchild biografr:hasGrandfather ?gparent"]).add(["?gchild biografr:hasGrandparent ?gparent",'?gparent biografr:gender "female"'],["?gparent a foaf:Person","?gchild a foaf:Person","?gchild biografr:hasGrandmother ?gparent"]).add("?gchild biografr:hasGrandfather ?gparent",["?gparent a foaf:Person",
"?gchild a foaf:Person","?gchild biografr:hasGrandparent ?gparent",'?gparent biografr:gender "male"']).add("?gchild biografr:hasGrandmother ?gparent",["?gparent a foaf:Person","?gchild a foaf:Person","?gchild biografr:hasGrandparent ?gparent",'?gparent biografr:gender "female"']),o=$("#content").rdf().reason(t),z=/^\s*(.*\S)(?:'s|\s+(?:was|is|are|were))\s+an?\s+(\S.*\S)\.?\s*$/,A=/^\s*(.*\S)\s+(?:is|was|are|were)\s+(?:(?:the|a)\s+)?(\S.*\s+(?:on|in|of|at|as|to|from|for))\s+(\S.*\S)\.?\s*$/,B=/^\s*(.*\S)'s\s+(\S.*\S)\s+(?:is|was|are|were)\s+(\S.*\S)\.?\s*$/,
C=/^\s*(.*\S)\s+(?:is|was|are|were)\s+(\S.*\S)'s\s+(\S.*\S)\.?\s*$/,D=/^\s*What\s+(?:was|is|are|were)\s+(\S(?:[^'?]|'[^s])*)\??$/,E=/^\s*(?:Who|Where|What|When|Which)\s+(?:was|is|are|were)\s+(\S.*\S)'s\s+(?:(\S.*\S)s|(\S.*[^\s?]))\??$/,F=/^\s*(?:Who|Where|What|When|Which)\s+(\S.*\S)\s+(?:was|is|are|were)\s+(\S.*\S)\s+(?:on|in|of|at|as|to|from|for)\??$/,G=/^\s*(?:Who|Where|When)\s+(?:was|is|are|were)\s+(\S.*\S)\s+([^\s?]+)\??$/,j={},u=$("#people ul"),v=$("#places ul"),H=function(d,c){var b=0,e=null,
a=d.contents(),g=-1;if(a.length>0){for(;e===null&&b<a.length;){e=H($(a[b]),c);b+=1}return e}else{if(d[0].nodeValue!==null)g=d[0].nodeValue.indexOf(c);return g===-1?null:{node:d,offset:g}}},w=function(d){var c=null,b,e;e=this.children("span").filter(function(){return $(this).text()===d}).get(0);if(e===undefined){if(window.getSelection){c=H(this,d);if(c!==null){b=document.createRange();b.setStart(c.node[0],c.offset);b.setEnd(c.node[0],c.offset+d.length);c=window.getSelection();c.removeAllRanges();c.addRange(b)}}else if(document.selection){b=
document.body.createTextRange();b.moveToElementText(this[0]);b.findText(d);b.select()}if(b!==undefined)if(b.surroundContents){e=document.createElement("span");b.surroundContents(e)}else{b.pasteHTML('<span id="tempSpan">'+d+"</span>");e=$("#tempSpan");e.id=undefined}}if(e===undefined)return this.is("#content")?undefined:w.call($("#content"),d);else{e=$(e);e.parent().attr("property")!==undefined&&e.parent().attr("datatype","");return e}},m=function(d,c){c=c||o;var b=c.prefix("rdfs",n.rdfs).where(d+
" rdfs:label ?label");return b.length>0?b.get(0).label.value:d.value.fragment},x=function(d){var c;c=j[d]&&j[d][0];if(c===undefined){c=d.match(/[a-z][a-z0-9]*/ig).join("");c=$.rdf.resource("<#"+c+">")}return $.rdf.triple(c,$.rdf.label,$.rdf.literal('"'+d+'"'))},p=function(d){return d.type==="uri"?i[d]?i[d].aliases[0]:m(d):d.type==="bnode"?m(d):d.value},l={field:$("#statement"),error:$("#error"),val:function(){return this.field.val()},isQuery:function(){return/\?$/.test(this.val())||/^(What|Where|When|Who|Which)\s/.test(this.val())},
validate:function(){var d;if(this.val()===""){this.field.removeClass("error");this.error.text("")}else{d=this.triples();if(typeof this.triples()==="string"){this.field.addClass("error");this.error.text(d)}else{this.field.removeClass("error");this.error.text("")}}},triples:function(){var d,c,b,e,a,g,f,h;a=[];d=[];if(this.isQuery()){if(D.test(this.val())){a=this.val().match(D);c=a[1];e=$.rdf.type}else{if(E.test(this.val())){a=this.val().match(E);c=a[1];b=a[2]||a[3]}else if(F.test(this.val())){a=this.val().match(F);
b=a[1];c=a[2]}else if(G.test(this.val())){a=this.val().match(G);c=a[1];b=a[2]}else return"I don't recognise the format of the question.";a=j[b];if(a===undefined)return"I don't recognise \""+b+'".';else if(a.length===1){e=a[0];if(i[e].type!=="property"&&i[e].type!=="relation")return'"'+b+'" is a '+i[e].type+" and I was expecting a property or relation."}else{if(/^\s*Where/.test(this.val()))f="<http://www.w3.org/2006/vcard/ns#Address>";else if(/^\s*Who/.test(this.val()))f="<http://xmlns.com/foaf/0.1/Person>";
else if(/^\s*When/.test(this.val()))f="<http://www.w3.org/2001/XMLSchema#date>";a=[];for(h=0;h<j[b].length;h+=1){e=j[b][h];g=i[e];if(g!==undefined&&(g.type==="property"||g.type==="relation"))if(f===undefined||g.range===f)a.push(e)}if(a.length===0)a=j[b];if(a.length>1){e="I don't know if you mean ";for(h=0;h<a.length;h+=1){e+=i[a[h]].aliases[0];if(h!==a.length-1)e+=" or "}e+=". Can you rephrase, please?";return e}e=a[0]}}d=o.where("?thing rdfs:label ?label");d=d.filter("label",c);if(d.length>0){c=
d[0].thing;e=$.rdf.pattern(c,e,"?result");return e=o.where(e)}else return"I don't recognise \""+c+'".'}else{if(z.test(this.val())){a=this.val().match(z);c=a[1];f=a[2];e=$.rdf.type}else{if(C.test(this.val())){a=this.val().match(C);f=a[1];c=a[2];b=a[3]}else if(A.test(this.val())||B.test(this.val())){a=this.val().match(A)||this.val().match(B);c=a[1];b=a[2];f=a[3]}else return"I don't recognise the format of the statement. Can you rephrase please?";a=j[b];if(a===undefined)return"I don't recognise \""+
b+'".';else if(a.length===1){e=a[0];if(i[e].type!=="property"&&i[e].type!=="relation")return'"'+b+'" is a '+i[e].type+" and I was expecting a property or relation."}else{a=[];for(h=0;h<j[b].length;h+=1){e=j[b][h];g=i[e];if(g.type==="property"||g.type==="relation")a.push(e)}if(a.length===0)a=j[b];if(a.length>1){e="I don't know if you mean ";for(h=0;h<a.length;h+=1){e+=i[a[h]].aliases[0];if(h!==a.length-1)e+=" or "}e+=". Can you rephrase, please?";return e}}b=x(b);d.push(b)}b=x(c);d.push(b);c=b.subject;
if(i[e]&&i[e].type==="relation"){b=x(f);d.push(b);f=b.subject}else f=$.rdf.literal('"'+f+'"');d.push($.rdf.triple(c,e,f));return $.rdf({triples:d,namespaces:n})}}},r=function(d){var c=$("#"+d.value.fragment),b=c.children("h3").text(),e,a=true;if(c.hasClass("open")){e=c.children("ul");e.empty();o.reset().about(d).each(function(g,f,h){g=this.property;var k=this.value,q=h[0];if(!(g===$.rdf.label&&k.type==="literal"&&k.value===b||g===$.rdf.type&&i[k]!==undefined)){a=false;h=i[g]===undefined?g.value.fragment:
i[g].aliases[0];g=k.type==="literal"?k.value:i[k]!==undefined?i[k].aliases[0]:m(k);f=e.append("<li />").children("li:last").attr("class",typeof q.source==="string"?"auto":"manual");typeof q.source!=="string"&&f.append(' <abbr title="delete">x</abbr>').children("abbr").bind("click",function(){$(q.source).removeRdfa({property:q.property});r(d)});h=f.append("<span />").children("span").html(h+": "+g);k.type==="uri"&&i[k]===undefined&&k.value.fragment!==undefined&&h.attr("class","link").bind("click",
function(){$(this).parent().parent().parent().removeClass("open");$("#"+k.value.fragment).addClass("open");r(k)})}});a&&c.removeClass("open")}},y=function(d,c,b){if(b===undefined)b=m(c);d.append("\n").append("<li />").children("li:last").attr("id",c.value.fragment).append("<h3>"+b+"</h3>").append('<ul class="properties" />').children("h3").bind("click",function(){$(this).parent().toggleClass("open");r(c)})},s=function(d){return $(":type").filter(":about('"+d.value+"')").eq(0)};$("#people h2, #places h2").bind("click",
function(){$(this).parent("li").toggleClass("open")});$.each(i,function(d,c){$.each(c.aliases,function(b,e){if(j[e]===undefined)j[e]=[d];else j[e].push(d)})});(function(){u.empty();v.empty();o.prefix("rdfs",n.rdfs).prefix("foaf",n.foaf).where("?person a foaf:Person").where("?person rdfs:label ?label").each(function(){y(u,this.person,this.label.value)}).reset().where("?place a vcard:Address").where("?place rdfs:label ?label").each(function(){y(v,this.place,this.label.value)})})();$("#answer").dialog({autoOpen:false,
modal:true,minHeight:100,close:function(){$("#statement").select();return true}});$("#statement").bind("keyup",function(){var d=l.val();$("#error").text("");setTimeout(function(){l.val()===d&&l.validate()},1E3);return true});$("#notes").bind("submit",function(d){var c,b;try{c=l.triples();if(typeof c!=="string"){if(l.isQuery()){b=$("#response").text("");b.append('Answering "'+l.val()+'"');b=$("#answer").text("");b.dialog("option","title",l.val());b.dialog("option","width","33%");c.length>0?c.each(function(a){a>
0&&b.append("<br>");if(this.result.type==="uri")if(i[this.result]){a=i[this.result].aliases[0];if(i[this.result].type==="class")b.append(/^aeiou/.test(a)?"an ":"a ")}else a=m(this.result);else a=this.result.type==="bnode"?m(this.result):this.result.value;b.append(a)}):b.append("I don't know");b.dialog("open")}else{b=$("#response").text("");c.reason(t);b.append("OK, I know:");c.where("?thing a ?class").each(function(a,g,f){var h;a=s(this.thing);if(a.length===0){g=m(this.thing,c);a=w.call($("#content"),
g.toString());if(a===undefined)a=$("#meta").append("<span />").children("span:last");a.rdfa(f);if(this["class"]===$.rdf.resource("<http://xmlns.com/foaf/0.1/Person>"))h=u;else if(this["class"]===$.rdf.resource("<http://www.w3.org/2006/vcard/ns#Address>"))h=v;h!==undefined&&$("#"+this.thing.value.fragment).length===0&&y(h,this.thing,g)}}).reset().where("?thing ?prop ?val").filter(function(){return i[this.thing]===undefined}).each(function(a,g,f){a=f[0];g=a.subject;f=a.object;var h;if(a.property===
$.rdf.label)if(j[f.value]===undefined)j[f.value]=[g];else j[f.value].push(g);if(typeof a.source!=="string"){if(f.type==="literal"){h=s(g)||$("#content");f=w.call(h,f.value.toString())}else f=s(f);if(f===undefined||f.length===0)f=s(g);if(f===undefined||f.length===0)f=$("#meta").append("<span></span>").children("span:last");f.rdfa(a)}r(g)}).each(function(){var a=p(this.thing);if(this.prop!==$.rdf.label){b.append("<br>");if(this.val.type==="literal")b.append(a+"'s "+i[this.prop].aliases[0]+" is "+p(this.val));
else this.prop===$.rdf.type?b.append(a+" is a "+p(this.val)):b.append(p(this.val)+" is "+a+"'s "+i[this.prop].aliases[0])}else if(a!==this.val.value){b.append("<br>");b.append(a+" is also known as "+p(this.val))}})}l.field.val("");o=$("#content").rdf().reason(t)}}catch(e){console.log(e);alert("Sorry, you discovered a bug! Please let Jeni know what you did to expose it. (jeni@jenitennison.com)")}d.preventDefault();return true});$("#json").bind("click",function(){var d=$("#content").rdf().databank.dump(),
c=$("#answer");c.dialog("option","title","JSON");c.dialog("option","width","75%");c.text($.toJSON(d));c.dialog("open")});$("#rdfxml").bind("click",function(){var d=$("#content").rdf().databank.dump({format:"application/rdf+xml"}),c=$("#answer"),b;c.dialog("option","title","RDF/XML");c.dialog("option","width","75%");b=new XMLSerializer;c.text(b.serializeToString(d));c.dialog("open")});$("#turtle").bind("click",function(){var d=$("#content").rdf().databank.dump({format:"text/turtle"}),c=$("#answer");
c.dialog("option","title","TURTLE");c.dialog("option","width","75%");c.text(d);c.dialog("open")});$("#statement").select()});
