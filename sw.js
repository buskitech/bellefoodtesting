const CACHE_NAME = 'bellefood-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/script.min.js',
  '/food/jollofrice.jpg',
  '/food/peppersoup.jpg',
  '/food/suya.jpg',
  '/food/plantain.jpg',
  '/food/indomie.jpg',
  '/food/yampor.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

