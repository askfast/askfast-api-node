var Answer = require('./answer.js');

var Question = function() {
  this.question_id=null;
  this.requester=null;
  this.question_text=null;
  this.answers=null;
  this.type=null;
  this.url=null;
}

Question.prototype.addAnswer = function(answer) {
    if(this.answers==null)
        this.answers = new Array();

    this.answers.push(answer);
}

module.exports = Question;
