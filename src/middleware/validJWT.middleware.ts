/***********/
//*! Importaciones
    //* |-> Express { request, response, nextfuntion }
    import { Request, Response, NextFunction } from 'express'
    //* |-> JsonWebToken
    import jwt from 'jsonwebtoken'
    //* |-> Response service
    import { $response } from '../service/response.service'
    //* |-> Variables de entorno
    import { _secrect_token_ } from '../environments/environments'
    //* |-> Helpers viewToken
    import { viewJWT } from '../helper/jwt.helper'
    //* |-> Consultas de la base de datos
    import { find } from '../database/consultas.database'
/***********/
//? -_ Funcion que validara el token
const validJWT = async( req: Request | any, res: Response, next: NextFunction ) => {
    //* |-> Leeremos el token entrante en la cabecera de la peticion (headers)
    const token = req.header('auth-gym')
    //* |-> Comprobamos que el token este
        //* |-> Si no esta devolveremos un error
        if (!token || token == '') {
            return $response(res, { status: 401, msg: 'Peticion no autorizada', succ: false })
        }
    //* |-> Control de errores tryCatch
    try {
        //* |-> Extraemos la informacion del token
        const { uid } = await viewJWT(token)
        //* |-> Validamos que el usuario exista en el sistema
        const findUserId: any = await find('users', '*', `_id = '${uid}'`)
        //* |-> Si el usuario no existe o esta vacia la respuesta
        if (!findUserId || findUserId.length === 0) {
            //* |-> Respondemos al usuario 400
            return $response(res,{status: 400,succ: false,msg: 'Parece que el usuario no esta inscrito en nuestro sistema porfavor validar...'})
        }
        //* |-> Si el usuario si existe mandaremos en la request el uid del usuario
        req.uid = uid
        //* |-> Continuamos con la fincionalidad adicional
        next()
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al usuario un estado 500
        $response(res, {
            status: 500,
            succ: false,
            msg: 'Ocurrio un problema... Verifica los logs'
        })
    }
}
//? -_ Funcion que validara que el usuario sea administrador
const  validAdminRole = async(req: Request | any, res: Response, next: NextFunction) => {
    //* |-> Extraemos el id de la request
    const uid: string = req.uid
    //* |-> Control de errores trycatch
    try {
        //* |-> Comprobamos que el usuario sea de role admin
        const findUserId: any = await find('users', '*', `_id = '${uid}' AND role = 'ADMIN-ROLE'`)
        //* |-> Si no cumple la condicion responderemos 401
        if (!findUserId || findUserId.length === 0) {
            return $response(res, {status: 401, succ: false, msg: 'Peticion no autorizada'})
        }
        //* |-> Si si retorna datos continuaremos con la funcionalidad
        next()
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornaremos una respuesta servidor cliente con status 500
        $response(
            res,
            {
                status: 500,
                succ: false,
                msg: 'Ocurrio un problema... Verifica los logs'
            }
        )
    }
}
/************/
// TODO: Exportacion del modulo
export {
    validJWT,
    validAdminRole
}