self.addEventListener('push', function (e) {
    e.waitUntil(
        e.data.json()
        .then(msg => {
            return self.registration.showNotification(msg.title, {
                body: msg.body,
                icon: msg.icon,
                actions: msg.actions
            });
        })
    );
});

self.addEventListener('notificationclick', function(event) {
  console.log('notificationclicked:',event);
});