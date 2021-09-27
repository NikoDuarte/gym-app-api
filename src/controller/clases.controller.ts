/***********/
//*! Importaciones
    //* |-> Request, Response de express
    import { Request, Response } from 'express'
    //* |-> Service response
    import { $response } from '../service/response.service';
    //* |-> Consultas DBMS
    import { find, findByIdAndDelete, findByIdAndUpdate, findCompost, save } from '../database/consultas.database';
/***********/
// TODO: Definicion de controladores para la funcion de las rutas rest
    //? -_ Creara la clase
    const create_class = async(req: Request, res: Response) => {
        //* |-> Extraemos la daata entrante de la request
        const {
            title,
            descr,
            cupos
        } = req.body
        //* |-> Capturamos el id del usuario que realiza la peticion
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Crearemos la clase del usuario
            const new_class = await save(
                'clases', 
                'id_entrenador, title, descripcion, cupos',
                `'${uid}', '${title}', '${descr}', '${cupos}'`
            )
            //* |-> Respondemos al usuario un mensaje de exito
            $response(
                res,
                { status: 200, succ: true, msg: `Clase ${title} creada correctamente`, data: new_class }
            )
        } catch (err) {
            //*! Imprimimos el error en consola
            console.log(err);
            //*! Respondemos al cliente un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un error... Verifica los logs' }
            )
        }
    }
    //? -_ Usuario inscribe a clase
    const ins_user_class = async(req: Request, res: Response) => {
        //* |-> Extraemos la informacion del token
        const { uid }: any = req
        //* |-> Capturamos el id de la clase que pasamos por los parametros url request
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos si existe la clase
            const findClassId: any = await find('clases', '*', `_id = '${id}'`)
            //* |-> Si no retorna ninguna informacion respondemos 404
            if (findClassId.length === 0) return $response(res, { status: 404, succ: false, msg: 'Clase no encontrada en el sistema' })
            //* |-> Mapeamos el resultado de la busqueda
            const class_ = findClassId.map(
                (e:any) => {                    
                    return {
                        title: e.title,
                        cupo: e.cupos
                    }
                }
            )
            //* |-> buscamos el total de inscripciones
            const findCountClassIns: any = await find('clase_ins', 'count(*)', `id_clase = ${id}`)
            //* |-> Validaremos que el numero de inscripciones no exeda el numero de cupos            
            if ( findCountClassIns.length === class_[0].cupo ) {
                //* |-> Si los cupos se completarion respondemos al usuario 400
                $response(
                    res, 
                    {status: 400, succ: false, msg: 'Cupos llenos :('}
                )
            }
            //* |-> Si si existe la clase procedemos y no exede el numero de inscripciones, inscribiremos a el usuario
            const new_ins_class = await save('clase_ins', 'id_user, id_clase', `${uid}, ${id}`)
            //* |-> Responderemos al usuario exito
            $response(
                res,
                { status: 200, succ: true, msg: `Inscripcion exitosa a la clase ${class_[0].title}`, data: new_ins_class }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al cliente un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisa los logs' }
            )
        }
    }
    //? -_ Ver clases creadas por x entrenador
    const view_all_class_entre = async(req: Request, res: Response) => {
        //* |-> Capturamos la informacion del token
        const { uid }: any = req
        //* |-> Capturamos el id del entrenador al cual queremos ver las clases
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos todas las clases del usuario
            const findClassUserId: any = await find('clases', '*', `id_entrenador = ${id}`)
            //* |-> Si no retorna ninguna informacion responderemos al usuario 404
            if(findClassUserId.length === 0) return $response(res, { status: 404, succ: false, msg: 'NO se encontro ninguna clase' })
            //* |-> Si si existen clases mappearemos el resultado para devolver la informcacion requerida
            const class_ = findClassUserId.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        title: e.title,
                        descripcion: e.descripcion,
                        cupos: e.cupos
                    }
                }
            )
            //* |-> Retornaremos exito al cliente junto con las clases encontradas
            $response(
                res,
                { succ: false, status: 200, msg: 'Busqueda exitosa!!', data: class_ }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornamos al cliente un error 500
            $response(
                res, 
                { status: 500, succ: false, msg: 'Ocurrio un problema verifica los logs' }
            )
        }
    }
    //? -_ Ver todas las clases registrados en el sistema
    const view_all_class = async(req: Request, res: Response) => {
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos las clases inscritas en el sistema
            const findAllClass: any = await find('clases', '*', '')
            //* |-> Si no hay ninguna clase o no retorna ninguna clase responderemos un 404
            if(findAllClass.length === 0) return $response(res, { status: 404, succ: true, msg: 'No se han registrado clases en el sistema' })
            //* |-> Si existe mappearemos el resultado de la clases para devolver valores nesesarios
            const class_ = findAllClass.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        title: e.title,
                        descripcion: e.descripcion,
                        cupos: e.cupos
                    }
                }
            )
            //* |-> responderemos al usuario exito junto con las clases
            $response(
                res,
                { status: 200, succ: true, msg: 'Busqueda exitosa', data: class_ }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al cliente un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisar los logs' }
            )
        }
    }
    //? -_ Ver las clases en las que esta inscrito un usuario
    const view_user_class = async(req: Request, res: Response) => {
        //* |-> Capturamos la informacion del token
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Realizaremos la consulta
            const findClassUser: any = await findCompost(
                '*',
                'clase_ins as ci',
                'INNER JOIN users as u ON ci.id_user = u._id INNER JOIN clases as c ON ci.id_clase = c._id INNER JOIN users as uq ON c.id_entrenador = uq._id',
                `u._id = ${uid}`
            )
            //* |-> Si no encuentra ningun resultado
            if(findClassUser.length === 0) return $response(res, { status: 404, succ: false, msg: 'Parece que no estas inscrito a ninguna clase' })
            //* |-> Si si encuentra data mappearemos la informacion mas relevante            
            const class_ = findClassUser.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        id_class: e.id_clase,
                        name_entre: e.name,
                        title: e.title,
                        descripcion: e.descripcion,
                        cupos: e.cupos
                    }
                    
                }
            )
            //* |-> Retornamos un mensaje de exito junto con las clases del usuario
            $response(
                res,
                { status: 200, succ: true, msg: 'Busqueda exitosa!!', data: class_ }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornamos al usuario un satatus 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisa los logs' }
            )
        }
    }
    //? -_ Ver una clase en expesifico segun el id
    const view_unique_class = async(req: Request, res: Response) => {
        //* |-> Capturamos el id de la request params para buscar
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos la clase por el id suministrado
            const findClassId: any = await findCompost('*', 'clases as c', 'INNER JOIN users as u ON c.id_entrenador = u._id', `c._id = ${id}`)
            //* |-> Si no retorna ninguna informacion la consulta retornamos un 404
            if(findClassId.length === 0) return $response(res, { status: 404, succ: false, msg: 'Parece que en el sistema no se encuentra una clase por ese id' })
            //* |-> Si si retorna informacion mappearemos la respuesta
            const class_ = findClassId.map(
                (e: any) => {
                    return {
                        name_entre: e.name,
                        title: e.title,
                        descripcion: e.descripcion,
                        cupos: e.cupos
                    }
                }
            )
            //* |-> Contaremos los inscritos en ese curso
            const countInsUsers: any = await find('clase_ins', 'count(*)', `id_clase = ${id}`)
            //* |-> Respondemos al usuario un mensaje de exito junto con la clase y el total de inscritos
            $response(
                res,
                {  status: 200, succ: true, msg: 'Busqueda exitosa!!', data: { clase: class_, total_ins: countInsUsers.length } }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornaremos al cliente un status 500
            $response(res, { status: 500, succ: false, msg: 'Ocurrio un problema... Revisar los logs' })
        }
    }
    //? -_ Actualizara una clase en especifico
    const update_class = async(req: Request, res: Response) => {
        //* |-> Capturamos la informacion a actualizar del body request
        const {
            title,
            descrip,
            cupos
        } = req.body
        //* |-> Capturamos el id de la clase que vamos a actualizar por los request params
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos si existe la clase
            const findClassId: any = await find('clases', '*', `_id = ${id}`)
            //* |-> Si no encuentra ninguna informacion o retorna vacio respondemos 404
            if(findClassId.length === 0) return $response(res, { status: 404,succ: false, msg: 'Parece que la clase que intenta actualizar no existe en nuestro sistema' })
            //* |-> Si retorna algun dato actualizaremos la clase
            await findByIdAndUpdate(
                'clases',
                `title = '${title}', descripcion = '${descrip}', cupos = ${cupos}`,
                id
            )
            //* |-> Responderemos al usuario exito
            $response(
                res,
                { status: 200, succ: true, msg: 'Clase actualizada correctamente!!' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornamos al usuario un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Verifica los logs' }
            )
        }
    }
    //? -_ Eliminar la inscripcion de una clase por x usuario
    const delete_ins_user = async(req: Request, res: Response) => {
        //* |-> Capturamos el id de la clase
        const { id } = req.params
        //* |-> Capturamos el uid del usuario
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos la clase a la cual el usuario se quiere desinscribir
            const findClassInsUserId: any = await find('clase_ins', '*', `id_user = ${uid} AND id_clase = ${id}`)
            //* |-> Si no retorna ninguna informacion responderemos un 404
            if(findClassInsUserId.length === 0) return $response(res, { status: 404, succ: false, msg: 'La clase que intenta eliminar parece que no existe en nuestro sistema' })
            //* |-> Si si existe la clase a la que esta inscrita el usuario procedemos a eliminarla
            await findByIdAndDelete('clase_ins', `id_user = ${uid} AND id_clase = ${id}`)
            //* |-> Responderemos al usuario un mensaje de exito
            $response(
                res,
                { status: 200, succ: true, msg: 'Se a desinscrito correctamente' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Verifica los logs' }
            )
        }
    }
    //? -_ Eliminar x clase de un entrenador
    const delete_class = async(req: Request, res: Response) => {
        //* |-> Capturamos el id de la clase a eliminar
        const { id } = req.params
        //* |-> Capturamos el id del usuario que quiere eliminar
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos la clase en el sistema
            const findClassIdUser: any = await find('clases', '*', `_id = ${id} AND id_entrenador = ${uid}`)
            //* |-> Si no retorna ningun dato la consulta responderemos un 404
            if(findClassIdUser.length === 0) return $response(res, { status: 404, succ: false, msg: 'El usuario no' })
            //* |-> Si encuentra informacion procedemos a eliminar las inscripciones realizadas
            await findByIdAndDelete('clase_ins', `id_clase = ${id}`)
            //* |-> Eliminamos la clase definitivamente del sistema
            await findByIdAndDelete('clases', `_id = ${id}`)
            //* |-> Respondemos al usuario un mensaje de exito
            $response(
                res,
                { status: 200, succ: true, msg: 'Clase eliminada exitosamente!!' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Verifica los logs' }
            )
        }
    }
/***********/
// TODO: Exportacion del modulo
export {
    create_class,
    ins_user_class,
    view_all_class_entre,
    view_all_class,
    view_user_class,
    view_unique_class,
    update_class,
    delete_ins_user,
    delete_class
}