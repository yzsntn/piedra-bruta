// La Piedra Bruta del Aprendiz · trabajo sin conexión
// Al publicar cambios, sube este número (v2.2, v2.3...) para que las apps instaladas se actualicen.
const VERSION = "piedra-bruta-v5.2";
const APP = [
  "./", "index.html", "temas.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "fonts/bodoni-moda-500.woff2", "fonts/bodoni-moda-500-italic.woff2", "fonts/jost.woff2",
  "assets/cantero-piedra.jpg", "assets/cantero-mandil.jpg", "assets/delfos.jpg", "assets/cantera-detalle.jpg"
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
  // Tipografías, imágenes e íconos: la copia guardada primero.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
