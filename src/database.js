import mysql from 'mysql2'
import config from './config.js'

const connection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
})

connection.connect((err) => {
    if (err) {
      console.error(`Error al conectar a la base de datos: ${err}`)
      return 
    }
    console.log(`¡Conexion a la base de datos exitosa!`)
})

export default connection