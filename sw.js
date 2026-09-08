const CACHE = 'schede-v2';
const SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

const put = (req, res) => caches.open(CACHE).then(c => c.put(req, res)).catch(() => {});

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.hostname === 'api.anthropic.com') return;           // la chiamata al modello non passa mai dalla cache

  if (url.origin === location.origin) {
    // file dell'app: prima la rete (così gli aggiornamenti arrivano subito), cache se offline
    e.respondWith(
      fetch(request).then(res => { if (res.ok) put(request, res.clone()); return res; })
        .catch(() => caches.match(request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // font e pdf.js: cache dopo il primo uso, così lo studio funziona offline
  e.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(res => { put(request, res.clone()); return res; }))
  );
});
