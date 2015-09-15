var Promise = require('bluebird');
var querystring = require('querystring');
var request = require('request');
var moduleinfo = require('../../package.json');

var defaultHost = 'api.ask-fast.com';

var RestClient = function(accountId, key, accessToken, host, timeout) {

  if (!accountId || !key) {
    if (process.env.ASKFAST_ACCOUNTID && process.env.ASKFAST_KEY) {
      this.accountId = process.env.ASKFAST_ACCOUNTID;
      this.key = process.env.ASKFAST_KEY;
    }
    else {
      throw 'Client requires an Account ID and Key set explicitly ' +
      'or via the ASKFAST_ACCOUNTID and ASKFAST_KEY environment variables';
    }
  }
  else {
    //if auth accountId/key passed in manually, trim spaces
    this.accountId = accountId.replace(/ /g, '');
    this.key = key.replace(/ /g, '');
  }

  if(accessToken!=null) {
    this.accessToken = accessToken.replace(/ /g, '');
  }

  //Optional client config
  this.host = host || defaultHost;
  this.timeout = timeout || 30000; // request timeout in milliseconds
}

RestClient.prototype.getBaseUrl = function () {
  return 'https://' + this.host;
};

RestClient.prototype.getAccessToken = function() {
  thiz = this;
  if (this.accessToken == null) {

    return new Promise(function(resolve, reject) {
      var oauth =
      { grant_type: "refresh_token"
        , client_id: thiz.accountId
        , client_secret: "none"
        , refresh_token: thiz.key
      }
      request.post(thiz.getBaseUrl() + '/keyserver/token', {form: oauth}, function (e, r, body) {
        if(e) {
          return reject(e);
        }
        body = JSON.parse(body);
        thiz.accessToken = body.access_token;
        resolve(thiz.accessToken);
      });
    })
  } else {
    return new Promise(function(resolve, reject) {
      resolve(thiz.accessToken)
    })
  }
}

RestClient.prototype.request = function (options) {
  var client = this;
  return new Promise(function(resolve, reject) {

    //Prepare request options
    // Add base URL if we weren't given an absolute one
    if (!options.url.indexOf('http') !== 0) {
      options.url = client.getBaseUrl() + options.url;
    }
    options.headers = {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'askfast-api-node/' + moduleinfo.version
    };
    options.timeout = client.timeout;

    // Manually create POST body if there's a form object. Sadly, request
    // turns multiple key parameters into array-ified queries, like this:
    // MediaUrl[0]=foo&MediaUrl[1]=bar. Node querystring does the right thing so
    // we use that here. Also see https://github.com/mikeal/request/issues/644
    if (options.form) {
      options.body = querystring.stringify(options.form).toString('utf-8');
      options.headers['Content-Type'] = 'application/json';
    }

    // get bearer token
    client.getAccessToken().then(function(bearer){
      options.headers['Authorization'] =  'Bearer '+bearer;
      options.json = true;

      if(options.body && options.body.params && !options.body.params.bearerToken) {
        options.body.params.bearerToken = bearer;
      }
      //Initiate HTTP request
      request(options, function (err, response, body) {
        //console.log(body);
        var data;
        try {
          if (err) {
            data = err;
          } else if (typeof body == "object") {
            data = body;
          } else {
              data = body ? JSON.parse(body) : null
          }
        } catch (e) {
          data = {status: 500, message: (e.message || 'Invalid JSON body')};
        }

        //request doesn't think 4xx is an error - we want an error for any non-2xx status codes
        var error = null;
        if (err || (response && (response.statusCode < 200 || response.statusCode > 206))) {
          error = {};
          // response is null if server is unreachable
          if (response) {
            error.status = response.statusCode;
            error.message = data ? data.message : 'Unable to complete HTTP request';
            error.code = data && data.code;
          } else {
            error.status = err.code;
            error.message = 'Unable to reach host: "' + client.host + '"';
          }
        }

        // Resolve promise
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
};

module.exports = RestClient;