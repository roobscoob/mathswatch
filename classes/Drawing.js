var Point = class {
  constructor(obj) {
    this.position = {}
    this.position.x = obj.x1
    this.position.y = obj.y1
  }
}
var Line = class {
  constructor(obj) {
    this.startPosition = {}
    this.startPosition.x = obj.x1
    this.startPosition.y = obj.y1
    this.endPosition = {}
    this.endPosition.x = obj.x2
    this.endPosition.y = obj.y2
  }
}
var Arc = class {;
  constructor(obj) {
    this.start = {}
    this.start.position = {}
    this.start.position.x = obj.x
    this.start.position.y = obj.y
    this.start.angle = obj.rad2
    this.end = {}
    this.end.angle = obj.rad1
    this.radius = obj.r
  }
}

module.exports = { Arc, Line, Point }