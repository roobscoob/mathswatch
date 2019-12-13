const { Point, Line, Arc } = require('./drawing.js');

var Answer = class {
  constructor(answerFormat, answerSubmitted) {
    //console.log({answerFormat, answerSubmitted})
    this._answerFormat = answerFormat
    this._answerSubmitted = answerSubmitted
    switch(answerFormat.type) {
      case 'numerical':
        this.inputType = 'numerical'
        this.value = answerSubmitted ? answerSubmitted.text : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      case 'multiple':
        this.inputType = 'multipleChoice'
        this.value = answerSubmitted ? answerSubmitted.total : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      case 'text':
        this.inputType = 'basicText'
        this.value = answerSubmitted ? answerSubmitted.text : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      case 'input': 
        this.inputType = 'basicInput'
        this.value = answerSubmitted ? answerSubmitted.text.map(e => e) : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      case 'freeform':
        this.inputType = 'freeformTextarea'
        this.value = answerSubmitted ? (answerSubmitted.text.map ? answerSubmitted.text.map(e => e) : [answerSubmitted.text]) : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      case 'drawing':
        this.inputType = 'drawing'
        this.value = answerSubmitted ? answerSubmitted.text.map(v => {
          switch (v.type) {
            case 'point':
              return new Point(v)
              break;
            case 'line':
              return new Line(v)
              break;
            case 'arc':
              return new Arc(v)
              break;
          }
        }) : null
        this.prefix = answerFormat.prefix
        this.suffix = answerFormat.suffix
        this.marks = (answerSubmitted ? answerSubmitted.marks : null) || 0
        this._tag = (answerSubmitted ? answerSubmitted.tag : null)
        this.supported = true
        break;
      default:
        this.supported = false
        console.log("Unsupported", this)
        break;
    }
  }
  toJSON() {
    switch(this.inputType) {
      case 'numerical':
        return {
          duration: 0,
          enc: true,
          marks: 0,
          pos: "",
          prefix: this.prefix,
          suffix: this.suffix,
          //tag: this._tag,
          text: this.value,
          type: this.inputType
        }
        break;
      case 'multipleChoice':
        return {
          duration: 0,
          enc: true,
          marks: 0,
          pos: "",
          prefix: this.prefix,
          suffix: this.suffix,
          //tag: this._tag,
          text: this.value,
          type: 'multiple'
        }
        break;
      case 'freeformTextarea':
        return {
          duration: 0,
          enc: true,
          marks: 0,
          pos: "",
          prefix: this.prefix,
          suffix: this.suffix,
          //tag: this._tag,
          text: this.value,
          type: 'freeform'
        }
        break;
      case 'drawing':
        var text = [];
        try {
          text = this.value.map(r => JSON.stringify(r))
        } catch {
        }
        return {
          duration: 0,
          enc: true,
          marks: 0,
          pos: "",
          prefix: this.prefix,
          suffix: this.suffix,
          //tag: this._tag,
          text: text,
          type: 'freeform'
        }
        break;
    }
  }
}

module.exports = Answer