var Question = require('./model/question.js'),
    Answer = require('./model/answer.js'),
    Result = require('./model/result.js'),
    url = require('url');

var AskFast = function(req) {
    if(req!=null) {
        this.req = req;
        var urlObj = url.parse(req.originalUrl);
        this.url = 'http://'+req.headers.host+urlObj.pathname;
    }
    this.response = new Question();
    this.response.question_id = 1;
    this.response.question_text = "text://";
}
AskFast.QUESTION_TYPE_CLOSED = "closed";
AskFast.QUESTION_TYPE_OPEN = "open";
AskFast.QUESTION_TYPE_COMMENT = "comment";
AskFast.QUESTION_TYPE_REFERRAL = "referral";

AskFast.prototype.ask = function(ask, next) {

    this.response.question_text += ask;
    this.response.type = AskFast.QUESTION_TYPE_OPEN;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.url+next));
    }
}

AskFast.prototype.addAnswer = function(answer, next) {
    var answerid=1;
    if(this.response.answers!=null)
        answerid=this.response.answers.length+1;

    this.response.type = AskFast.QUESTION_TYPE_CLOSED;
    this.response.addAnswer(new Answer(answerid, "text://"+answer, this.url+next));
}

AskFast.prototype.say = function(say, next) { 
    this.response.question_text += say;
    this.response.type = AskFast.QUESTION_TYPE_COMMENT;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.url+next));
    }
}

AskFast.prototype.redirect = function(redirect, say) {
    if(say!=null) {
        this.response.question_text += say;
    } else {
        this.response.question_text = null;
    }
    this.response.url = redirect;
    this.response.type = AskFast.QUESTION_TYPE_REFERRAL;
}

AskFast.prototype.hangup = function() {
    this.response={};
}

AskFast.prototype.finalize = function() {
    return JSON.stringify(this.response);
}

AskFast.prototype.getResult = function() {
    return new Result(this.req);
}

module.exports = AskFast;
