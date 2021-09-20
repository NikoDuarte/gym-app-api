/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from "express";
    //* |-> Controllers
    import { login } from "../controller/auth.controller";
    //* |-> Middlewares
    /**
     * 
     */
/***********/
// TODO: Inicializacion del rutero
const router: Router = Router()
//? -_ Definicion de rutas
    //? -_ $GET
    /**
     * 
     */
    //? -_ $POST
    /**
     * 
     */
    //? -_ $PUT
    //* |-> Ruta que realizara el logueo de un usuario
    router.post('/', login)
    //? -_ $DELETE
    /**
     * 
     */
/***********/
export default router