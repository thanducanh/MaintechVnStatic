self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    
    // FCM sends data in either 'notification' object or 'data' object
    const title = data?.notification?.title || data?.data?.title || 'Maintech Vietnam';
    const url = data?.data?.url || data?.fcmOptions?.link || '/';
    const type = data?.data?.type || 'SYSTEM';

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
        let isFocused = false;
        let isSpecificTabFocused = false;

        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.focused) {
            isFocused = true;
            if (client.url.includes(url)) {
              isSpecificTabFocused = true;
            }
          }
        }

        // Suppress push notification if the user is actively viewing the exact target URL
        if (isSpecificTabFocused) {
          return Promise.resolve();
        }

        const options = {
          body: data?.notification?.body || data?.data?.body || 'Bạn có thông báo mới',
          icon: data?.notification?.icon || data?.data?.icon || '/logo.png',
          badge: '/badge.png',
          data: { url, type }
        };

        return self.registration.showNotification(title, options);
      })
    );
  }
});

self.addEventListener("fetch", function (event) {
  // Network-only PWA.
  // Do not cache admin, API, socket, or realtime data.
  const url = new URL(event.request.url);
  if (
    url.pathname.startsWith('/socket.io/') || 
    url.pathname.startsWith('/api/') || 
    url.pathname.startsWith('/admin/')
  ) {
    return;
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // If so, just focus it.
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
