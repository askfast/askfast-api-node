
var DialogRequest = function() {

  this.address;
  this.addressList;
  this.addressMap;
  this.addressCcMap;
  this.addressBccMap;
  this.senderName;
  this.subject;
  this.url;
  this.adapterType;
  this.adapterID;
}

var DialogRequest = function(address, url, adapterType, adapterID) {

  this.address = address;
  this.addressList;
  this.addressMap;
  this.addressCcMap;
  this.addressBccMap;
  this.senderName;
  this.subject;
  this.url = url;
  this.adapterType = adapterType;
  this.adapterID = adapterID;
}

var DialogRequest = function(address, url, subject, adapterType, adapterID) {
  this.address = address;
  this.addressList;
  this.addressMap;
  this.addressCcMap;
  this.addressBccMap;
  this.senderName;
  this.subject = subject;
  this.url = url;
  this.adapterType = adapterType;
  this.adapterID = adapterID;
}

module.exports = DialogRequest;
