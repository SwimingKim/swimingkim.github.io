importScripts("/precache-manifest.3723b4aa9750c9a52cb93b0de0075906.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


self.addEventListener("message", msg => {
    if (msg.data.action == 'skipWaiting') {
        self.skipWaiting();
    }
})
