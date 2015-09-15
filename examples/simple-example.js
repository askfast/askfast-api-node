var http = require('http');
var AskFast = require('../lib/').RestClient;

var client = new AskFast();
client.sendSMSMessage({
	to:'+31652122985',
	from: 'Sven',
	text : 'Test van ASKFast'
}).then(function(res){
	console.log("Send message with result: ",res);
})
