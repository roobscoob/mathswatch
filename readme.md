# Mathswatch Private API
## This is an incomplete, and subject to change!
Please wait for release 1.0.0 before using in prod (if you even would use this in prod?)
Things to complete
1. Changing password
2. Video API 
3. my progress API
4. Testing on non-student accounts.

## examples
### Logging in:
logs in to account with username "abc123" and password "helloWorld"
```
    const MathsWatch = require('mathswatch');
    
    const account = new MathsWatch.Account({ username: "abc123", password: "helloWorld" }) // not a valid account, used for example
```
###Retrieving a list of assignments' titles:
```
var titles = account.assignments.map(assignment => assignment.title)
```
