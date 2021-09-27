/***********/
//*! Importaciones
    //* |-> Request, Response de express
    import { Request, Response } from 'express'
    //* |-> Servicios ( response )
    import { $response } from '../service/response.service';
    //* |-> Bcrypt
    import bcrypt from 'bcrypt';
    //* |-> Consultas find
    import { find, findByIdAndUpdate } from '../database/consultas.database';
    //* |-> Generar JWT
    import { generateJWT } from '../helper/jwt.helper';
    //* |-> Templates email
    import { re_password_html } from '../templates/ask_pass.templates';
    //* |-> Interfaces
    import { _options_mail } from '../interfaces/interface.interfaces';
    //* |-> Variables de entorno
    import { _email_ } from '../environments/environments';
    //* |-> Servicios envio de emial
    import { newEmailSend } from '../service/mailer.service';
    import { getSideBar } from '../helper/menu.helper';
/***********/
// TODO: Definicion de controladores para la funcion de las rutas rest
    //? -_ Funcion que realizara el login de un usuario
    const login = async(req: Request, res: Response) => {
        //* |-> Desestructuramos la request
        const { email, password } = req.body
        //* |-> Control de errores trycatch
        try {
            //* |-> Validamos que exista el usuario
            const findUserEmail: any = await find('users', '*', `email = '${email}'`)
            //* |-> Si no eixste o devulve un arreglo vacio respondemos al usuario
            if (findUserEmail.length === 0) {
                return $response(
                    res,
                    {status: 404, succ: false, msg: 'Usuario no encontado en el sistema'}
                )
            }
            //* |-> Mappeamos el resultado con el fin de dejar la informacion mas relevante dentro del arreglo que retorna
            const user = findUserEmail.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        name: e.name,
                        email: e.email,
                        password: e.password,
                        role: e.role
                    }
                }
            )
            //* |-> Si existe el usuario validamos las contraseñas por el bcrypt
            const comparePass = bcrypt.compareSync(password, user[0].password)
            //* |-> Si no se comparan las contraseñas retornaremos al usuario un 404
            if (!comparePass) return $response(res, { status: 404, succ: false, msg: 'Usuario no encontrado en el sistema' })
            //* |-> Si toda la informacion esta bien generaremos el token de ingreso
            const token = await generateJWT(user[0]._id, '4h')
            //* |-> Respondemos exito al usuario junto con el token
            $response(res, { status: 200, succ: true, msg: `Bienvenido ${user[0].name}`, data: {token, menu: getSideBar(user[0].role)} })
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al cliente que quiere hacer peticion un error 500
            $response(
                res,
                {status: 500, succ: false, msg: 'Ocurrio un problema... revisar los logs'}
            )
        }
    }
    //? -_ Funcion que realizara para renovar el token del usuario
    const renew_token = async(req: Request, res: Response) => {
        //* Extraemos la informacion del token pormedio de la request
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos el usuario por el id suministrado
            const findUserEmail: any = await find('users', '*', `_id = '${uid}'`)
            //* |-> Mappeamos el resultado con el fin de dejar la informacion mas relevante dentro del arreglo que retorna
            const user = findUserEmail.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        name: e.name,
                        email: e.email,
                        role: e.role
                    }
                }
            )
            //* |-> Generaremos el nuevo token
            const new_token = await generateJWT(uid, '5h')
            //* |-> Respondemos al usuario un mensaje de exito junto con el token
            $response(
                res,
                { status: 200, succ: true, msg: 'Renovacion exitosa', data: {token: new_token, user} }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... revisa los logs' }
            )
        }
    }
    //? -_ Funcion que enviara un email para restablecer la contraseña
    const ask_for_pass = async(req: Request, res: Response) => {
        //* |-> Desestructuramos el email del cuerpo de la request
        const { email } = req.body
        //* |-> Control de errores tryCatch
        try {
            //* |-> Buscamos el usuario en el sistema
            const findUserEmail: any = await find('users', '*', `email = '${email}'`)
            //* |-> Si no retorna ningun dato le enviaremos al usuario un status 404
            if (findUserEmail.length === 0) $response(res, { status: 404, succ: false, msg: 'Usuario no encontrado en el sistema' })
            //* |-> Mappeamos el resultado de la info de la busqueda
            const user = findUserEmail.map(
                (e: any) => {
                    return {
                        _id: e._id,
                        name: e.name,
                    }
                }
            )
            //* |-> Si existe el usuario generaremos el token
            const token: any = await generateJWT(user[0]._id, '3h')
            //* |-> Generamos el template que enviaremos por correo
            const t = await re_password_html(user[0].name, token)
            //* |-> Cuerpo del correo electronico
            const data: _options_mail = {
                from: `Gym Style <${_email_}>`,
                to: email,
                subject: 'Solicitud restablecimiento de contraseña',
                html: t
            }
            //* |-> Enviamos el correo
            await newEmailSend(res, data)
            //* |-> Respondemos exito al usuario
            $response(res, { status: 200, succ: true, msg: 'Envio de restablecimiento exitoso' })
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al cliente un status 500
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revasar los los' }
            )
        }
    }
    //? -_ Funcion que cambiara la contraseña de un usuario
    const re_password = async(req: Request, res: Response) => {
        //* |-> Extraemos la contraseña de la request
        const { password } = req.body
        //* |-> Extraemos el id del token
        const { uid }: any = req
        //* |-> Control de errores tryCatch
        try {
            //* |-> Encriptamos la contrasela
            const decode = bcrypt.genSaltSync()
            const new_pass = bcrypt.hashSync(password, decode)
            //* |-> actualizaremos la contraseña del usuario
            await findByIdAndUpdate(
                'users',
                `password = '${new_pass}'`,
                uid
            )
            //* |-> Respondemos al usuario un mensaje de exito
            $response(
                res,
                { status: 200, succ: true, msg: 'Contraseña actualizada exitosamente' }
            )
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Retornamos un error 500 al cliente
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisar los logs' }
            )
        }
    }
/***********/
// TODO: Exportacion del modulo
export {
    login,
    renew_token,
    ask_for_pass,
    re_password
}