const MyDB = require("./MyDB")
const fs = require('fs')
const auth = require('basic-auth')
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const PORT =  process.env.PORT || 3000



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

app.use(bodyParser.json());
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

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
    console.log(req.body)
    if (isAuth){
      // Aqui poner funcion que hara la logica
      const { student, tutor} = req.body
      if (student.name == undefined || tutor.name == undefined){
        res.sendStatus(400)
      }
      const studentId = await db.insertStudent(student)
      const tutorId = await db.insertTutor(tutor)

      console.log(studentId)
      console.log(tutorId)

      db.insertStudentTutor(studentId, tutorId)


      res.sendStatus(200)
    }
});

app.get('/insertTutor', async function(req, res) {
  let isAuth = await authorize(req,res)
  console.log(req.body)
  if (isAuth){
    // Aqui poner funcion que hara la logica
    const { student, tutor} = req.body
    if (student.name == undefined || tutor.name == undefined){
      res.sendStatus(400)
    }
    const studentId = await db.getIdStudents(student)
    const tutorId = await db.insertTutor(tutor)

    console.log(JSON.stringify(studentId))
    console.log(tutorId)
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