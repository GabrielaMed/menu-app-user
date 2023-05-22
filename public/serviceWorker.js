//STORAGE OF BROWSER
const CACHE_NAME = 'cache-menu-app';
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

//installation
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(urlsToCache);
    })()
  );
});

// listen for request
// self.addEventListener('fetch', (evt) => {
//   // check if request is made by chrome extensions or web page
//   // if request is made for web page url must contains http.
//   if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

//   evt.respondWith(
//     caches
//       .match(evt.request)
//       .then(
//         (cacheRes) =>
//           cacheRes ||
//           fetch(evt.request).then((fetchRes) =>
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(evt.request.url, fetchRes.clone());
//               // check cached items size
//               limitCacheSize(CACHE_NAME, 75);
//               return fetchRes;
//             })
//           )
//       )
//       .catch(() => caches.match('/fallback'))
//   );
// });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Check if the requested resource is available in the cache
      if (response) {
        return response; // Return the cached response
      }

      // If the resource is not available in the cache, fetch it from the network
      return fetch(event.request).then(function (networkResponse) {
        // Cache the fetched response for future use
        caches.open('my-cache').then(function (cache) {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse; // Return the fetched response
      });
    })
  );
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
