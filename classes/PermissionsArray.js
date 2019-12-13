const Permission = require('./Permission.js');

var PermissionsArray = class extends Array {
  constructor(...classroomObjects) {
    classroomObjects = classroomObjects.map(r => {
      if(typeof r == 'string') {
        return new Permission(r)
      } else {
        return new Permission(r.name)
      }
    })
    super(...classroomObjects)
  }
}

module.exports = PermissionsArray