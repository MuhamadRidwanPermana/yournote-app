// const CACHE_NAME = 'SW-001';
// const toCache = [
//   '/',
//   'manifest.json',
//   'register.js',
//   'icon.png',
// ];

// let deferredPrompt;
// self.addEventListener("beforeinstallprompt", (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
  
//   // showInstallPromotion();
// });
// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//     .then(function (cache) {
//       return cache.addAll(toCache)
//     })
//     .then(self.skipWaiting())
//   )
// })
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//     .catch(() => {
//       return caches.open(CACHE_NAME)
//         .then((cache) => {
//           return cache.match(event.request)
//         })
//     })
//   )
// })
// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys()
//     .then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== CACHE_NAME) {
//           console.log('[ServiceWorker] Hapus cache lama',
//             key)
//           return caches.delete(key)
//         }
//       }))
//     })
//     .then(() => self.clients.claim())
//   )
// })

// service-worker.js

// Define the cache name
const CACHE_NAME = 'react-pwa-cache';

// Define the URLs to cache
const urlsToCache = [
  '/',
  '/home',
  '/about',
  '/create',
  '/edit/:id',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/public/icon_app.svg',
  '/manifest.json',
  '/register.js',
  '/service-worker.js',
  '/icon.png',
  '/favicon.ico',
  '/icon-512.png',
  '/icon-192.png',
  '/icon-32.png',
  '/icon-16.png',
  // Add other assets you want to cache here
];

// Install event
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      // Perform a fetch
      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Open the cache
        caches.open(CACHE_NAME).then((cache) => {
          // Cache the response
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
