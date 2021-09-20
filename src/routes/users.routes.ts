/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from "express";
    //* |-> Controllers
    import { create_user, all_view_users, unique_view_user, update_user, delete_user } from "../controller/users.controller";
    //* |-> Middlewares
    import { validAdminRole, validJWT } from '../middleware/validJWT.middleware'
/***********/
// TODO: Inicializacion del rutero
const router: Router = Router()
//? -_ Definicion de rutas
    //? -_ $GET
        //* |-> Ruta que permitira ver todos los usuarios (admin)
        router.get('/all-users', [ validJWT, validAdminRole ], all_view_users)
        //* |-> Ruta que permitira ver la informacion de 1 usuario especifico
        router.get('/view/:id', validJWT, unique_view_user)
    //? -_ $POST
        //* |-> Ruta que creara el usuario
        router.post('/', create_user)
        //* |-> Ruta que creara un usuario tipo entrenador
        router.post('/entre', [ validJWT, validAdminRole ], create_user)
    //? -_ $PUT
        //* |-> Ruta que actualizara la informacion de un usuario segun id
        router.put('/update/:id', validJWT, update_user)
    //? -_ $DELETE
        //* |-> Ruta que eliminara la informacion de un usuario segun el id
        router.delete('/:id', validJWT, delete_user)
/***********/
export default router