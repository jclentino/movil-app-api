import nodemailer from 'nodemailer'
import config from '../config.js'

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: config.email_user,
    pass: config.email_password
  }
})

async function enviarEmail(usuario) {
  await transporter.sendMail({
    from: config.email_user,
  //   to: `jlv.02@hotmail.com`, 
    to: `${usuario.email}`, 
    subject: "Cambio de contraseña  ✔",
    text: `Hola ${usuario.primer_nombre}?`,
    html: "<b>Tu contraseña ha sido cambiada exitosamente</b>",
  })  
}

export default enviarEmail