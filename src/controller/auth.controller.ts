/***********/
//*! Importaciones
    //* |-> Request, Response de express
    import { Request, Response } from 'express'
    //* |-> Servicios ( response )
    import { $response } from '../service/response.service';
    //* |-> Bcrypt
    import bcrypt from 'bcrypt';
    //* |-> Consultas find
    import { find } from '../database/consultas.database';
    //* |-> Generar JWT
    import { generateJWT } from '../helper/jwt.helper';
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
                    password: e.password
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
        $response(res, { status: 200, succ: true, msg: `Bienvenido ${user[0].name}`, data: token })
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
/***********/
// TODO: Exportacion del modulo
export {
    login
}