/***********/
//! Importaciones
    //* |-> Dotenv
    import dotenv from 'dotenv'
/***********/
// TODO: Inicializacion del lector variables de entorno
dotenv.config()
/***********/
//? -_ Configuracion de variables no exportables
/**
 * 
 */
//? -_ Configuracion de variables exportables
const _port_: number = Number(process.env.PORT)
const _host_db_: string = String(process.env.HOST_DB)
const _user_db_: string = String(process.env.USER_DB)
const _pass_db_: string = String(process.env.PASS_DB)
const _name_db_: string = String(process.env.NAME_DB)
const _url_concat_: string = String(process.env.URL_CONCAT)
const _secrect_token_: string = String(process.env.SECRECT_TOKEN)
/***********/
// TODO: Modulo de exportacion
export {
    _port_,
    _host_db_,
    _user_db_,
    _pass_db_,
    _name_db_,
    _url_concat_,
    _secrect_token_
}