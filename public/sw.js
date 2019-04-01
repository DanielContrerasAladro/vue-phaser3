var cacheName = 'phaser-v3';
var filesToCache = [
  '/',
  '/index.html',
  '/img/logo.png',
  '/img/icon-192.png',
  '/img/icon-256.png',
  '/img/icon-512.png',
  '/js/game.js',
  '/css/style.css'
];
 
self.addEventListener('install', function(event) {
  console.log('sw vue+phaser install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw vue+phaser caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw vue+phaser fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('sw vue+phaser activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('sw vue+phaser removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});