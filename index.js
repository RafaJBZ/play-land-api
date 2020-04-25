const MyDB = require("./MyDB")
const fs = require('fs')
const auth = require('basic-auth')
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
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
    console.log(re.headers)
    let isAuth = await authorize(req,res)
    console.log(req.body)
    if (isAuth){
      const { student, tutor} = req.body
      if (req.body.length === 0 || student.name === undefined || tutor.name === undefined){
        res.sendStatus(400)
      }
      try{
        const studentId = await db.insertStudent(student)
        const tutorId = await db.insertTutor(tutor)
      }catch(err){
        res.sendStatus(500)
      }
      

      console.log(studentId)
      console.log(tutorId)

      db.insertStudentTutor(studentId, tutorId)
      res.sendStatus({message: "Tas bien wey"})
    }
});

app.get('/insertTutor', async function(req, res) {
  let isAuth = await authorize(req,res)
  console.log(req.body)
  if (isAuth){
    const { student, tutor} = req.body
    if (student.name == undefined || tutor.name == undefined){
      res.sendStatus(400)
    }
    const studentId = await db.getIdStudents(student)
    const tutorId = await db.insertTutor(tutor)

    db.insertStudentTutor(studentId, tutorId)

    res.sendStatus(200)
  }
});


app.get('/insertMedicamento', async function(req, res) {
  let isAuth = await authorize(req,res)
  console.log(req.body)
  if (isAuth){
    const { student, drug} = req.body
    if (student.name == undefined || drug.name == undefined){
      res.sendStatus(400)
    }
    const studentId = await db.getIdStudents(student)
    const drugId = await db.insertDrugs(drug)

    db.insertStudentDrugs(studentId, drugId)

    res.sendStatus(200)
  }
});

app.get('/insertRegistro',async function(req, res){
  let isAuth = await authorize(req,res)
  console.log(req.body)
  if (isAuth){
    const{reg, student, tutor} = req.body
    if (reg.tipo == undefined || tutor.name == undefined || student.name == undefined){
      res.sendStatus(400)
    }
    const regId = await db.insertReg(reg)
    const studentId = await db.getIdStudents(student)
    const tutorId = await db.getIdTutor(tutor)

    db.insertStudentRegTutor(studentId,regId,tutorId)

    res.sendStatus(200)
  }
})
//datos alumno
//tutores por niño
//medicinas con niño
//entradas salidas niño
//eliminar alumno
// eliminar tutor


app.listen(PORT)