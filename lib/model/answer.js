var Answer = function(id, text, next) {
    this.answer_id = id;
    this.answer_text = text;
    this.callback = next;
}

module.exports = Answer;
