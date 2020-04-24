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
 GET
 body
 https://play-land.herokuapp.com/admision
 example: 
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
```
### HTTP request insert tutor
#### 
```
 GET
 body
 https://play-land.herokuapp.com/insertTutor
 example: 
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
```
### HTTP request insert drug
#### 
```
 GET
 body
 https://play-land.herokuapp.com/insertMedicamento
 example: 
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
```
### HTTP request insert register
#### 
```
 GET
 body
 https://play-land.herokuapp.com/insertRegistro
 types of "tipo": 1 == in			2 == out
 example: 
{
	"student" : {
		"name" : "rafael"
	}, 
	"reg": {
		"date" : "0001/01/01",
		"time" : "00:00",
		"tipo" : "1"
	},
	"tutor" : {
		"name" : "antonio"
	}	
}
```