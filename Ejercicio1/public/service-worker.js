const CACHE_NAME = "react-pwa-hybrid-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;


  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(networkFirst(request));
    return;
  }

  
  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(cacheFirst(request));
    return;
  }

  
  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  
  event.respondWith(networkFirst(request));
});

function networkFirst(request) {
  return fetch(request)
    .then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    })
    .catch(() => caches.match(request));
}

function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        cache.put(request, response.clone());
        return response;
      });
      return cached || fetchPromise;
    });
  });
}