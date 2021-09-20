/***********/
// TODO: Definicion de interfaces
    //* |-> Informacion de la respuesta servidor cliente
    interface _info_res {
        status: number,
        succ: boolean,
        msg: string,
        data?: any
    }
    //* |-> Data nesesaria para el envio de correos electronicos
    interface _options_mail {
        from: string,
        to: string,
        subject: string,
        text?: string,
        html?: string,
        attachments?: any[]
    }
/***********/
// TODO: Exportacion del modulo
export {
    _info_res,
    _options_mail
}