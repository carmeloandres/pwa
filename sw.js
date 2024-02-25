
//const CACHE_NAME = 'cache-1';

// crearemoa diferentes nombres de cache para organizar mejor los ficheros
// de la cache, además los versionamos para poder modificar la cache a medida
// que el proyecto crece.

// en la cache static almacenamos todo nuestro appShell, los ficheros necesarios
// para el correcto funcionamiento de la aplicación. Se carga al inicio.
const CACHE_STATIC_NAME = 'static-v2';

// en la cache dinamic se cargan el resto de ficheros, es donde se cargaran
// cualquier petición a la web que no se encuentre en cache, se solicita y tras
// ser servida se almacena en la cache dynamic.
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

// en la cache inmutable se almacenarian dependencias de terceros que no cambiran ya.
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

function limpiarCache( cacheName, numeroItems ){

    // abrimos la cache
    caches.open( cacheName )
        .then( cache => {
            // obtengo un registro de todos los elementos que estan en la cache
            cache.keys()
                .then( keys => {
                    // si el arreglo keys tiene más componenets que numeroItems 
                    if (keys.length > numeroItems){
                        console.log(keys);
                        // se borra el primero y se llama recursivamente a limpiarCache
                        cache.delete( keys[0]).then( limpiarCache(cacheName,numeroItems))
                    }
                })
        })

}

// En el evento de instalación del service worker ejecutamos la siguiente funcionalidad
self.addEventListener('install',e =>{
    // almacenamos la promesa de apertura de cache en cachProm
    // y creamos la cache Static
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then( cache => {
            // cuando la cache-1 se ha creado
            // ejecutamos la promesa cache.addAll y la devolvemos para que se almacene en caheProm
            return cache.addAll([
                './',
                './index.html',
                './css/style.css',
                './img/main.jpg',
                './js/app.js'
            ]);
        });

    // Creamos la cache inmutable, con el bootstrap
    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => {
            return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        })

    // antes de salir de la funcionalidad nos aseguramos que las caches ha sido creada y se han almacenado los ficheros
    // para evitar que se acceda a ellas cuando todavia no sabemos si ya esta creada.
    e.waitUntil( Promise.all([cacheProm, cacheInmutable] ));
});

self.addEventListener('fetch', e => {

    // 1- Cache Only
    // Esta estrategia va ha ser usada cuando queramos que toda la aplicación se sirva desde la cache
    // no se accede nunca a la web

    // esta instrucción busca en las caches de la aplicación la solicitud del evento y lo retorna como respuesta
//    e.respondWith( caches.match( e.request ));
    // para solucionar un error que se produce hay que añadir el './' a la cache para que pueda acceder tambiém
  
    // Debido a un error en el almacenamiento en la cache, no se puede almacenar peticiones de extensiones chrome
    // si la petición es hecha por una extención de chrome, no tiene http, por ello
    // verifico que la petición tenga http y si no interrumpo la ejecucion.
//    if ( ! (e.request.url.indexOf('http') === 0)) return;

    

    // 2 - Cache  with Network Fallback
    // vemos si la request existe en la cache
    const respuesta = caches.match(e.request)
        .then( res => {

            if ( res ) return res;

            // No existe en cache el archivo, hay que ir a la web
            console.log('No existe',e.request.url);

            // solicitamos el fichero a la web 
            return fetch( e.request )
                .then( newResp => {

                    caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
//                        cache.put( e.request.url, newResp);
                        console.log (e.request);
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME,5);
                    });

                    // como usamos dos veces el newResp hay que clonarlo
                    return newResp.clone();
                })
        });



    e.respondWith( respuesta );
});