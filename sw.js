// Die App ist auf https://start.mathefix.here.now/ umgezogen.
// Dieser Service Worker räumt sich selbst und alle alten Caches weg.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (ereignis) => {
  ereignis.waitUntil(
    caches
      .keys()
      .then((namen) => Promise.all(namen.map((n) => caches.delete(n))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((fenster) => fenster.forEach((f) => f.navigate(f.url))),
  );
});
