/***********/
// TODO: Definicion de interfaces
    //* |-> Informacion de la respuesta servidor cliente
    interface _info_res {
        status: number,
        succ: boolean,
        msg: string,
        data?: any
    }
/***********/
// TODO: Exportacion del modulo
export {
    _info_res
}