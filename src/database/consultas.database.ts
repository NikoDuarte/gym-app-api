/***********/
//*! Importaciones
    //* |-> Database
    import { connet } from "./config.database"
/***********/
// TODO: Definicion de controladores para la funcion de las rutas rest
    //? -_ Funcion que buscara en x tabla
    const find = (schema: string, proyec: string, cond?: string ) => {
        //* |-> Retornaremos una promesa que se encargara de devolvernos un valor en concreto por medio del resolve
        return new Promise((resolve, reject) => {
            //* |-> Establecemos conexion y realizamos la consulta pertinente a la tabla de la base de datos x
            connet.query(
                `SELECT ${proyec} FROM ${schema} ${ cond || cond !== '' ? `WHERE ${cond}` : '' }`,
                (err, rows) => { //* |-> Nos retornara o un error o las columnas que encuentra en la consulta
                    if(err) { throw err } //* |-> Si retorna un error matamos el proseso en seguida y retronamos el error
                    resolve(rows)
                }
            )
        })
    }
    //? -_ Funcion que buscara y unificara tablas
    /**
     * SELECT * FROM users as u INNER JOIN medico as m ON u._id = m.id_user WHERE u._id = 7
     */
    const findCompost = (proyec: string, schema: string, join: string, quest: string) => {
        //* |-> Retornaremos una promesa que resolvera el la data de la consulta
        return new Promise((resolve, reject) => {
            //* |-> Realizamos la conexion y la consulta nesesaria
            connet.query(
                //* |-> Sentencia sql
                `SELECT ${proyec} FROM ${schema} ${join} WHERE ${quest}`,
                //* |-> Nos retornara un error o el resultado de la consulta
                (err, rows) => {
                    //* |-> Si existe un error lo retornamos y matamos el proceso
                    if(err) { throw err }
                    //* |-> Si no hay ningun error resolveremos los campos encontrados
                    resolve(rows)
                }
            )
        })
    }
    //? -_ Funcion que buscara y actualizara por el id
    //UPDATE `users` SET `name` = 'Prueb1', `email` = 'prueba@p.co1', `phone` = '123456782', `password` = 'q123144' WHERE `users`.`_id` = 1
    const findByIdAndUpdate = (schema: string, set: string, quest: string) => {
        //* |-> Retornamermos una promesa que resolvera un booleano
        return new Promise((resolve, reject) => {
            //* |-> Realizamos la conexion y la consulta nesesaria para la actualizacion
            connet.query(
                //* |-> Sentencia sql
                `UPDATE ${schema} SET ${set} WHERE _id = ${quest}`,
                //* |-> Nos retornara un error o un exito
                (err)=>{
                    //* |-> Si encontramos un error lo retornamos y matamos el proceso
                    if(err) { throw err }
                    //* |-> Si no hay ningun error resolveremos un true
                    resolve(true)
                }
            )
        })
    }
    //? -_ Funcion que generara inserciones
    const save = (shcema: string, atrib: string, values: string) => {
        //* |-> Retornaremos una promesa que resolvera un elemento de el resultado de la insercion
        return new Promise((resolve, reject) => {
            //* |-> Creamos ña conexion y la consulta para la insercion nesesaria
            connet.query(
                //* |-> Consulta sql
                `INSERT INTO ${shcema} (${atrib}) VALUES (${values})`,
                //* |-> Retornara o un error o un resultado
                (err, r) => {
                    //* |-> Si retorna un error resolvemos un false y matamos el proceso
                    if (err) {
                        reject(false)
                        throw err
                    }
                    //* |-> si se efectua correctamente resolveremos la respuesta en su elemento insertId que devolvera el id 
                    resolve(r.insertId)
                }
            )
        })
    }
    //? -_ Funcion que eliminara una insercion hecha a x tabla
    /**
     * DELETE FROM `users` WHERE `users`.`_id` = 1
     */
    const findByIdAndDelete = (schema: string, quest: string) => {
        //* Retornaremos una promesa que resolvera un boolean
        return new Promise((resolve, reject) => {
            //* |-> Realizamos la conexion y la consulta para la eliminacion necesaria
            connet.query(
                //* |-> Consulta sql
                `DELETE FROM ${schema} WHERE ${quest}`,
                //* |-> Nos retornara un error o la continuacion del proceso
                (err: any) => {
                    //* |-> Si existe un error matamos el proceso y retornamos el error
                    if(err) { throw err }
                    //* |-> Si no existe un error resolveremos un true
                    resolve(true)
                }
            )
        })
    }
/***********/
// TODO: Exportacion del modulo
export {
    find,
    findByIdAndUpdate,
    save,
    findByIdAndDelete,
    findCompost
}