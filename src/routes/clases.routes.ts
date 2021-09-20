/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from "express";
    //* |-> Controllers
    import { create_class, delete_class, delete_ins_user, ins_user_class, update_class, view_all_class, view_all_class_entre, view_unique_class, view_user_class } from "../controller/clases.controller";
    //* |-> Middlewares
    import { validAdminRole, validEntreRole, validJWT } from "../middleware/validJWT.middleware";
/***********/
// TODO: Inicializacion del rutero
const router: Router = Router()
//? -_ Definicion de rutas
    //? -_ $GET
        //* |-> Ruta que mostrara todas las clases en el sistema
        router.get('/', view_all_class)
        //* |-> Ruta que permitira mostrar la info de una clase en especifico (id)
        router.get('/:id', view_unique_class)
        //* |-> Ruta que mostrara todas las clases de x entrenador
        router.get('/view/class-entrenador/:id', [ validJWT ], view_all_class_entre)
        //* |-> Ruta que mostrara las clases en las que esta inscrito un usuario
        router.get('/view/user-class', validJWT, view_user_class)
    //? -_ $POST
        //* |-> Ruta que creara una nueva clase (entrenador)
        router.post('/', [validJWT, validEntreRole], create_class)
        //* |-> Ruta que inscribira un usuario a una clase
        router.post('/inscription-class/:id', validJWT, ins_user_class)
    //? -_ $PUT
        //* |-> Ruta que actualizara una clase segun el entrenador
        router.put('/update-class/:id', [ validJWT, validEntreRole ], update_class)
    //? -_ $DELETE
        //* |-> Ruta que eliminara la inscripcion de un usuario a la clase
        router.delete('/delete-ins/:id', validJWT, delete_ins_user)
        //* |-> Ruta que eliminara la clase
        router.delete('/delete-class/:id', [ validJWT, validEntreRole ], delete_class)
/***********/
export default router