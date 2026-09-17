let archivos = [
    "./",
    "./index.html",
    "./implementacion.json",
    "./icon.svg",

    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js",

    "https://www.gstatic.com/firebasejs/12.19.0/firebase-database-compat.js"
];


self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open("mi-lista-v3").then(function(cache) {

            return cache.addAll(archivos);

        })

    );

});


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