/************/
//*! Importaciones
    //* |-> JsonWebToken
    import jwt from 'jsonwebtoken'
    //* |-> Variables de entorno { _secrect_token_ }
    import { _secrect_token_ } from '../environments/environments'
/************/
//? -_ Funcion que generara el token
const generateJWT = (_id: number, time: string) => {
    //* |-> Retornaremos una promesa que nos resolvera el token
    return new Promise((resolve, reject) => {
        //* |-> Construimos el payload o informacion interna del token
        const payload = {
            uid: _id
        }
        //* |-> Generaremos el token
        jwt.sign(
            //* |-> Recibe el payload o la informacion interna
            payload, 
            //* |-> recibe la lave secreata que nosotros creamos para firmar los tokens
            _secrect_token_, 
            //* |-> El tiempo de expiracion del token
            { expiresIn: time },
            //* |-> Retornara o un error o el token
            (err, token) => {
                //* |-> Si existe un error retornaremos y mataremos la continuacion del programa
                if (err) {
                    reject('No se pudo generar el token')
                }
                //* |-> Si no existe ningun error resolvemos el token
                resolve(token)
            }
        )
    })
}
//? -_ Funcion que permitira ver la informacion de un token
const viewJWT = async(token: string) => {
    //* |-> Generamos una variable en donde se guardara el contenido del token
    let data: any = null
    //* |-> Verificamos el token y extraemos la informacion
    await jwt.verify(
        //* |-> Recibe el token
        token, 
        //* |-> Recibe la llave secreta con la que firmamos los tokens
        _secrect_token_,
        //* |-> Retornara un error o la informacion del token
        (err, decode) => {
            //* |-> Si existe un error lo mostramos por consola y matamos el proceso
            if(err) return console.log(err);
            //* |-> Si no existe ningun error lo retornamos
            return data = decode
        }
    )
    return data
}
/**********/
// TODO: Exportacion del modulo
export {
    generateJWT,
    viewJWT
}