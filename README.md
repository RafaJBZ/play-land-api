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