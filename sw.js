// Mathefix Service Worker: Netz zuerst, Cache als Ersatz → nach dem ersten
// Besuch funktioniert die App auch offline. Keine externen Dienste.
const CACHE = "mathefix-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (ereignis) => {
  ereignis.waitUntil(
    caches
      .keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (ereignis) => {
  const anfrage = ereignis.request;
  if (anfrage.method !== "GET" || !anfrage.url.startsWith(self.location.origin)) return;
  ereignis.respondWith(
    fetch(anfrage)
      .then((antwort) => {
        const kopie = antwort.clone();
        caches
          .open(CACHE)
          .then((cache) => cache.put(anfrage, kopie))
          .catch(() => {});
        return antwort;
      })
      .catch(() => caches.match(anfrage, { ignoreSearch: true }).then((treffer) => treffer ?? Response.error())),
  );
});
