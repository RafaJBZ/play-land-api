const MyDB = require("./MyDB")
const fs = require('fs')
const auth = require('basic-auth')
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

if (process.env.environment === "local" ) {
  const dotenv = require('dotenv')
  dotenv.config()
}

const dbMetadata = {
  host: process.env.dbHostName,
  port: process.env.dbPort,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.db
}


let db = new MyDB(dbMetadata)



var app = express();

// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.post('/login', function(req, res) {
  let user = auth(req)

  db.getAdmin(user).then((data)=> {
    if (data.length === 0){
      res.sendStatus(401)
    }else{
      let token = jwt.sign({data: user.name}, 'shhhhh');
      db.setToken(user,token)
      res.json({token: token})
    }
  }).catch((err)=> {
    console.log(err)
      res.sendStatus(500)
  })
  
});

function authorize(req,res){
  return new Promise((resolve, reject) => {
    let valid = false
    let token = req.headers.authorization.split(" ")[1] 
    db.authToken(token).then(function (data) {
      if (data.length === 0){
        res.sendStatus(401)
        resolve(false) 
      }else{
        resolve(true)
      }
    }).catch((err)=> {
      res.sendStatus(500)
      resolve(false) 
    })
  })
}

app.get('/test', async function(req, res) {
    let isAuth = await authorize(req,res)
    if (isAuth){
      // Aqui poner funcion que hara la logica
      res.sendStatus(200)
    }
    
     
});

app.listen(5000)

const flow = async () => {
  db.getAdminUsers().then(async (res) => {
    console.log(res);
  }).then(() => {
    db.closeConnection()
  }).catch((err) => {
    db.closeConnection()
    throw err
  })
}

const flowAsync = async () => {
  try {
    let users = await db.getAdminUsers()
    console.log(users);
    db.closeConnection()
  } catch (err) {
    db.closeConnection()
    console.error(err)
  }
}







