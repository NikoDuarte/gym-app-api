/***********/
//*! Importaciones
    //* |-> Request, Response de express
    import { Request, response, Response } from 'express'
    //* |-> Base de datos para concervar la conexion
    import { connet } from '../database/config.database'
    //* |-> Servicios ({ respuesta })
    import { $response } from '../service/response.service'
    //* |-> Consultas
    import { find, findByIdAndUpdate, findByIdAndDelete, save, findCompost } from '../database/consultas.database'
    //* |-> Bcrypt
    import bcrypt from 'bcrypt'
    //* |-> Helpers generateJWT
    import { generateJWT } from '../helper/jwt.helper'
/***********/
// TODO: Definicion de controladores para la funcion de las rutas rest
    //? -_ Creacion de usuarios
    const create_user = async(req: Request, res: Response) => {
        //* |-> Desestructuramos el cuerpo de la peticion
        const {
            name,
            email,
            password,
            phone,
            role,
            limitaciones,
            medicamentos,
            contacto,
            eps
        } = req.body
        //* |-> Control de errores tryCatch
        try {
            //* |-> Validamos que el email no exista para crear uno
            const findUserEmail: any = await find('users', '*', `email = '${email}'`)
            //* |-> Validar si devuelve algun dato
            if(findUserEmail.length > 0) return $response(res, {status: 400, succ: false, msg: 'Parece que el usuario ya existe en nuestro sistema'})
            //* |-> Encriptar la contraseña del usuario
            const encode = bcrypt.genSaltSync()
            const new_pass = bcrypt.hashSync(password, encode)
            //* |-> Si no existe el usuario creamos uno nuevo
            const new_user: any = await save('users', `name, email, phone, password, role`, `'${name}', '${email}', '${phone}', '${new_pass}', '${role}'`)
            //* |-> Creamos el añadido del usuario (medico)
            const findMedicoUserId: any = await find('medico', '*', `id_user = '${new_user}'`)
            //* |-> Si retorna algun dato responderemos que el añadido ya se encuentra en el sistema
            if(findMedicoUserId > 0) return $response(res, {status: 400, succ: false, msg: 'Los complementos medicos del usuario ya se encuentran registrados en el sistema'})
            //* |-> Si no retorna ningun dato lo creamos
            const new_medico = await save(
                'medico', 
                'id_user, limitacion, medicamento, contacto, eps',
                `'${new_user}', '${limitaciones}', '${medicamentos}', '${contacto}', '${eps}'`
            )
            //* |-> Generaremos el token
            const token = await generateJWT(new_user, '4h')
            //* |-> Respondemos al usuario con exito
            return $response(res, {status: 200, succ: true, msg: 'Usuario creado correctamente', data: token})
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un mensaje de error 500
            return $response(res, {status: 500, succ: false, msg: 'Ocurrio un problema... revisa los logs del servidor'})
        }
    }
    //? -_ Ver la informacion de todos los usuarios
    const all_view_users = async(req: Request, res: Response) => {
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos todos los usuarios que se encuentren el nuestro sistema
            const findAllUser: any = await find('users', '*', '')
            //* |-> Si no uno encuentra ningun usuario retornaremos un 404
            if (findAllUser.length === 0) {
                return $response(res, { status: 404, succ: false, msg: 'Ningun usuario encontrado en el sistema' })
            }
            //* |-> Si existe el usuario mapearemos el resultado 
            const users = findAllUser.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        name: e.name,
                        email: e.email,
                        phone: e.phone,
                        role: e.role
                    }
                }
            )
            //* |-> Retornaremos una respuesta de exito al usuario junto con la informcacion de la consulta
            $response(
                res, { status: 200, succ: true, msg: 'Busqueda exitosa!!', data: users }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un status 500
            $response(
                res,
                { status: 500, succ: true, msg: 'Ocurrio un problema... Verifica los logs' }
            )
        }
    }
    //? -_ Ver la informacion de un usuario
    const unique_view_user = async(req: Request, res: Response) => {
        //* |-> Capturamos el id del usuario
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos al usuario en el sistema
            const findUserId: any = await findCompost(
                '*', 'users as u', 'INNER JOIN medico as m ON u._id = m.id_user', `u._id = ${id}`
            )
            //* |-> Si no encuentra ningun resultado devolveremos un 404
            if (!findUserId || findUserId.length === 0) {
                $response(
                    res,
                    {status: 404, succ: false, msg: 'Usuario no encontrado'}
                )
            }
            //* |-> Mappearemos la informacion entrante para retornar unicamente la informacion relevante
            const user = findUserId.map(
                (e: any) => {
                    return {
                        user: {
                            uid: id,
                            name: e.name,
                            email: e.email,
                            phone: e.phone,
                            role: e.role
                        },
                        medico: {
                            id: e._id,
                            limit: e.limitacion,
                            medicamento: e.medicamento,
                            contacto: e.contacto,
                            eps: e.eps
                        }
                    }
                }
            )
            //* |-> Responderemos exito al usuario junto con la data de la consulta
            $response(
                res,
                {status: 200, succ: true, msg: 'Busqueda exitosa!!', data: user}
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al cliente un status 500
            $response(res, {status: 500, succ: false, msg: 'Ocurrio un problema... Verifica los logs'})
        }
    }
    //? -_ Actualizar usuario segun id
    const update_user = async(req: Request, res: Response) => {
        //* |-> Extraemos el id de los parametros de la url por la request
        const { id } = req.params
        //* |-> Desestructuramos la data de la request
        const {
            name,
            email,
            phone
        } = req.body
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscaremos si el nuevo email se encuentran en el sistema
            const findUserEmail: any = await find('users', '*', `email = '${email}'`)
            //* |-> Si retorna alguna informacion segun la proyeccion realizada retornaremos un 400 porque ya esta ocupado el email que ingreso
            if (findUserEmail.length > 0) {
                return $response(res, { status: 400, succ: false, msg: `Parece que en nuestro sistema ya existe un email parecido al ingresado ${email}` })
            }
            //* |-> Si no existe procederemos a actualizar la informacion del usuario
            await findByIdAndUpdate(
                'users', 
                `name = '${name}', email = '${email}', phone = '${phone}'`,
                id
            )            
            //* |-> Responderemos al usuario un mensaje de exito cuando se actualize el usuario
            $response(
                res,
                { status: 200, succ: true, msg: 'Usuario actualizado correctamente' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornamos al usuario un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisa los logs' }
            )
        }
    }
    //? -_ Eliminar usuario segun id
    const delete_user = async(req: Request, res: Response) => {
        //* |-> Capturamos el id del usuario suministrado por los parametros de la request
        const { id } = req.params
        //* |-> Control de errores tryCatch
        try {
            //* |-> Eliminamos la relacion que se encuentra en medico para la info adicional
            await findByIdAndDelete('medico', `id_user = '${id}'`)
            //* |-> Eliminamos el usuario permanentemente del sistema
            await findByIdAndDelete('users', `_id = '${id}'`)
            //* |-> Cuando se elimine responderemos exito al usuario
            $response(
                res,
                { status: 200, succ: true, msg: 'Se elimino correctamente el usuario' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario con un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... verifica los logs' }
            )
        }
    }
/***********/
// TODO: Exportacion del modulo
export {
    create_user,
    all_view_users,
    unique_view_user,
    update_user,
    delete_user
}