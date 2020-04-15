# This is a back server for a kindergarten
## Made with:
* NodeJS
* Express
* MySQL

## API
### HTTP request Login
#### 
```
 POST: [/login](https://play-land.herokuapp.com/login)
    headers : {
        "Authorization" : "Basic" <Token>
    }
    Token = ${login}:${password}
    response: {
        "token" : <Response Token>
    }
 
```
