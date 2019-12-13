const Answer = require('./Answer.js');

var Question = class {
  constructor(obj, ansobj) {
    this.answers = []
    obj.answer.forEach((answer, index) => {
      if(answer) {
        this.answers.push(new Answer(answer, ansobj ? ansobj.answer[index] : null))
      }
    })
    if(ansobj) {
      this.answerID = ansobj.id
      this.attemptCount = ansobj.attempt_no
      this.firstAttemptAt = new Date(ansobj.created_at)
      this.lastAttemptAt = new Date(ansobj.updated_at)
      this.isCorrect = ansobj.correct
      this.isAttempted = true
    } else {
      this.isAttempted = false
    }
    this.difficulty = obj.difficulty
    this.id = obj.id
    this.marks = {
      current: ansobj ? ansobj.marks : 0,
      maximum: obj.marks
    }
    this.totalAnswers = obj.total_answers
    this.totalCorrect = obj.total_correct
    this.calculatorAllowed = !!obj.calculator
  }
}
module.exports = Question