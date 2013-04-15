var Result = function(req) {
    this.req = req;
    this.body = "";
}

Result.prototype.receive = function(callback) {
    var thiz = this;
    this.req.on("data", function(chunk) {
        thiz.body += chunk;
    });

    this.req.on("end", function() {
        if(thiz.body=="")
            thiz.body="{}";
        callback(JSON.parse(thiz.body));
    });
}

module.exports = Result;
