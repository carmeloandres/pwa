
self.addEventListener('fetch',event => {

    // Creamos una respuesta por defecto
//    const offLineResp = new Response(`
//    
//        Bienvenido a mi pagina web
//
//        Disculpa, pero para usarla necesitas conexion internet
//    `);

    const offLineResp = new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
    
    </head>
    <body class="container p-3">
        <h1>OffLine Mode</h1>
    </body>
    </html>
    `,{
        headers:{
            'content-type': 'text/html'
        }
       
    });

    const resp = fetch(event.request)
    // si la petición falla se responde con la respuesta por defecto
                    .catch( () => offLineResp )

    event.respondWith( resp );

});

