// La Piedra Bruta del Aprendiz · trabajo sin conexión
// Al publicar cambios, sube este número (v2.2, v2.3...) para que las apps instaladas se actualicen.
const VERSION = "piedra-bruta-v3.0";
const APP = [
  "./", "index.html", "temas.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/marcellus-sc-400.woff", "fonts/marcellus-400.woff",
  "fonts/alegreya-400.woff", "fonts/alegreya-500.woff", "fonts/alegreya-400-italic.woff",
  "fonts/alegreya-sans-500.woff", "fonts/alegreya-sans-700.woff"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Página y contenido de las fichas: primero la red, para recibir correcciones; sin conexión, la copia guardada.
  if (req.mode === "navigate" || req.url.endsWith("temas.js")) {
    const key = req.mode === "navigate" ? "index.html" : "temas.js";
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(k => k.put(key, c)); return r; })
      .catch(() => caches.match(key)));
    return;
  }
  // Tipografías e íconos: la copia guardada primero.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
