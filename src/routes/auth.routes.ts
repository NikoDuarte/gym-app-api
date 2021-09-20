/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from "express";
    //* |-> Controllers
    import { ask_for_pass, login, renew_token, re_password } from "../controller/auth.controller";
    //* |-> Middlewares
    import { validJWT } from "../middleware/validJWT.middleware";
/***********/
// TODO: Inicializacion del rutero
const router: Router = Router()
//? -_ Definicion de rutas
    //? -_ $GET
        //* Ruta que realizara la renovacion del token
        router.get('/renew-token', validJWT, renew_token)
    //? -_ $POST
        //* |-> Ruta que realizara el logueo de un usuario
        router.post('/', login)
        //* |-> Ruta que enviara un correo para el restablecimiento de contraseña
        router.post('/ask-for-passwort', ask_for_pass)
    //? -_ $PUT
        //* |-> Ruta que actualizara la contraseña tanto ask for como formulario normal
        router.put('/re-password', validJWT, re_password)
    //? -_ $DELETE
    /**
     * 
     */
/***********/
export default router