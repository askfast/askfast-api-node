var Promise = require('bluebird');
var util = require('util');
var RestClient = require('./restclient');
var qs = require('querystring');
var DialogRequest = require('./model/dialogRequest.js')

var AskFastRestClient = function(accountId, key, accessToken, options) {

    var options = options || {};

    AskFastRestClient.super_.call(this, accountId, key, accessToken, options.host, options.timeout);
}

util.inherits(AskFastRestClient, RestClient);

AskFastRestClient.prototype.getAccountInfo = function() {
    var options = {
        url: "/info",
        method: "GET"
    }
    return this.request(options);
}

AskFastRestClient.prototype.getRecordings = function() {
    var options = {
        url: "/account/" + this.accountId + "/recording",
        method: "GET"
    }
    return this.request(options);
}

AskFastRestClient.prototype.getDDRs = function(adapterId, type, start, end, offset, limit) {
    var params = {};
    if(adapterId!=null) {
        params.adapterId = adapterId;
    }
    if(type!=null) {
        params.typeId = type;
    }
    if(start!=null) {
        params.startTime = start;
    }
    if(end!=null) {
        params.endTime = end;
    }
    if(offset!=null) {
        params.offset = offset;
    }
    if(limit!=null) {
        params.limit = limit;
    }
    var url = "/ddr" + (qs.stringify(params)=="" ? "" : "?" + qs.stringify(params));

    var options = {
        url: url,
        method: "GET"
    }
    return this.request(options);
}

AskFastRestClient.prototype.startDialog = function(dialogRequest) {

    var options = {
        url: "/startDialog",
        method: "POST",
        body: dialogRequest
    }
    return this.request(options);
}

AskFastRestClient.prototype.sendSMSMessage = function(address, url, adapterId) {

    var adapterType;
    if (adapterId == null) {
        adapterType = "sms";
    }

    return this.startDialog(new DialogRequest(address, url, adapterType, adapterId));
}

AskFastRestClient.prototype.sendEMAILMessage = function(address, url, subject, adapterId) {
    var adapterType;
    if (adapterId == null) {
        adapterType = "email";
    }
    return this.startDialog(new DialogRequest(address, url, subject, adapterType, adapterId));
}

AskFastRestClient.prototype.startCall = function(address, url, adapterId) {
    var adapterType;
    if (adapterId == null) {
        adapterType = "call";
    }
    return this.startDialog(new DialogRequest(address, url, adapterType, adapterId));
}

module.exports = AskFastRestClient