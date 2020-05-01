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
    "message": [
        {
            "idalumnos": 1,
            "nombreAlumnos": "pancho",
            "fechaNacimiento": "2001-11-30T06:00:00.000Z",
            "horario": "00:00:00",
            "fechaEntrada": "2001-01-01T06:00:00.000Z",
            "lugarNacimiento": "G",
            "pesoActual": 12,
            "estaturaActual": 12,
            "tipoSangre": "O+",
            "ladoDominante": "derecho",
            "direccion": "sadsd",
            "desarrolloEmbarazo": "desarrollo embarazo",
            "parto": "parto",
            "alimentacion": "alimentacion",
            "detincion": "dentincion",
            "enfermedadesPadecidas": "enfermedades padecidas",
            "GolpesPadecidos": "golpes padecidos",
            "alegias": "alergias",
            "pediatra": "nombre pediatra",
            "habitosSueño": "habitos del sueño",
            "motricidad": "abilidades motoras",
            "habla": "habla",
            "controlEsfinteres": "control de esfinteres",
            "independencia": "independencia",
            "agudezVisual": "agudeza visual",
            "agudezaAuditiva": "agudeza auditiva",
            "deficienciasMotoras": "deficiencias motoras",
            "comportamiento": "comportamiento"
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
    "message": [
        {
            "nombreAlumnos": "pancho"
        },
        {
            "nombreAlumnos": "rafael"
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
    "message": [
        {
            "nombreExternos": "santiago",
            "direccion": "direccion",
            "telefono": "2343243489",
            "edad": 34,
            "profesion": "profesion",
            "lugarTrabajo": "lugar de trabajo"
        },
        {
            "nombreExternos": "julian",
            "direccion": "direccion",
            "telefono": "23432434",
            "edad": 34,
            "profesion": "profesion",
            "lugarTrabajo": "lugar de trabajo"
        },
        {
            "nombreExternos": "antonio",
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
    "message": [
        {
            "fecha": "2001-01-01T06:00:00.000Z",
            "tipoMedicamento": "efef",
            "ultimaAdministracion": "00:00:00",
            "proximaAministracion": "00:00:00"
        }
    ]
}
```
### HTTP request get reg
#### 
```
 POST
 body
 https://play-land.herokuapp.com/getResgistro
 req: 
{
	"student" : {
		"name" : "pancho"
		
	}
}
response:
{
    "message": [
        {
            "nombreAlumnos": "pancho",
            "nombreExternos": "julian",
            "fecha": "2001-01-01T06:00:00.000Z",
            "hora": "00:00:00",
            "tipo": "out",
            "estado": "dormido",
            "higiene": "limpio",
            "enfermedad": "gripa",
            "lesion": "ninguna"
        },
        {
            "nombreAlumnos": "pancho",
            "nombreExternos": "santiago",
            "fecha": "2001-01-01T06:00:00.000Z",
            "hora": "00:00:00",
            "tipo": "in",
            "estado": "dormido",
            "higiene": "limpio",
            "enfermedad": "gripa",
            "lesion": "ninguna"
        },
        {
            "nombreAlumnos": "pancho",
            "nombreExternos": "antonio",
            "fecha": "2001-01-01T06:00:00.000Z",
            "hora": "00:00:00",
            "tipo": "in",
            "estado": "dormido",
            "higiene": "limpio",
            "enfermedad": "gripa",
            "lesion": "ninguna"
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