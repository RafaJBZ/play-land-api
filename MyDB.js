var mysql = require('mysql');


module.exports = class MyDB {
    constructor(dbMetadata) {
        this.connection = mysql.createConnection({ ...dbMetadata });
    }


    getAdmin({ name, pass }) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from administrador where usuario=${this.connection.escape(name)} and contraseña=${this.connection.escape(pass)}`, (err, res, field) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })

    }

    authToken(token){
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from administrador where token=${this.connection.escape(token)}`, (err, res, field) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    setToken({name, pass}, token){
        return new Promise((resolve, reject) => {
            this.connection.query(`update administrador set token=${mysql.escape(token)} where usuario=${this.connection.escape(name)} and contraseña=${this.connection.escape(pass)}`, (err, res, field) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    setStudent(name,birthDate,schedule,entryDate,birthPlace,weigth,height,bloodType,side,address,pregnancy,childbirth,feeding,
        dentition,diseases,blows,allergies,doctor,sleepHabits,motorSkill,language,sphinter,selfSufficiency,visual,auditory,motor,behavior){
            return new Promise((resolve, reject)=>{
                this.connection.query(`insert into alumnos (nombre,fechaNacimiento,horario,fechaEntrada,lugarNacimiento,pesoActual,estaturaActual
                    ,tipoSangre,ladoDominante,direccion,desarrolloEmbarazo,parto,alimentacion,detincion,
                    enfermedadesPadecidas,GolpesPadecidos,alegias,pediatra,habitosSueño,motricidad,habla,
                    controlEsfinteres,independencia,agudezVisual,agudezaAuditiva,deficienciasMotoras,comportamiento)
                    values (${this.connection.escape(name)},${this.connection.escape(birthDate)},${this.connection.escape(schedule)},${this.connection.escape(entryDate)}
                    ,${this.connection.escape(birthPlace)},${this.connection.escape(weigth)},${this.connection.escape(height)},${this.connection.escape(bloodType)}
                    ,${this.connection.escape(side)},${this.connection.escape(address)},${this.connection.escape(pregnancy)},${this.connection.escape(childbirth)}
                    ,${this.connection.escape(feeding)},${this.connection.escape(dentition)},${this.connection.escape(diseases)},${this.connection.escape(blows)}
                    ,${this.connection.escape(allergies)},${this.connection.escape(doctor)},${this.connection.escape(sleepHabits)},${this.connection.escape(motorSkill)}
                    ,${this.connection.escape(language)},${this.connection.escape(sphinter)},${this.connection.escape(selfSufficiency)},${this.connection.escape(visual)}
                    ,${this.connection.escape(auditory)},${this.connection.escape(motor)},${this.connection.escape(behavior)})`, (err, res)=>{
                            if(err) {
                                reject(err)
                            }
                            resolve(res)
                            console.log(result.insertId);
                        })
            })
        }
    
    setTutor(name,address,phone,age,profession,work){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into externos (nombre,direccion,telefono,edad,profesion,lugarTrabajo) values (${this.connection.escape(name)},${this.connection.escape(address)}
            ,${this.connection.escape(phone)},${this.connection.escape(age)},${this.connection.escape(profession)},${this.connection.escape(work)})`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    closeConnection() {
        return new Promise((resolve, reject) => {
            try {
                this.connection.end()
                resolve(null)
            }
            catch (err) {
                reject(err)
            }
        })
    }


}
