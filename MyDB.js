var mysql = require('mysql');


module.exports = class MyDB {
    constructor(dbMetadata) {
        this.connection = mysql.createConnection({ ...dbMetadata });
    }

    async curateQuery(query) {
        return await query.replace("\n", "")
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

    insertStudent({name,birthDate,admissionTime,entryDate,birthPlace,weigth,height,bloodType,dominantSide,address,pregnancy,childbirth,feeding,
        dentition,diseases,blows,allergies,doctor,sleepHabits,motorSkill,language,sphinter,selfSufficiency,visual,auditory,motor,behavior}){
            return new Promise((resolve, reject)=>{
                let query = `insert into alumnos (nombreAlumnos,fechaNacimiento,horario,fechaEntrada,lugarNacimiento,pesoActual,estaturaActual,tipoSangre,ladoDominante,direccion,desarrolloEmbarazo,parto,alimentacion,detincion,enfermedadesPadecidas,GolpesPadecidos,alegias,pediatra,habitosSueño,motricidad,habla,controlEsfinteres,independencia,agudezVisual,agudezaAuditiva,deficienciasMotoras,comportamiento,estadoAl) values (${this.connection.escape(name)},${this.connection.escape(birthDate)},${this.connection.escape(admissionTime)},${this.connection.escape(entryDate)}
                ,${this.connection.escape(birthPlace)},${this.connection.escape(weigth)},${this.connection.escape(height)},${this.connection.escape(bloodType)}
                ,${this.connection.escape(dominantSide)},${this.connection.escape(address)},${this.connection.escape(pregnancy)},${this.connection.escape(childbirth)}
                ,${this.connection.escape(feeding)},${this.connection.escape(dentition)},${this.connection.escape(diseases)},${this.connection.escape(blows)}
                ,${this.connection.escape(allergies)},${this.connection.escape(doctor)},${this.connection.escape(sleepHabits)},${this.connection.escape(motorSkill)}
                ,${this.connection.escape(language)},${this.connection.escape(sphinter)},${this.connection.escape(selfSufficiency)},${this.connection.escape(visual)}
                ,${this.connection.escape(auditory)},${this.connection.escape(motor)},${this.connection.escape(behavior)},true)`
                
                this.connection.query(query, (err, res)=>{
                    if(err) {
                        reject(err)
                    }
                    resolve(res)
                })
            })
        }
    
    getIdStudents({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`select idalumnos from alumnos where nombreAlumnos=${this.connection.escape(name)}`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res[0].idalumnos)
            })
        })
    }

    getIdTutor({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`select idexternos from externos where nombreExternos=${this.connection.escape(name)}`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res[0].idexternos)
            })
        })
    }

    insertTutor({name,address,phone,age,profession,work}){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into externos (nombreExternos,direccion,telefono,edad,profesion,lugarTrabajo,estadoEx) values (${this.connection.escape(name)},${this.connection.escape(address)}
            ,${this.connection.escape(phone)},${this.connection.escape(age)},${this.connection.escape(profession)},${this.connection.escape(work)},true)`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    insertStudentTutor(studentId,tutorId){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into alumnos_has_externos (alumnos_idalumnos,externos_idexternos) values (${this.connection.escape(studentId)},${this.connection.escape(tutorId)})`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    insertDrugs({date,name,timeLast,timeNext}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`insert into medicamento (fecha,tipoMedicamento,ultimaAdministracion,proximaAministracion) values (${this.connection.escape(date)}
            ,${this.connection.escape(name)},${this.connection.escape(timeLast)},${this.connection.escape(timeNext)})`,(err,res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    insertStudentDrugs(studentId,drugId){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into alumnos_has_medicamento (alumnos_idalumnos,medicamento_idmedicamento) values (${this.connection.escape(studentId)},${this.connection.escape(drugId)})`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    
    insertReg({date,time,tipo,state,hygiene,diseases,injury}){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into registros (fecha,hora,typeReg_idtypeReg,estado,higiene,enfermedad,lesion) values (${this.connection.escape(date)},${this.connection.escape(time)},${this.connection.escape(tipo)}
            ,${this.connection.escape(state)},${this.connection.escape(hygiene)},${this.connection.escape(diseases)},${this.connection.escape(injury)})`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    insertStudentRegTutor(studentId,regId, tutorId){
        return new Promise((resolve, reject)=>{
            this.connection.query(`insert into alumnos_has_registros (alumnos_idalumnos,registros_idregistro,externos_idexternos) values (${this.connection.escape(studentId)}
            ,${this.connection.escape(regId)},${this.connection.escape(tutorId)})`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    
    getStudent({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`select * from alumnos where nombreAlumnos=${this.connection.escape(name)} and estadoAl=true`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    getStudents(){
        return new Promise((resolve,reject)=>{
            this.connection.query(`select nombreAlumnos from alumnos where estadoAl=true`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    getStudentTutor({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`SELECT e.nombreExternos, e.direccion, e.telefono, e.edad, e.profesion, e.lugarTrabajo FROM mydb.alumnos_has_externos ah
            join mydb.externos e
            on ah.externos_idexternos = e.idexternos
            join mydb.alumnos a
            on ah.alumnos_idalumnos = a.idalumnos
            where a.nombreAlumnos =${this.connection.escape(name)} and a.estadoAl=true and e.estadoEx=true`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    getStudentDrug({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`SELECT m.fecha, m.tipoMedicamento, m.ultimaAdministracion, m.proximaAministracion FROM mydb.alumnos_has_medicamento ah
            join mydb.medicamento m
            on ah.medicamento_idmedicamento = m.idmedicamento
            join mydb.alumnos a
            on ah.alumnos_idalumnos = a.idalumnos
            where a.nombreAlumnos =${this.connection.escape(name)}  and a.estadoAl=true`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    getStudentRegTutor({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`SELECT a.nombreAlumnos, e.nombreExternos, r.fecha, r.hora, t.tipo, r.estado, r.higiene, r.enfermedad, r.lesion FROM mydb.alumnos_has_registros ah
            join mydb.externos e
            on ah.externos_idexternos = e.idexternos
            join mydb.alumnos a
            on ah.alumnos_idalumnos = a.idalumnos
            join mydb.registros r
            on ah.registros_idregistro = r.idregistro
            join mydb.typeReg t
            on r.typeReg_idtypeReg = t.idtypeReg
            where a.nombreAlumnos =${this.connection.escape(name)}  and a.estadoAl=true  and e.estadoEx=true`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    deleteStudent({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`update alumnos set estadoAl=false where nombreAlumnos=${this.connection.escape(name)}`,(err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    
    deleteTutor({name}){
        return new Promise((resolve,reject)=>{
            this.connection.query(`update externos set estadoEx=false where nombreExternos=${this.connection.escape(name)}`,(err, res)=>{
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
