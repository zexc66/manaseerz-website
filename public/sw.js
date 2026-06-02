self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.webmanifest',
        '/robots.txt',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== 'v1';
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first for HTML, cache-first for others
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open('v1').then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-submission') {
    event.waitUntil(syncFormData());
  }
});

async function syncFormData() {
  const formData = await getStoredFormData();
  for (const data of formData) {
    try {
      await submitFormData(data);
      await removeStoredFormData(data.id);
    } catch (error) {
      console.error('[SW] Failed to sync form data:', error);
    }
  }
}

// Cache API for offline analytics
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});