const Question = require('./Question.js');

var QuestionsArray = class extends Array {
  constructor(answerArray, ...classroomObjects) {
    classroomObjects = classroomObjects.map(x => {
      var r = null;
      answerArray.forEach(answer => {
        if(x.id == answer.question_id) {
          r = answer
        }
      })
      return new Question(x, r)
    })
    super(...classroomObjects)
  }
}

module.exports = QuestionsArray