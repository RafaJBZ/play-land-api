const MyDB = require("./MyDB")
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

function jsonIsValid(json){
  for (let key in json){
    if (json[key].length === 0){
      return false
    } 
  }
  return true
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

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

function authorize(req,res,next){
  
    let valid = false
    let token = req.headers.authorization.split(" ")
    token = token[1] 
    db.authToken(token).then(function (data) {
      if (data.length === 0){
        res.sendStatus(401)
        return
      }
        next()
    }).catch((err)=> {
      res.sendStatus(500)
    })

}

app.post('/admision', authorize , function(req, res) {
    const { student, tutor} = req.body
    if (student === undefined || tutor === undefined){
      res.status(400).send("Student or Tutor are undefined")
      return
    }
    if(!jsonIsValid(student) || !jsonIsValid(tutor)){
      res.status(400).send("Student or Tutor fields are empty")
      return
    }
    db.insertStudent(student).then((studentId)=>{
      db.insertTutor(tutor).then((tutorId)=>{
        db.insertStudentTutor(studentId.insertId, tutorId.insertId).then(()=>{
          res.json({"message" : "Student and tutor were successfully registered"})
        })
      })
    }).catch((err)=>{
      console.error(err)
      res.status(400).send(err)
    })
});

app.post('/insertTutor', authorize , function(req, res) {
  const { student, tutor} = req.body
  if (student === undefined || tutor === undefined){
    res.status(400).send("Student or Tutor are undefined")
    return
  }
  if(!jsonIsValid(student) || !jsonIsValid(tutor)){
    res.status(400).send("Student or Tutor fields are empty")
    return
  }
  
  db.getIdStudents(student).then((studentId)=>{
    db.insertTutor(tutor).then((tutorId)=>{
      db.insertStudentTutor(studentId, tutorId.insertId).then(()=>{
        res.json({"message" : "Tutor was successfully registered"})
      })
    })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
});

app.post('/insertMedicamento', authorize , function(req, res) {
  const { student, drug} = req.body
  if (student === undefined || drug === undefined){
    res.status(400).send("Student or Drug are undefined")
    return
  }
  if(!jsonIsValid(student) || !jsonIsValid(drug)){
    res.status(400).send("Student or Tutor fields are empty")
    return
  }
  
  db.getIdStudents(student).then((studentId)=>{
    db.insertDrugs(drug).then((drugId)=>{
      db.insertStudentDrugs(studentId, drugId.insertId).then(()=>{
        res.json({"message" : "drug was successfully registered"})
      })
    })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
});

app.post('/insertRegistro', authorize , function(req, res) {
  const { student, reg, tutor} = req.body

  if (student === undefined || reg === undefined || tutor === undefined){
    res.status(400).send("Student, Tutor or Reg are undefined")
    return
  }
  if(!jsonIsValid(student) || !jsonIsValid(tutor) || !jsonIsValid(reg)){
    res.status(400).send("Student or Tutor fields are empty")
    return
  }
  
  db.getIdStudents(student).then((studentId)=>{
    db.insertReg(reg).then((regId)=>{
      db.getIdTutor(tutor).then((tutorId)=>{
        db.insertStudentRegTutor(studentId, regId.insertId, tutorId).then(()=>{
          res.json({"message" : "Successfully registered"})
        })
      })
    })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
});

app.post('/getAlumno', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }

  db.getStudent(student).then((studentInfo)=>{
    res.json({studentInfo})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})


app.post('/getAlumnos', authorize , function(req, res){
  const {students} = req.body

  db.getStudents(students).then((studentsInfo)=>{
    res.json({studentsInfo })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})


app.post('/getTutor', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }

  db.getStudentTutor(student).then((tutorInfo)=>{
    res.json({tutorInfo })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})


app.post('/getNombreTutor', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }

  db.getNameTutor(student).then((tutorName)=>{
    res.json({tutorName})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})

app.post('/getDrugs', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }
  
  db.getStudentDrug(student).then((drugInfo)=>{
    res.json({drugInfo})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})

app.post('/getRegistro', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }
  
  db.getStudentRegTutor(student).then((regInfo)=>{
    res.json({regInfo})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})

app.post('/deleteStudent', authorize , function(req, res){
  const {student} = req.body
  if(student === undefined){
    res.status(400).send("Student is undefined")
    return
  }

  db.deleteStudent(student).then(()=>{
    res.json({"message" : "Deleted"})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})

app.post('/deleteTutor', authorize , function(req, res){
  const {tutor} = req.body
  if(tutor === undefined){
    res.status(400).send("Tutor is undefined")
    return
  }

  db.deleteTutor(tutor).then(()=>{
    res.json({"message" : "Deleted"})
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
})

app.post('/updateStudent', authorize , function(req, res) {
  const { UpStudent, student} = req.body
  if (student === undefined || UpStudent === undefined){
    res.status(400).send("Student is undefined")
    return
  }
  if(!jsonIsValid(student) || !jsonIsValid(UpStudent)){
    res.status(400).send("Student or Tutor fields are empty")
    return
  }
  
  db.getIdStudents(student).then((studentId)=>{
    db.updateStudent(UpStudent,studentId).then(()=>{
      res.json({"message" : "Student updated"})
    })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
});

app.post('/updateTutor', authorize , function(req, res) {
  const { UpTutor, tutor} = req.body
  if (tutor === undefined || UpTutor === undefined){
    res.status(400).send("Tutor is undefined")
    return
  }
  if(!jsonIsValid(UpTutor) || !jsonIsValid(tutor)){
    res.status(400).send("Student or Tutor fields are empty")
    return
  }
  
  db.getIdTutor(tutor).then((tutorId)=>{
    db.updateTutor(UpTutor,tutorId).then(()=>{
      res.json({"message" : "Tutor updated"})
    })
  }).catch((err)=>{
    console.error(err)
    res.status(400).send(err)
  })
});

//prueba11

app.listen(PORT)