const Classroom = require('./Classroom.js');

var ClassroomArray = class extends Array {
  constructor(...classroomObjects) {
    classroomObjects = classroomObjects.map(r => {
      return new Classroom(r)
    })
    super(...classroomObjects)
  }
}

module.exports = ClassroomArray