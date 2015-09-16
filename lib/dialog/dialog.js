var Question = require('./model/question.js'),
    Answer = require('./model/answer.js'),
    Result = require('./model/result.js'),
    S = require('string');

var Dialog = function(req) {
    if(req!=null) {
        this.req = req;
        this.url = 'http://'+req.headers.host+ '/';
    }
    this.response = new Question();
    this.response.question_id = 1;
    this.response.question_text = "";
}
Dialog.QUESTION_TYPE_CLOSED = "closed";
Dialog.QUESTION_TYPE_OPEN = "open";
Dialog.QUESTION_TYPE_COMMENT = "comment";
Dialog.QUESTION_TYPE_REFERRAL = "referral";

Dialog.prototype.ask = function(ask, next) {

    this.response.question_text = this.formatText(ask);
    this.response.type = Dialog.QUESTION_TYPE_OPEN;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.formatURL(next)));
    }
}

Dialog.prototype.addAnswer = function(answer, next) {
    var answerid=1;
    if(this.response.answers!=null)
        answerid=this.response.answers.length+1;

    this.response.type = Dialog.QUESTION_TYPE_CLOSED;
    this.response.addAnswer(new Answer(answerid, this.formatText(answer), this.formatURL(next)));
}

Dialog.prototype.say = function(say, next) { 
    this.response.question_text = this.formatText(say);
    this.response.type = Dialog.QUESTION_TYPE_COMMENT;

    if(next!=null) {
        this.response.addAnswer(new Answer(1, null, this.formatURL(next)));
    }
}

Dialog.prototype.redirect = function(redirect, say) {
    if(say!=null) {
        this.response.question_text = this.formatText(say);
    } else {
        this.response.question_text = null;
    }
    this.response.url = redirect;
    this.response.type = Dialog.QUESTION_TYPE_REFERRAL;
}

Dialog.prototype.hangup = function() {
    this.response={};
}

Dialog.prototype.formatURL = function(url) {
    if(url==null)
        return null;

    if(S(url).startsWith('/'))
        url = url.substring(1);

    if((!S(url).startsWith("http") && !S(url).startsWith("https")) && this.url!=null) {
        url = this.url + url;
    }

    return url;
}

Dialog.prototype.formatText = function(text) {
    if(text==null)
        return null;

    if(S(text).endsWith(".wav") && this.url!=null && !S(text).startsWith( "http" ) && !S(text).startsWith( "https" )) {
        if(S(text).startsWith('/'))
            text = text.substring(1);
        text = this.url + text;
    }

    if(!S(text).startsWith( "http" ) && !S(text).startsWith( "https" )) {
        text = "text://"+text;
    }

    return text;
}

Dialog.prototype.finalize = function() {
    return JSON.stringify(this.response);
}

Dialog.prototype.getResult = function() {
    return new Result(this.req);
}

module.exports = Dialog;
