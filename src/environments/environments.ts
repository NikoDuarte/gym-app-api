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
    //* |-> Servidor
    const _port_: number = Number(process.env.PORT)
    const _url_concat_: string = String(process.env.URL_CONCAT)
    const _secrect_token_: string = String(process.env.SECRECT_TOKEN)
    const _email_: string = String(process.env.EMAIL_CORP)
    //* |-> DBMS
    const _host_db_: string = String(process.env.HOST_DB)
    const _user_db_: string = String(process.env.USER_DB)
    const _pass_db_: string = String(process.env.PASS_DB)
    const _name_db_: string = String(process.env.NAME_DB)
    //* |-> Google
    const _google_client_id_: string = String(process.env.CLIENT_GOOGLE_ID)
    const _google_secret_id_: string = String(process.env.SECRET_GOOGLE_ID)
    const _redirect_url_google_: string = String(process.env.CLIENT_REDIRECT_URI)
    const _refresh_token_google_: string = String(process.env.REFRESH_TOKEN_GOOGLE)
/***********/
// TODO: Modulo de exportacion
export {
    _port_,
    _host_db_,
    _user_db_,
    _pass_db_,
    _name_db_,
    _url_concat_,
    _secrect_token_,
    _google_client_id_,
    _google_secret_id_,
    _redirect_url_google_,
    _refresh_token_google_,
    _email_
}