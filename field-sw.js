// The field app moved to https://monitor.midfc.co.in/field. This replaces the old offline worker: it clears the old
// offline copy, removes itself, and reloads open windows, which then land on the redirect page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(cs => cs.forEach(c => c.navigate(c.url)))));
