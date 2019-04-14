const CACHE_NAME = 'Gql-Client-SW';

self.addEventListener('install', function(event) {
  console.log('installing');
  // Cache persistence idea
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache', cache);
        return cache.addAll(['/', '/src', 'http://localhost:3000/graphql']);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('got fetch', event.request);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log(event.request, response);
        // Cache hit - return response and refetch
        if (response) {
          handleData(event.request);
          return response;
        }
        return fetch(event.request).then((res) => {
          console.log('got response');
          if (!response || response.status > 300) return response;
          const responseToCache = response.clone();
          // Only cache upon success
          console.log('opening cache');
          caches.open(CACHE_NAME).then(c => c.put(event.request, responseToCache));
          return response;
        });
      }
    )
  );
});
