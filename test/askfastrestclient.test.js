var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  AskFastRestClient = require('../lib/askfast/askfastrestclient.js');

// Enter you credentials
var accountId;
var key;
var accessToken;

describe("AskfastRestClient", function(){
  describe("#getAccessToken()", function(){
    it("should return an access token", function(done){
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getAccessToken().then(function(token){
        assert.isNotNull(token);
        expect(token).to.have.length(32);
        accessToken = token;
        done();
      });
    })

    it("should return the same access code again", function(done){
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getAccessToken().then(function(token){
        assert.equal(accessToken, token);
        done();
      });
    })
  })

  describe("#getAccountInfo()", function(){
    it("should return account info", function(done){
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getAccountInfo().then(function(info){
        assert.isNotNull(info);
        done();
      }, function(err){
        console.log(err);
        assert.isNull(err);
        done();
      });
    })
  })

  describe("#getRecordings()", function(){
    it("should return recordings", function(done){
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getRecordings().then(function(recordings){
        //console.log("Recordings: ",recordings);
        done();
      }, function(err){
        console.log(err);
        assert.isNull(err);
        done();
      });
    })
  })

  describe("#getDdr()", function(){
    it("should return all ddrs", function(done){
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getDDRs().then(function(recordings){
        //console.log("DDRs: ",recordings);
        done();
      }, function(err){
        console.log(err);
        assert.isNull(err);
        done();
      });
    })

    it("should return all ddrs from type inbound", function(done){
      var incomingTypeId = "5390d362e4b02c61014547e4";
      var client = new AskFastRestClient(accountId, key, accessToken);
      client.getDDRs(incomingTypeId).then(function(ddrs){
        console.log("DDRs: ",ddrs);
        done();
      }, function(err){
        console.log(err);
        assert.isNull(err);
        done();
      });
    })
  })
})