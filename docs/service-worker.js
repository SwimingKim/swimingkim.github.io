importScripts("/precache-manifest.372da0d7b9b7af92a8dd039644bcb752.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


self.addEventListener("message", msg => {
    if (msg.data.action == 'skipWaiting') {
        self.skipWaiting();
    }
})
