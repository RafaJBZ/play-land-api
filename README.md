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
### HTTP request admission
#### 
```
 POST
 body
 https://play-land.herokuapp.com/admision
 req 
 {
	"student" : {
		"name" : "rafael",
		"birthDate" : "2001-11-30",
		"admissionTime" : "00:00",
		"entryDate" : "0001-01-01",
		"birthPlace" : "G",
		"weigth" : "12",
		"height" : "12",
		"bloodType" : "O+",
		"dominantSide" : "derecho",
		"address" : "sadsd",
		"pregnancy" : "desarrollo embarazo",
		"childbirth" : "parto",
		"feeding" : "alimentacion",
        "dentition" : "dentincion",
        "diseases" : "enfermedades padecidas",
        "blows" : "golpes padecidos",
        "allergies" : "alergias",
        "doctor" : "nombre pediatra",
        "sleepHabits" : "habitos del sueño",
        "motorSkill" : "abilidades motoras",
        "language" : "habla",
        "sphinter" : "control de esfinteres",
        "selfSufficiency" : "independencia",
        "visual" : "agudeza visual",
        "auditory" : "agudeza auditiva",
        "motor" : "deficiencias motoras",
        "behavior" : "comportamiento"
	}, 
	"tutor": {
		"name" : "antonio",
		"address" : "direccion",
		"phone" : "23432434",
		"age" : "34",
		"profession" : "profesion",
		"work" : "lugar de trabajo"
	}
}
response:
{
    "message": "Student and tutor were successfully registered"
}
```
### HTTP request insert tutor
#### 
```
 POST
 body
 https://play-land.herokuapp.com/insertTutor
 req:
 {
	"student" : {
		"name" : "rafael",
	}, 
	"tutor": {
		"name" : "memo",
		"address" : "direccion",
		"phone" : "23432434",
		"age" : "34",
		"profession" : "profesion",
		"work" : "lugar de trabajo"
	}
}
response:
{
    "message": "Tutor was successfully registered"
}
```
### HTTP request insert drug
#### 
```
 POST
 body
 https://play-land.herokuapp.com/insertMedicamento
 req: 
{
	"student" : {
		"name" : "rafael"	
	}, 
	"drug": {
		"name" : "efef",
		"date" : "0001/01/01",
		"timeLast" : "00:00",
		"timeNext" : "00:00"
		
	}	
}
response:
{
    "message": "drug was successfully registered"
}
```
### HTTP request insert register
#### 
```
 POST
 body
 https://play-land.herokuapp.com/insertRegistro
 types of "tipo": 1 == in			2 == out
 req: 
{
	"student" : {
		"name" : "rafael"
		
	}, 
	"reg": {
		"date" : "0001/01/01",
		"time" : "00:00",
		"tipo" : "1",
		"state" : "dormido",
		"hygiene" : "limpio",
		"diseases" : "gripa",
		"injury" : "ninguna"
	},
	"tutor" : {
		"name" : "ruy"
	}
	
}
response:
{
    "message": "Successfully registered"
}
```
### HTTP request get student
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getAlumno
 req: 
{
	"student" : {
		"name" : "rafael"
		
	}
}
response:
{
    "studentInfo": [
        {
            "idalumnos": 1,
            "nombreAlumnos": "welingtonkiu",
            "fechaNacimiento": "1111-11-10T06:36:36.000Z",
            "horario": "11:00:00",
            "fechaEntrada": "1111-11-10T06:36:36.000Z",
            "lugarNacimiento": "GDL",
            "pesoActual": 13,
            "estaturaActual": 0.9,
            "tipoSangre": "a",
            "ladoDominante": "q",
            "direccion": "s",
            "desarrolloEmbarazo": "w",
            "parto": "d",
            "alimentacion": "e",
            "detincion": "f",
            "enfermedadesPadecidas": "r",
            "GolpesPadecidos": "g",
            "alegias": "t",
            "pediatra": "h",
            "habitosSueño": "y",
            "motricidad": "j",
            "habla": "u",
            "controlEsfinteres": "k",
            "independencia": "Pepe",
            "agudezVisual": "l",
            "agudezaAuditiva": "o",
            "deficienciasMotoras": "z",
            "comportamiento": "p",
            "estadoAl": "1"
        }
    ]
}
```
### HTTP request get students
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getAlumnos
 response:
{
    "studentsInfo": [
        {
            "nombreAlumnos": "welingtonkiu"
        },
        {
            "nombreAlumnos": "primolucaxd"
        }
    ]
}
```
### HTTP request get tutor
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getTutor
 req: 
{
	"student" : {
		"name" : "pancho"
		
	}
}
response:
{
    "tutorInfo": [
        {
            "nombreExternos": "Chente",
            "direccion": "s",
            "telefono": "3311698146",
            "edad": 40,
            "profesion": "v",
            "lugarTrabajo": "c"
        },
        {
            "nombreExternos": "soto",
            "direccion": "direccion",
            "telefono": "23432434",
            "edad": 34,
            "profesion": "profesion",
            "lugarTrabajo": "lugar de trabajo"
        }
    ]
}
```
### HTTP request get drugs
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getDrugs
 req: 
{
	"student" : {
		"name" : "pancho"
		
	}
}
response:
{
    "drugInfo": [
        {
            "fecha": "2020-05-01T05:00:00.000Z",
            "tipoMedicamento": "Paracetamol",
            "ultimaAdministracion": "09:00:00",
            "proximaAministracion": "11:00:00"
        }
    ]
}
```
### HTTP request get reg
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getRegistro
 req: 
{
	"student" : {
		"name" : "pancho"
		
	}
}
response:
{
    "regInfo": [
        {
            "nombreAlumnos": "welingtonkiu",
            "nombreExternos": "Chente",
            "fecha": "2020-05-01T05:00:00.000Z",
            "hora": "12:00:00",
            "tipo": "out",
            "estado": "Caminando",
            "higiene": "Regular",
            "enfermedad": "no",
            "lesion": "no"
        },
        {
            "nombreAlumnos": "welingtonkiu",
            "nombreExternos": "soto",
            "fecha": "2020-05-01T05:00:00.000Z",
            "hora": "09:00:00",
            "tipo": "in",
            "estado": "Despierto",
            "higiene": "Regular",
            "enfermedad": "no",
            "lesion": "no"
        }
    ]
}
```
### HTTP request delete student
#### 
```
 POST
 body
 https://play-land.herokuapp.com/deleteStudent
 req: 
{
	"student" : {
		"name" : "pancho"
		
	}
}
response:
{
    "message": "Deleted"
}
```
### HTTP request delete tutor
#### 
```
 POST
 body
 https://play-land.herokuapp.com/deleteTutor
 req: 
{
	"tutor" : {
		"name" : "pancho"
		
	}
}
response:
{
    "message": "Deleted"
}
```
### HTTP request update student
#### 
```
 POST
 body
 https://play-land.herokuapp.com/updateStudent
 req: 
{
	"UpStudent" : {
		"name" : "rafael",
		"birthDate" : "2001-11-30",
		"admissionTime" : "00:00",
		"entryDate" : "0001-01-01",
		"birthPlace" : "G",
		"weigth" : "12",
		"height" : "12",
		"bloodType" : "O+",
		"dominantSide" : "derecho",
		"address" : "sadsd",
		"pregnancy" : "desarrollo embarazo",
		"childbirth" : "parto",
		"feeding" : "alimentacion",
        "dentition" : "dentincion",
        "diseases" : "enfermedades padecidas",
        "blows" : "golpes padecidos",
        "allergies" : "alergias",
        "doctor" : "nombre pediatra",
        "sleepHabits" : "habitos del sueño",
        "motorSkill" : "abilidades motoras",
        "language" : "habla",
        "sphinter" : "control de esfinteres",
        "selfSufficiency" : "independencia",
        "visual" : "agudeza visual",
        "auditory" : "agudeza auditiva",
        "motor" : "deficiencias motoras",
        "behavior" : "comportamiento"
	}, 
	"student": {
		"name" : "bruno"
	}
}
response:
{
    "message": "Student updated"
}
```
### HTTP request update tutor
#### 
```
 POST
 body
 https://play-land.herokuapp.com/updateTutor
 req: 
{
	"UpTutor": {
		"name" : "soto",
		"address" : "direccion",
		"phone" : "23432434",
		"age" : "34",
		"profession" : "profesion",
		"work" : "lugar de trabajo"
	},
	"tutor" : {
		"name" : "paco"
	}
}
response:
{
    "message": "Tutor updated"
}
```