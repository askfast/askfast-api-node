ASK Fast node API
===

Send Email, sms and start calls right form your node.js app, with the simple ASK Fast API

## how to use:

1. Create free ASK Fast account at portal.ask-fast.com
        
2. install package

        npm install 

3. Send sms message

        var askfast = new AskFast()
        askfast.sendSMSMessage({
            to: '0031612345678',
            from: 'ASK Fast',
            body: 'This is a test message from ASK Fast
        }).then(function(result){
            console.log
        })

To send email use: 

        askfast.sendEMAILMessage()

To start a call use:

        askfast.startCALL()

## Create dialog

ASK Fast provides you the posibilty to create more complex dialogs with two way functionality. Below shows an example for a two way dialog which can be used with `sendSMSMessage` , `sendEMAILMessage` and `startCALL` functions.

The basic principle is very easy:
    
1. Create a publicy accesable server
2. Create a dialog
3. Initiate the dialog


    var Askfast = require('askfast')
    var server = http.createServer(function (request, response) {
    
        // Create a new instance of the object.
        var dialog = new AskFast()  ;
        dialog.say("Hello, World!");
        
        // Render out the JSON for consume.
	    response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(dialog.finalize());

    }).listen(8000);
        
## initiate custom dialog via HTTP

        send http request (does not have to be node)
        var http = require(http)
        var options = {
            host : 'http://api.ask-fast.com',
            path : '/dialog',
            method : 'POST'
        }
        var dialog = {
            
        }
        req = http(options,dialog,function(err,data){
        
        })