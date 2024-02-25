

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

/*
// si el objeto Window soporta el uso de caches
if (window.caches){

    // abre el espacio de caches llamado 'prueba-1, si no existe, crealo'
    caches.open('prueba-1');
    // podemos crear tantos espacios de cache como consideremos, teniendo en 
    // cuenta que ocuparemos más memoria del dispositivo.
    caches.open( 'prueba-2');

    // podemos comprobar si un espacio de cache existe
    // esta comprobación retorna una promesa
    caches.has('prueba-3').then( existe => console.log('prueba-3, existe? : ',existe));

    // podemos borrar un espacio de cache con el siguiente comando
    caches.delete('prueba-1').then(console.log)

    // cuando creamos una cache podemos añadir contenido
    caches.open('cache-v1.1').then (cache => {

        // para añadir contenido, guardar ficheros en nuestra cache, procedemos del siguiente modo
        cache.add('/index.html') // añadiriamos el indes.html a la cache 
        .then(() => {cache.delete('/index.html')}); // podemos borrar un fichero, pero debemos esperar a que finalize la promesa.

        //otra forma de añadir fichero a la cache es utilizar un arreglo, del siguiente modo
        cache.addAll([
            './index.html',
            './css/style.css',
            './img/main.jpg'
        ]) 
        .then( () => {
            // podemos reemplazar el contenido de la cache de la siguiente manera
            cache.put( 'index.html',new Response('Hola Mundo'));
        });

        // Para leer un fichero de la cache utilizo el siguiente comando:
        cache.match('./index.html')
            .then( res => {
                res.text().then( console.log );
            });

        // como saber cuantas caches tenemos creadas en nuestra pwa
        caches.keys().then( keys => {
            console.log(keys);
        });
    });
} */