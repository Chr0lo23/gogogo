const cacheName = "DefaultCompany-transaction-0.1";
const contentToCache = [
    "Build/WebGL Builds.loader.js",
    "Build/WebGL Builds.framework.js",
    "Build/WebGL Builds.data",
    "Build/WebGL Builds.wasm",
    "TemplateData/style.css"
];

// Instalarea Service Worker-ului
self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

// Gestionarea cererilor
self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
        // Exclude cererile POST de la caching și trimite-le direct
        if (e.request.method !== 'GET') {
            return fetch(e.request);
        }

        // Încearcă să recuperezi din cache pentru cererile GET
        let response = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (response) {
            return response;
        }

        // Fetch din rețea și cache dacă este reușit
        try {
            response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            // Cache doar răspunsurile reușite
            if (response.ok) {
                cache.put(e.request, response.clone());
            }
            return response;
        } catch (error) {
            console.error('Fetch failed; returning offline page instead.', error);
            // Opțional, returnează o pagină offline sau alt fallback
            return new Response('Not found', { status: 404 });
        }
    })());
});