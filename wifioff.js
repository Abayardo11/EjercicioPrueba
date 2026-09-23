let archivos = [
    "./",
    "./index.html",
    "./offline.html",
    "./implementacion.json",
    "./icon.svg"
];


self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open("mi-lista-v6").then(function(cache) {

            return cache.addAll(archivos);

        })

    );

});



self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(nombres) {

            return Promise.all(

                nombres.map(function(nombre) {

                    if (nombre != "mi-lista-v6") {

                        return caches.delete(nombre);

                    }

                })

            );

        })

    );

});



self.addEventListener("fetch", function(event) {


    // Si se está intentando abrir una página

    if (event.request.mode == "navigate") {

        event.respondWith(

            fetch(event.request)

                .catch(function() {

                    return caches.match("./offline.html");

                })

        );

        return;

    }


    // Para los demás archivos usamos la caché

    event.respondWith(

        caches.match(event.request).then(function(respuesta) {

            if (respuesta) {

                return respuesta;

            }

            return fetch(event.request);

        })

    );

});