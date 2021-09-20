/***********/
//*! Importaciones
    //* |-> Express
    import express from 'express'
    //* |-> Cors
    import cors from 'cors'
    //* |-> Variables de entorno
    import { _port_, _url_concat_ } from './environments/environments'
    //* |-> Rutas { users, clases, auth }
    import user_routes from './routes/users.routes'
    import clases_routes from './routes/clases.routes'
    import auth_routes from './routes/auth.routes'
/***********/
//? -_ Configuracion del servidor
    //* |-> Inicializar express
    const app = express()
    //* |-> Configurar el cors
    app.use(cors())
    //* |-> Configuracion del parceo
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    //* |-> Definicion de rutas
    // TODO: Inicio de la url http://localhost:1805/v1/api_gym
    //* |-> Rutas para los usuarios ../user/...
    app.use(`${_url_concat_}/user`, user_routes)
    //* |-> Rutas para las clases ../class/...
    app.use(`${_url_concat_}/class`, clases_routes)
    //* |-> Rutas para la autenticacion ../auth/...
    app.use(`${_url_concat_}/auth`, auth_routes)
/***********/
//? -_ Inicializar servidor
app.listen(_port_, () => console.log(`Serve online in port: ${_port_}`))