var http = require('http');
var AskFast = require('askfast');

var server = http.createServer(function (request, response) {

	// Create a new instance of the object.
	var askfast = new AskFast();
	askfast.say("Hello, World!");

	// Render out the JSON for consume.
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(askfast.finalize());

}).listen(8000); // Listen on port 8000 for requests.
