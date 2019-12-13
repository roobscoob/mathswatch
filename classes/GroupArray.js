const Group = require(__dirname + '/Group.js');

var GroupArray = class extends Array {
  constructor(...groupObjects) {
    groupObjects = groupObjects.map(r => new Group(r))
    super(...groupObjects)
  }
}

module.exports = GroupArray