// Archivos que queremos guardar para usar sin internet
let archivos = [
    "./",
    "./Index.html",
    "./Implementacion.json",
    "./icon.svg"
];

// Instalar el Service Worker
self.addEventListener("install", function(event) {

    event.waitUntil(
        caches.open("mi-lista").then(function(cache) {
            return cache.addAll(archivos);
        })
    );

});

// Usar los archivos cuando no hay internet
self.addEventListener("fetch", function(event) {

    event.respondWith(
        caches.match(event.request).then(function(respuesta) {

            if (respuesta) {
                return respuesta;
            }

            return fetch(event.request);
        })
    );

});

