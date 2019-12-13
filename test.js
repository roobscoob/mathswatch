// load credential files

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (f) => {
  try {
    console.log(eval(f))
  } catch(err) {
    console.error(err)
  }
})

var CredentialFileString = fs.readFileSync("creds.txt", 'utf-8');
var [username, password] = CredentialFileString.split("\r\n");

var mw = require('./main.js');
global.acc = new mw.Account({username, password})
var r = Date.now()
acc.on('ready', () => {
  console.log("Ready! :heart:", (Date.now() - r))
})

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    console.log("logging out")
    acc.logout().then(process.exit).catch(console.error)
});