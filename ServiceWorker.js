const cacheName = "DefaultCompany-TekTest-1.0";
const contentToCache = [
    "Build/TekTest.loader.js",
    "Build/TekTest.framework.js",
    "Build/TekTest.data",
    "Build/TekTest.wasm",
    "TemplateData/style.css"
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');

    e.waitUntil((async function () {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
        if (e.request.method !== 'GET') {
            // Nu cache-ui cererile POST și altele
            console.log(`[Service Worker] Fetching resource: ${e.request.url} (Not caching POST)`);
            return fetch(e.request);
        }

        // Încercă să găsești resursa în cache
        let response = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (response) {
            return response;
        }

        // Fetch resursa și cache-ui-o
        response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});