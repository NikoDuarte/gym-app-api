//*? -_ Template de verificacion de email
export const re_password_html = (username: string, token: string) => {
    //* -> Armar el template
    const template: string = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <style>
        table, td, div, h1, p {font-family: Arial, sans-serif;}
      </style>
    </head>
    <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
            <tr>
                <td align="center" style="padding:0;">
                    <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                        <tr>
                            <td align="center">
                                <div style="padding:40px 0 30px 0; background-image: url(https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?cs=srgb&dl=pexels-victor-freitas-703016.jpg&fm=jpg); background-size: 100% 100%;clip-path: polygon(0 0, 100% 0%, 80% 100%, 20% 100%);min-height: 300px;">
                                    <h1 style="color: white;">
                                        Gym Style
                                    </h1>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:36px 30px 42px 30px;">
                              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 36px 0;color:#153643;">
                                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                                        Hola ${username}!
                                    </h1>
                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                        Parece que has olvidado tu contraseña... No te preocupes en GymStyle siempre le brindaremos la mejor atencion, restablece tu contraseña dando click en el siguiente boton.
                                    </p>
                                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;" align="center">
                                        <button style="padding: .375rem .75rem;border: 0px;background-color: #F75A00;color: #fff">
                                            <a href="http://localhost:1805/re-password/${token}" style="color:#fff;text-decoration:none;">
                                                Restablecer!
                                            </a>
                                        </button>
                                    </p>
                                  </td>
                                </tr>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
    //* -> Retornar el template
    return template
}