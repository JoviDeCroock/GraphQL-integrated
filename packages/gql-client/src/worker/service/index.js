const url = 'http://localhost:3000/graphql';
const CACHE_NAME = 'Gql-Client-SW';
const CACHE_LOCATIONS = [
  './index.html',
  '/index.html',
  '/main.js'
];

function log(msg) {
  console.log(`[GQL-SW] - `, msg);
}

self.addEventListener('install', function(event) {
  log('Installing');
   // e.waitUntil(self.skipWaiting());
  // Cache persistence idea
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        log('Opened cache');
        return cache.addAll(CACHE_LOCATIONS);
      })
  );
});

self.addEventListener('activate', function(e) {
  log('Activated');
  // e.waitUntil(self.clients.claim());
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key!==CACHE_NAME) {
          log(`Removing old cache ${key}`);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

function writeToCache(event, response) {
  log('opening cache');
  caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
  log('updated cache');
}

function handleFetch(event) {
  return fetch(event.request).then(resp => {
    log('got response');
    if (!resp || resp.status > 300) return resp;
    writeToCache(event, resp);
    return resp;
  });
}

self.addEventListener('fetch', function(event) {
  if (event.request.url === url) {
    log(event.request);
    event.respondWith(
      caches.match(event.request)
        .then(res => {
          if (res) {
            handleFetch(event);
            return res;
          }
          return handleFetch(event);
        }
      )
    );
  }
});
