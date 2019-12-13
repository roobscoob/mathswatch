const PermissionsArray = require('./PermissionsArray.js');

var Group = class {
  constructor(groupObject) {
    this.id = groupObject.id;
    this.name = groupObject.name;
    this.permissions = new PermissionsArray(...groupObject.permissions)
  }
}

module.exports = Group