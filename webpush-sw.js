self.addEventListener('push', function (e) {
    console.log(JSON.stringify(e.data));
    var msg = e.data.json();
    e.waitUntil(
        self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            actions: msg.actions
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('notification clicked:',JSON.stringify(event));
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
      clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
          if (client.url === rootUrl) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
    );
});