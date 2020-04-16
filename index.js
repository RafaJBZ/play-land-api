const MyDB = require("./MyDB")
const fs = require('fs')
const auth = require('basic-auth')
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
var cors = require('cors');
const PORT =  process.env.PORT || 5000



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

app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.post('/login', function(req, res) {
  console.log(req.headers)
  let user = auth(req)
  console.log(user)

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

app.get('/admision', async function(req, res) {
    let isAuth = await authorize(req,res)
    if (isAuth){
      // Aqui poner funcion que hara la logica
      res.sendStatus(200)
    }
});

//set tutor
//set medicamento
//set registro
//view tutor by name where we also see the history of registro in the tutor
// view alumno by name where we also see the history of registro in the alumno and de history of medicamento in the alumno
// view all the history of medicamento
//view all the history of registro

app.listen(PORT)









