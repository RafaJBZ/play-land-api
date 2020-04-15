# This is a back server for a kindergarten
## Made with:
* NodeJS
* Express
* MySQL

## API
### HTTP request Login
#### 
```
 .post 
 https://play-land.herokuapp.com/login
 
 Requirements
  User = name
  Password = pass

 Response
    Accomplished: Json with a Token
    Failed: Status 500
    Denied: Status 401
 
```
