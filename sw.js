importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox){
    console.log("Workbox loaded");
    workbox.precaching.precacheAndRoute([]);
}
//Cache images 
workbox.routing.registerRoute(
    /(.*)img(.*)\.(?:png|webp|jpg)/,
    new workbox.strategies.CacheFirst({
        cacheName: "img",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            })
        ]
    })
);

//Cache js and css

workbox.routing.registerRoute(
    /.*\.(?:css|js|scss|)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets",
    })
);

//cache google fonts

workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],
    })
);

// add offline analytics
workbox.googleAnalytics.initialize();

/* Install a new service worker and have it update
and control a web page as soon as possible
*/

workbox.core.skipWaiting();
workbox.core.clientsClaim();

