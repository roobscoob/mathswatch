const assert = require('assert');
const Orginization = require(__dirname + '/Classes/Orginization.js');
const Classroom = require(__dirname + '/Classes/Classroom.js');
const ClassroomArray = require(__dirname + '/Classes/ClassroomArray.js');
const AssignedWorkList = require(__dirname + '/Classes/AssignedWorkList.js');
const Assignment = require(__dirname + '/Classes/Assignment.js');
const Group = require(__dirname + '/Classes/Group.js');
const GroupArray = require(__dirname + '/Classes/GroupArray.js');
const Name = require(__dirname + '/Classes/Name.js');
const Permission = require(__dirname + '/Classes/Permission.js');
const PermissionsArray = require(__dirname + '/Classes/PermissionsArray.js');
const Question = require(__dirname + '/Classes/Question.js');
const QuestionsArray = require(__dirname + '/Classes/QuestionsArray.js');
const AnswerRaw = require(__dirname + '/Classes/Answer.js');
const Drawing = require(__dirname + '/Classes/Drawing.js')

const Answer = class {
  constructor() {}
  extend(answer) {
    this.answerFormat = answer.toJSON()
    return this;
  }
  set(value) {
    return new AnswerRaw(this.answerFormat, {
      text: value,
      "_tag": "UNK"
    })
  }
}

const axios = require('axios').create({
  baseURL: 'https://vle.mathswatch.co.uk/',
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'vle.mathswatch.co.uk',
    'Pragma': 'no-cache',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  }
});
const tough = require('tough-cookie');
var {EventEmitter} = require('events');

var Account = class extends EventEmitter {
  update(emitterText) {
    var gthis = this
    return new Promise(function(resolve, reject) {
      axios({
        method: 'get',
        url: '/duocms/api/users/me',
        headers: {
          cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
          'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
        }
      }).then((selfDataRaw) => {
        selfDataRaw.headers['set-cookie'].forEach(cookie => {
          gthis.cookieJar.setCookieSync(cookie, 'https://vle.mathswatch.co.uk/duocms/api/me')
        })
        gthis._parseAccountData(selfDataRaw.data.data)
        axios({
          method: 'get',
          url: '/duocms/api/orgs/' + selfDataRaw.data.data.org_id + "?id=" + selfDataRaw.data.data.org_id,
          headers: {
            cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
            'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
          }
        }).then(orgData => {
          orgData.headers['set-cookie'].forEach(cookie => {
            gthis.cookieJar.setCookieSync(cookie, 'https://vle.mathswatch.co.uk' + '/duocms/api/orgs/' + selfDataRaw.data.data.org_id + "?id=" + selfDataRaw.data.data.org_id)
          })
          //console.log(orgData)
          gthis._parseOrginizationData(orgData.data.data)
          axios({
            method: 'get',
            url: '/duocms/api/assignedwork?recent=true',
            headers: {
              cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
              'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
            }
          }).then((assignedworkData) => {
            gthis._parseAssignedWorkData(assignedworkData.data.data).then(() => {
              if(emitterText) {
                gthis.emit(emitterText)
              }
              resolve()
            })
          }).catch((err) => {
            console.log(err.stack)
          })
        }).catch((err) => {
          console.log(err.stack)
        })
      }).catch((err) => {
        console.log(err.stack)
      })
    });
  }
  login(obj) {
    var gthis = this
    return new Promise(function(resolve, reject) {
      axios('/vle').then((res) => {
        res.headers['set-cookie'].forEach(cookie => {
          gthis.cookieJar.setCookieSync(cookie, 'https://vle.mathswatch.co.uk/vle/')
        })
        axios({
          method: 'post',
          url: '/duocms/api/login',
          data: {
            username: obj.username,
            password: obj.password
          },
          headers: {
            cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
            'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
          }
        }).then((res) => {
          res.headers['set-cookie'].forEach(cookie => {
            gthis.cookieJar.setCookieSync(cookie, 'https://vle.mathswatch.co.uk/duocms/api/login')
          })
          resolve();
        }).catch((err) => {
          console.log(err.stack)
        })
      }).catch(err => {
        console.log(err.stack)
      })
    });
  }
  constructor(obj) {
    super()
    this._constructorCalls = obj
    this.cookieJar = new tough.CookieJar()
    var gthis = this
    this.login(obj).then(() => {
      this.update('ready').then(() => {
        setInterval(() => {
          gthis.update('update')
        },20000)
      })
    })
  }
  _parseAccountData(accountData) {
    //console.log(accountData)
    this.classrooms = new ClassroomArray(...accountData.classrooms)
    this.creationDate = new Date(accountData.created_at)
    this.deletionDate = accountData.deleted_at ? new Date(accountData.deleted_at) : null
    this.email = accountData.email
    this.name = new Name(accountData.first_name, accountData.surname)
    this.groups = new GroupArray(...accountData.groups)
    this.id = accountData.id
    this.permissions = new PermissionsArray(...accountData.permissions)
    this.connectedIPs = accountData.remoteAddress
    this.username = accountData.username
    this.year = accountData.year
  }
  _parseOrginizationData(data) {
    this.orginization = new Orginization(data)
  }
  _parseAssignedWorkData(data) {
    var gthis = this
    return new Promise(function(resolve, reject) {
      gthis.assignments = new AssignedWorkList(resolve, reject, gthis.cookieJar, ...data)
      gthis.assignments.map((r,i)=>{
        return r.then((d) => {
          gthis.assignments[i] = d
          return d
        })
      })
    });
  }
  get deleted() {
    return !!this.deletionDate
  }
  logout() {
    var gthis = this;
    return new Promise(function(resolve, reject) {
      //console.log(gthis)
      axios({
        url: '/duocms/api/logout',
        headers: {
          cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
          'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
        }
      }).then((res) => {
        resolve()
      }).catch(err => {
        reject(err)
      }) 
    });
  }
  submitAnswer(assignmentID, questionID, answerArray) {
    var gthis = this
    return new Promise(function(resolve, reject) {
      if(!(answerArray instanceof Array)) {
        answerArray = [answerArray]
      }
      var assignment = gthis.assignments.filter(e => e.id == assignmentID)[0]
      if(!assignment) {
        reject("No assignment found with ID: " + assignmentID)
        return;
      }
      var question = assignment.questions.filter(e => e.id == questionID)[0]
      if(!question) {
        reject("No question found with ID: " + assignmentID)
        return;
      }
      if(answerArray.length != question.answers.length) {
        reject("you submitted " + answerArray.length + " answer(s) but " + question.answers.length + " are required for this question")
        return;
      }
      
      if(question.answerID) {
        axios({
          method: 'put',
          url: '/duocms/api/answers/' + question.answerID,
          headers: {
            cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
            'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
          },
          data: {
            id: question.answerID,
            answer: answerArray.map(ansobj => ansobj.toJSON()),
            question_id: question.id,
            correct: question.isCorrect,
            assignedwork_id: assignment.id.toString()
          }
        }).then((res) => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      } else {
        axios({
          method: 'post',
          url: '/duocms/api/answers/',
          headers: {
            cookie: gthis.cookieJar.getCookieStringSync('https://vle.mathswatch.co.uk/duocms/api/login'),
            'X-CSRF-Token': gthis.cookieJar.toJSON().cookies.filter(e => e.key=='_csrf')[0].value
          },
          data: {
            id: question.answerID,
            answer: answerArray.map(ansobj => ansobj.toJSON()),
            question_id: question.id,
            correct: question.isCorrect,
            assignedwork_id: assignment.id.toString()
          }
        }).then((res) => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      }
    });
  }
}

module.exports = {Account, Answer, 'raw': {
  Answer: AnswerRaw,
  AssignedWorkList,
  Assignment,
  Classroom,
  ClassroomArray,
  Drawing,
  Group,
  GroupArray,
  Name,
  Orginization,
  Permission,
  PermissionsArray,
  Question,
  QuestionsArray
}}