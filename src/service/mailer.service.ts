/***********/
//*! importaciones
    //* |-> Request, response de express
    import { Request, Response } from 'express'
    //* |-> nodemailer
    import mailer from 'nodemailer'
    //* |-> Google apis
    import { google } from 'googleapis'
    //* |-> Variables de entorno
    import { _google_client_id_, _google_secret_id_, _redirect_url_google_, _refresh_token_google_ } from '../environments/environments'
    //* |-> Servicios Respuesta
    import { $response } from './response.service'
    //* |-> Interface
    import { _options_mail } from '../interfaces/interface.interfaces'
//? -_ Funciones exportables
    //* |-> Enviar un email
    const newEmailSend = async(res: Response, data: _options_mail) => {
        //* -> Control de errores tryCatch
        try {
            //* -> Creamos la configuracion de autenticacion del oAuth2
            const auth2 = new google.auth.OAuth2(
                _google_client_id_,
                _google_secret_id_,
                _redirect_url_google_
            )
            //* -> Mandamos las credenciales
            await auth2.setCredentials({
                //* -> Enviamos el token refresh
                refresh_token: _refresh_token_google_
            })
            //* -> obtenemos el token que nos proporciona google
            const acTo: any = await auth2.getAccessToken()
            //* -> Configurar transporte
            const configTransport = await mailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'digitalteamcode@gmail.com',
                    clientId: _google_client_id_,
                    clientSecret: _google_secret_id_,
                    refreshToken: _refresh_token_google_,
                    accessToken: acTo
                }
            })
            //* -> envio del email
            const send = await configTransport.sendMail(data)
            //* -> Respuesta del usuario
            console.log('Email enviado con exito', send);
        } catch (err) {
            //*! Imprimimos el error por consola
            console.log(err);
            //*! Respondemos al usuario un mensaje de error
            $response(
                res,
                { status: 500, succ: false, msg: 'Ocurrio un problema... Revisa los logs' }
            )
        }
    }
// TODO: Modulo de exportacion
export {
    newEmailSend
}