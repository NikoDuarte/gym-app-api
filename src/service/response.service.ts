/***********/
//*! Importaciones
    //* |-> Request, Response de express
    import { response, Response } from 'express'
    //* |-> Interfaces
    import { _info_res } from '../interfaces/interface.interfaces'
/***********/
// TODO: Definicion de controladores para la funcion de las rutas rest
    //? -_ Creacion de usuarios
    const $response = (res: Response = response, info: _info_res) => {
        //* |-> Respuesta del usuario
        res.status(info.status).json({
            //* { success } |-> indicara el estado de la peticion de forma booleana (false, true)
            success: info.succ,
            //* { msg } |-> llevara un mensaje que daremos para entender el error
            msg: info.msg,
            //* { data } |-> Esta devoldera informacion de una peticion que la requiera
            data: info.data
        })
    }
/***********/
// TODO: Exportacion del modulo
export {
    $response
}