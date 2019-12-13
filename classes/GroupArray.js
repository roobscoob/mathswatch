const Group = require('./Group.js');

var GroupArray = class extends Array {
  constructor(...groupObjects) {
    groupObjects = groupObjects.map(r => new Group(r))
    super(...groupObjects)
  }
}

module.exports = GroupArray