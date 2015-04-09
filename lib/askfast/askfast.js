var dialog = require('../dialog/dialog'),
    http = require('http')
AskFastRestClient = require('./restApi')

var AskFast = function(key, sec) {
    this.key
    this.sec
    this.rest = new AskFastRestClient(key, sec)
}

AskFast.prototype.sendSMSMessage = function(message) {
    newMes = message
    if (!message.text.indexOf('http') == 0)
        newMes.text = 'text://' + message.text
    newMes.type = 'sms'
    this.rest.startDialog(newMes).then(function(data) {
        console.log(data)
    })
}

AskFast.prototype.sendEMAILMessage = function(message) {
    newMes = message
    if (!message.text.indexOf('http') == 0)
        newMes.text = 'text://' + message.text
    newMes.type = 'email'
    this.rest.startDialog(newMes).then(function(data) {
        console.log(data)
    })
}

AskFast.prototype.startCall = function(message) {
    newMes = message
    if (!message.text.indexOf('http') == 0)
        newMes.text = 'text://' + message.text
    newMes.type = 'call'
    this.rest.startDialog(newMes).then(function(data) {
        console.log(data)
    })
}

AskFast.prototype.getAdapters = function() {

    this.rest.getAdapters().then(function(data) {
        console.log(data)
    })
}

AskFast.prototype.dialog = function() {
    return new dialog()
}

module.exports = AskFast;