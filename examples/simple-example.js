var http = require('http');
var AskFast = require('../');

var askfast = new AskFast('xxxx','xxxx');
	askfast.sendSMSMessage({
		to:'xxxxxxxxxxx',
		from: 'Ask fast',
		text : 'this is a test'
	})

var server = http.createServer(function (request, response) {
	// Create a new instance of the object.

	// Render out the JSON for consume.
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end('ahllo');

}).listen(8000); // Listen on port 8000 for requests.
