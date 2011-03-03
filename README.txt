AviateJS is a small jQuery based library to enable web developers to use 
semantics on their webpages as they'd like to do it. By combining the power
of rdfQuery, multiple semantic lifting engines (Apache Stanbol, Zemanta, 
RDFa Parsing)and by providing jQuery-like syntax features (e.g., chaining,
$-notation, selectors, ...) the AviateJS framework makes it easier for web
developers to bring semantic technologies in their webpage.
AviateJS - Makes semantics fly into your content ;)

Download it from Github!

Tutorial:

Please add this into the header of your webpage:

<!-- dependencies: jQuery, jQueryUI, rdfQuery -->
<script type="text/javascript" src=".../jquery-1.4.4.min.js"></script>
<script type="text/javascript" src=".../jqueryui-widget.js"></script>
<script type="text/javascript" src=".../jquery.rdfquery.all.minimized.js"></script>

<!-- The core AviateJS framework -->
<script type="text/javascript" src=".../aviate.min.js"></script>
<!-- The connectors you'd like to use -->
<script type="text/javascript" src=".../connectors/rdfa.js"></script>
<script type="text/javascript" src=".../connectors/stanbol.js"></script>
<script type="text/javascript" src=".../connectors/zemanta.js"></script>
<!-- The domain-specific ontology mappings -->
<script type="text/javascript" src=".../dsm/persons.js"></script>
<script type="text/javascript" src=".../dsm/companies.js"></script>
<script type="text/javascript" src=".../dsm/employees.js"></script>
<script type="text/javascript" src=".../dsm/places.js"></script>

Now, here is what you get for these 11 lines of code :) Imagine that there
is a huge <div> element in the current webpage that has the id 'wrapper'.
Now, we can use the given connectors to let the contained text be analysed
and can then retrieve the found entities by the provided domain-specific
functionalities.

<script type="text/javascript">

      $(function() {
         var x = jQuery('#wrapper')
             .aviate() // allocate object
             .aviate('analyze', false); 
             //analyze object with registered connectors 
             //(false => synchronous execution, 
             // true => asynchronous execution -> see Events)

         //query for all persons (an array of objects)
         var persons = x.aviate('query', 'persons').aviate('matches');

         //query for all companies (an array of objects)
         var companies = x.aviate('clear').aviate('query', 'companies').aviate('matches');

         //query for all employees of the companies that we just retrieved
         var employees = x.aviate('query', 'employees').aviate('matches');

         //query for all places
         var places = x.aviate('clear').aviate('query', 'places').aviate('matches');
     });
</script>
Depending on the used DSM, each object, e.g., person has different attributes.
To display all names of all found persons, just do this:

$('<div id=names>').appendTo($('body'));

$.each(persons, function () {
    $('#names').append($('<div class="name">').text(this.name));
};

Using ontologies and semantic databases can be soo easy ;)

Events:

TODO...