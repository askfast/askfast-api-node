var Question = require('./model/question.js'),
    Answer = require('./model/answer.js'),
    Result = require('./model/result.js'),
    S = require('string');

var AskFast = function(req) {
    if(req!=null) {
        this.req = req;
        this.url = 'http://'+req.headers.host+ '/';
    }
    this.response = new Question();
    this.response.question_id = 1;
    this.response.question_text = "";
}
AskFast.QUESTION_TYPE_CLOSED = "closed";
AskFast.QUESTION_TYPE_OPEN = "open";
AskFast.QUESTION_TYPE_COMMENT = "comment";
AskFast.QUESTION_TYPE_REFERRAL = "referral";

AskFast.prototype.ask = function(ask, next) {

    this.response.question_text = this.formatText(ask);
    this.response.type = AskFast.QUESTION_TYPE_OPEN;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.formatURL(next)));
    }
}

AskFast.prototype.addAnswer = function(answer, next) {
    var answerid=1;
    if(this.response.answers!=null)
        answerid=this.response.answers.length+1;

    this.response.type = AskFast.QUESTION_TYPE_CLOSED;
    this.response.addAnswer(new Answer(answerid, this.formatText(answer), this.formatURL(next)));
}

AskFast.prototype.say = function(say, next) { 
    this.response.question_text = this.formatText(say);
    this.response.type = AskFast.QUESTION_TYPE_COMMENT;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.formatURL(next)));
    }
}

AskFast.prototype.redirect = function(redirect, say) {
    if(say!=null) {
        this.response.question_text = this.formatText(say);
    } else {
        this.response.question_text = null;
    }
    this.response.url = redirect;
    this.response.type = AskFast.QUESTION_TYPE_REFERRAL;
}

AskFast.prototype.hangup = function() {
    this.response={};
}

AskFast.prototype.formatURL = function(url) {
    if(url==null)
        return null;

    if(S(url).startsWith('/'))
        url = url.substring(1);

    if((!S(url).startsWith("http") && !S(url).startsWith("https")) && this.url!=null) {
        url = this.url + url;
    }

    return url;
}

AskFast.prototype.formatText = function(text) {
    if(text==null)
        return null;

    if(S(text).endsWith(".wav") && this.url!=null && !S(text).startsWith( "http" ) && !S(text).startsWith( "https" )) {
        if(S(text).startsWith('/'))
            text = text.substring(1);
        text = this.url + text;
    }

    if(!S(text).endsWith(".wav")) {
        text = "text://"+text;
    }

    return text;
}

AskFast.prototype.finalize = function() {
    return JSON.stringify(this.response);
}

AskFast.prototype.getResult = function() {
    return new Result(this.req);
}

module.exports = AskFast;
