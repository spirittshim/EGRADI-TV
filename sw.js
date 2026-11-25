// Ancienne adresse d'EGRADI TV : ce service worker remplace l'ancien, vide les copies locales
// et se retire, pour que les téléphones chargent la page de redirection vers https://egraditv.github.io/.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((fenetres) => fenetres.forEach((f) => f.navigate(f.url)))
  );
});
