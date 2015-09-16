ASK Fast node API
===

Send Email, sms and start calls right form your node.js app, with the simple ASK Fast API

## how to use:

1. Create free ASK Fast account at portal.ask-fast.com
        
2. install package

        npm install askfast

3. Send sms message

        var RestClient = require('askfast').RestClient;

        var askfast = new RestClient()
        askfast.sendSMSMessage('+31612345678', 'text://This is a test message from ASK Fast'}).then(function(result){
            console.log(result)
        })

To send email use: 

        askfast.sendEMAILMessage()

To start a call use:

        askfast.startCall('+31612345678', 'http://api.ask-fast.com/question/comment?message=This is a test message from ASK Fast')

## Create dialog

ASK Fast provides you the posibility to create more complex dialogs with two way functionality. Below shows an example for a two way dialog which can be used with `sendSMSMessage` , `sendEMAILMessage` and `startCALL` functions.

The basic principle is very easy:
    
1. Create a publicly accessible server
2. Create a dialog
3. Initiate the dialog


    var Dialog = require('askfast').Dialog;
    var server = http.createServer(function (request, response) {
    
        // Create a new instance of the object.
        var dialog = new Dialog()  ;
        dialog.say("Hello, World!");
        
        // Render out the JSON for consume.
	    response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(dialog.finalize());

    }).listen(8000);