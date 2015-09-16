var http = require('http'),
    url = require('url'),
    AskFast = require('../lib/').Dialog;

var server = http.createServer(function (request, response) {

    // Create a new instance of the AskFast object.
    var askfast = new AskFast(request);
    var query = url.parse(request.url,true).query;
    
    if(query.function=="result") {
        var answer = query.answer;
        var say = "OK thanks!";
        if(answer==2) {
            say = "That's to bad, try it yourself!";
        }
        askfast.say(say);
    } else {
        askfast.ask("How do like this example?");
        askfast.addAnswer("yes", "?function=result&answer=1");
        askfast.addAnswer("no", "?function=result&answer=2");
    }
    // Render out the JSON for AskFast to consume.
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(askfast.finalize());

}).listen(8000); // Listen on port 8000 for requests
