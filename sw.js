var CACHE_NAME = 'mine-mandarin-v9';
var CDN_CACHE_NAME = 'mine-mandarin-cdn-v9';

// Every local file the app needs offline
var STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './words.js',
  './manifest.json',
  './icon-192v2.png',
  './icon-512v2.png',
  './icon-167v2.png',
  './icon-180v2.png'
];

// Install: cache all static assets
self.addEventListener('install', function(event) {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      console.log('[SW] Install complete');
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME && key !== CDN_CACHE_NAME; })
            .map(function(key) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
      );
    }).then(function() {
      console.log('[SW] Activated, claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch: cache-first for everything
self.addEventListener('fetch', function(event) {
  // Skip non-GET
  if (event.request.method !== 'GET') return;
  // Skip non-http
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Not in cache — fetch from network and cache the response
      return fetch(event.request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Decide cache bucket
        var isLocal = event.request.url.includes(self.location.origin);
        var cacheName = isLocal ? CACHE_NAME : CDN_CACHE_NAME;

        var responseToCache = networkResponse.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(function() {
        // Network failed, not in cache — return index.html for navigation requests
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
