const Assignment = require(__dirname + '/Assignment.js');

var AssignedWorkList = class extends Array {
  constructor(onfinished, onerror, cookieJar, ...groupObjects) {
    groupObjects = groupObjects.map((r, index) => {
      return new Promise(function(resolve, reject) {
        new Assignment({r, cookieJar}, resolve)
      });
    })
    super(...groupObjects)
    Promise.all(this).then(onfinished).catch(onerror)
  }
}

module.exports = AssignedWorkList