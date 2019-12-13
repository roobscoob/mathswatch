const Name = require(__dirname + '/Name.js');
const axios = require('axios');
const QuestionsArray = require(__dirname + '/QuestionsArray.js');

var Assignment = class {
  constructor(iobj, onfinished) {
    var obj = {};
    var assignmentBasicObject = iobj.r
    var cookies = iobj.cookieJar
    this.resolve = obj.resolve;
    this.reject = obj.reject;
    this.assignedAt = new Date(assignmentBasicObject.assigned_at)
    this.dueDate = new Date(assignmentBasicObject.due_at)
    this.id = assignmentBasicObject.id
    this.lockedAt = new Date(assignmentBasicObject.lock_at)
    this.marks = {
      current: assignmentBasicObject.totalmarks,
      maximum: assignmentBasicObject.marks 
    }
    this.owner = {
      id: assignmentBasicObject.id,
      name: new Name(assignmentBasicObject.first_name, assignmentBasicObject.surname)
    }
    this.title = assignmentBasicObject.title
    this.type = assignmentBasicObject.type
    //console.log("Fetch-1")
    axios({
      url: `https://vle.mathswatch.co.uk/duocms/api/assignedwork/${ assignmentBasicObject.id}?id=${this.id}`,
      method: 'get',
      headers: {
        cookie: cookies.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
        'X-CSRF-Token': cookies.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
      }
    }).then(data => {
      //console.log("Fetch0")
      axios({
        url: `https://vle.mathswatch.co.uk/duocms/api/answers?assignedwork_id=${assignmentBasicObject.id}`,
        method: 'get',
        headers: {
          cookie: cookies.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
          'X-CSRF-Token': cookies.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
        }
      }).then(data2 => {
        //console.log("Fetch1")
        this.questions = new QuestionsArray(data2.data.data, ...data.data.data.questions)
        onfinished(this);
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = Assignment