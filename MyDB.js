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
