var Classroom = class {
  constructor(classroomObject) {
    //console.log(classroomObject)
    this.id = classroomObject.id;
    this.level = classroomObject.level;
    this.name = classroomObject.name;
    this.qualification = classroomObject.qualification;
    this.yearGroup = classroomObject.year;
    this.creationDate = new Date(classroomObject.classroom_users.created_at)
    this.updatedDate = new Date(classroomObject.classroom_users.updated_at)
  }
  toString() {
    return this.name
  }
}

module.exports = Classroom