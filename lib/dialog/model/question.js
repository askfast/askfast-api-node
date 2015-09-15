var Answer = require('./answer.js');

var Question = function() {
  this.question_id=null;
  this.requester=null;
  this.question_text=null;
  this.type=null;
  this.url=null;

  this.answers=[];
  this.media_properties=[];
  this.event_callbacks=[];
}

Question.prototype.addAnswer = function(answer) {
    if(this.answers==null)
        this.answers = new Array();

    this.answers.push(answer);
}

module.exports = Question;
