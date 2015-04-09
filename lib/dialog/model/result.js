var Result = function(req) {
    this.req = req;
    this.body = "";
}

Result.prototype.receive = function(callback) {
    var thiz = this;
    if(this.req.method != "POST")
        return callback(null);
    this.req.on("data", function(chunk) {
        thiz.body += chunk;
    });

    this.req.on("end", function() {
        if(thiz.body=="")
            return callback(null);
        callback(JSON.parse(thiz.body));
    });
}

module.exports = Result;
