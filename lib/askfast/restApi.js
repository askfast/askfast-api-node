var Promise = require('bluebird');
var unirest = require('unirest')

var AskFastRestClient = function(key, sec) {
    this.bearer = null
    this.baseUrl = 'http://api.ask-fast.com'
    this.adapters = {}
    this.key = key
    this.sec = sec
}

AskFastRestClient.prototype.getBearer = function() {
    thiz = this
    if (thiz.bearer == null) {
        return new Promise(function(resolve, reject) {
            unirest.post(thiz.baseUrl + '/keyserver/token')
                .send('client_id=' + thiz.key)
                .send('grant_type=refresh_token')
                .send('refresh_token=' + thiz.sec)
                .send("client_secret=none")
                .end(function(data) {
                    thiz.bearer = data.body.acces_token
                    resolve(data.body.access_token)

                })
        })
    } else {
        new Promise(function(resolve, reject) {
            resolve(thiz.bearer)
        })
    }
}

AskFastRestClient.prototype.getAdapters = function() {
    thiz = this
    return new Promise(function(resolve, reject) {
        thiz.getBearer().then(function(data) {
            console.log(data)
            unirest.get(thiz.baseUrl + '/adapter')
                .header('Authorization', 'Bearer ' + data)
                .end(function(data) {
                    resolve(data.body)
                })
        })
    })
}

AskFastRestClient.prototype.startDialog = function(message) {
    thiz = this
    return new Promise(function(resolve, reject) {
        thiz.getBearer().then(function(data) {
            unirest.post(thiz.baseUrl + '/startDialog/outbound')
                .header('Authorization', 'Bearer ' + data)
                .header('Content-Type', 'application/json')
                .send({
                    "method": "outboundCall",
                    "params": {
                        "adapterType": message.type,
                        "address": message.to,
                        "url": message.text,
                        "from" : message.from
                    }
                })
                .end(function(data) {
                    resolve(data.body)
                })
        })
    })
}

module.exports = AskFastRestClient