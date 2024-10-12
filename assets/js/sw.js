const cacheName = 'v1';
const cacheAssets = [
  './index.php',
  './game.php',
  './player_count.php',
  './manifest.json',
  './pregame.php',
  './theme_choice.php',
  './usernames.php',
  './README.md',
  './assets/bdd/local.php',
  './assets/bdd/prod.php',
  './assets/js/deviceAutorisationIOS.js',
  './assets/js/front.js',
  './assets/js/landscape.js',
  './assets/js/sw.js',
  './assets/php/functions.php',
  './assets/styles/main.css',
  './assets/styles/landscape.css',
  './assets/img/acteurs.png',
  './assets/img/camera-video.png',
  './assets/img/camera-video.png',
  './assets/img/cell-phone-svgrepo-com.svg',
  './assets/img/clap.png',
  './assets/img/films.png',
  './assets/img/Guess_what2x.png',
  './assets/img/Guess_what192.png',
  './assets/img/Guess_what512.png',
  './assets/img/Guess_what512.png',
  './assets/img/Guesswhatalpha@2x.png',
  './assets/img/jeux.png',
  './assets/img/musique.png',
  './assets/img/note-de-musique.png',
  './assets/img/une-manette.png'

];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});