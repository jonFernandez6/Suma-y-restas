const CACHE_NAME = 'aprendizaje-ultra-v4d';
const ASSETS = [
  './',
  './index.html?v=4d',
  './manifest.webmanifest',
  './sw.js',
  './icon-192.png',
  './icon-512.png'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/index.html')) {
    event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html?v=4d')));
  } else {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
  }
});