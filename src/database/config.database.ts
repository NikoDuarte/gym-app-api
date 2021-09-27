/***********/
//*! Importaciones
    //* |-> Mysql
    import mysql from 'mysql'
    //* |-> Variable de entono
    import { _host_db_, _name_db_, _user_db_, _pass_db_ } from '../environments/environments'
/***********/
//? -_ Configuracion del habiente
//* |-> Iniciamos las configuraciones para empezar la conexion
const connet = mysql.createPool({
    connectionLimit: 10,
    host: _host_db_,
    user: _user_db_,
    password: _pass_db_,
    database: _name_db_
})
//* |-> Establecemos conexion
/*connet.connect((err) => {
    if (err) {
        console.log('Error when staring dbms', err);
        return;
    }
    console.log('Success, dbms online');
})*/
/***********/
// TODO: Modulo de exportacion
export {
    connet
}