import connection from '../database.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import enviarEmail from '../utils/email.js'

class UsuarioService {
    
    agregarNuevo (body){
        return new Promise((res, rej)=> {
            connection.query(`SELECT * FROM usuarios WHERE id = ?`, [body.id], (err, result)=> {
                if (err) return rej(`Error inesperado(${err})`)       
                if (result.length  > 0) return rej(`Usuario id ya existe`)
            })
    
            connection.query(
                `
                    INSERT INTO usuarios (
                        id,
                        tipo_id,
                        contrasena,
                        pregunta,
                        respuesta,
                        primer_nombre,
                        segundo_nombre,
                        primer_apellido,
                        segundo_apellido,
                        genero,
                        email,
                        telefono,
                        rol,
                        pais,
                        ciudad
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );
                `, 
                [
                    body.id,
                    body.tipo_id,
                    body.contrasena,
                    body.pregunta,
                    body.respuesta,
                    body.primer_nombre,
                    body.segundo_nombre,
                    body.primer_apellido,
                    body.segundo_apellido,
                    body.genero,
                    body.email,
                    body.telefono,
                    body.rol,
                    body.pais,
                    body.ciudad
                ],
                (err, results) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Usuario creado exitosamente`)
                }
            )
        })
    }

    obtenerUsuarioPorSusCredenciales (id, contrasena){
        return new Promise((res, rej) => {
            connection.query('SELECT * FROM usuarios WHERE id = ? AND contrasena = ?', [id, contrasena], (err, results) => {
              if (err) return rej(`Error inesperado(${err})`)
              res(results[0])
            })
        })
    }

    crearToken (id, contrasena){
        return new Promise((res, rej) => {
            connection.query('SELECT * FROM usuarios WHERE id = ? AND contrasena = ?', [id, contrasena], (err, results) => {
              if (err) return rej(`Error inesperado(${err})`)
              const token = jwt.sign(results[0], config.secret_key)
              res(token)
            })
        })
    }

    validandoIdentidad (id){
        return new Promise((res, rej) => {
            connection.query(
                `SELECT pregunta FROM usuarios WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    if (result.length === 0) return rej(`Usuario no existe`)
                    else  return res(result[0]?.pregunta)
                }
            )
        })
    }
    
    validandoRespuesta (id, respuesta){
        return new Promise((res, rej) => {
            connection.query(
                `SELECT * FROM usuarios WHERE id = ? AND respuesta = ?`,
                [id, respuesta],
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    if (result.length === 0) return rej(`Respuesta incorrecta`)
                    else  return res(`Identidad confirmada`)
                }
            )
        })
    }

    cambiarContraseña (id, contrasenaNueva){
        return new Promise((res, rej) => {
            connection.query(
                `
                    SELECT *
                    FROM usuarios 
                    WHERE id = ?;    
                `,
                [id],
                (err, userInfo) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    connection.query(
                        `
                            UPDATE usuarios
                            SET contrasena = ?
                            WHERE id = ?; 
                        `,
                        [`${contrasenaNueva}`.toString(), id],
                        (err, result) => {
                            if (err) return rej(`Error inesperado(${err})`)
                            enviarEmail(userInfo)
                                .then(() => res(`Contraseña cambiada`))
                                .catch(error => rej(`Error al enviar correo(${error})`))
                        }
                    )
                    
                }
            )
        })
    }

}

const usuarioService = new UsuarioService()
export default usuarioService