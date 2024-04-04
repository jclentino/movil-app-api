# Movil-app-api

Api de aplicacion movial para gestionar ingresos, gastos y generar informes financieros

## Requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)


## Tecnologias 
- Javascript
- Cors 
- Dotenv
- Express
- Jsonwebtoken
- Mysql2
- Nodemailer
- Morgan 
- Nodemon

## Configuración

1. Clona este repositorio:

    ```
    git clone https://github.com/jclentino/movil-app-api.git
    ```

2. Entra al proyecto 
    
    ```
    cd server
    ```

3. Instala las dependencias 

    ```
    npm install
    ```

4. Debes crear una base de datos en tu motor de bases de datos local mysql, y crear 3 entidades

    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY,
        tipo_id ENUM('tarjeta de identidad', 'cedula de ciudadania', 'pasaporte', 'cedula de extranjeria') NOT NULL,
        contrasena TEXT NOT NULL,
        pregunta TEXT NOT NULL,
        respuesta TEXT NOT NULL,
        primer_nombre TEXT NOT NULL,
        segundo_nombre TEXT NOT NULL,   
        primer_apellido TEXT NOT NULL,   
        segundo_apellido TEXT NOT NULL,   
        genero ENUM('masculino', 'femenino') NOT NULL,
        email TEXT NOT NULL,   
        telefono INTEGER NOT NULL,   
        rol ENUM('usuario', 'administrador') NOT NULL,
        pais TEXT NOT NULL,
        ciudad TEXT NOT NULL
    );

    CREATE TABLE Ingresos (    
        id INTEGER PRIMARY KEY AUTO_INCREMENT,     
        fecha DATETIME  DEFAULT NOW(),     
        nombre TEXT NOT NULL,     
        valor INTEGER NOT NULL CHECK(valor > 0),     
        fuente TEXT NOT NULL,     
        descripcion TEXT NOT NULL,     
        usuario_id INTEGER NOT NULL, 
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    );

    CREATE TABLE Gastos (     
        id INTEGER PRIMARY KEY AUTO_INCREMENT,     
        fecha DATETIME DEFAULT NOW(),     
        nombre TEXT NOT NULL,     
        valor INTEGER NOT NULL CHECK(valor > 0),     
        categoria TEXT NOT NULL,     
        descripcion TEXT NOT NULL,     
        usuario_id INTEGER NOT NULL, 
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    );


5. Crea un archivo ```.env``` y asigna los valores basandote en el archivo  ```.env.example ```
- puerto en el que correra la aplicacion
- configuracion de la base de datos mysql (host, user, password, database name)
- clave secreta para firmar tokens (secret key)
- email y contraseña de gmail para envio de correos 


6. Levanta la aplicacion 

    ```
    npm run dev 
    ```

## Estructura del Proyecto
  
- **`./README.md`**: Descripcion breve del proyecto  
- **`./.env.example`**: Archivo de ejemplo de variables de entorno 
- **`./package.json`**: Archivo package con toda las dependencias del proyecto 
- **`./.gitignore`**: Archivo de configuracion para ignorar archivos 
- **`./config.js`**: Modulos de configuraciones generales   
- **`./database.js`**: Conexion con base de datos 
- **`./server.js`**: Modulo raiz donde se levanta el servidor, se añaden configuraciones y middlewares 
- **`./src/middlewares`**: Middlewares de la aplicacion    
- **`./src/routes`**: Endpoints de la aplicacion para cada una de nuestras entidades      
- **`./src/services`**: Logica de negocio y consultas a la base de datos        
- **`./src/utils`**: Utileria como funciones para casos especificos   

## Uso con Postman

Puedes probar las funcionalidades de la aplicación utilizando Postman o cualquier otra herramienta. Aquí hay ejemplos de las solicitudes que puedes realizar y la documentacion del proyecto
    https://tidy-plough-04a.notion.site/Kodular-App-424692d3359d4d4981e22eca21cf0ce4