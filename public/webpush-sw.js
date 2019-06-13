self.addEventListener('push', function (e) {
    e.waitUntil(
        self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (e.data) {
                var msg = e.data.json();
                console.log(msg)
                return self.registration.showNotification(msg.title, {
                    body: msg.body,
                    icon: msg.icon,
                    actions: msg.actions
                });
            }
        });
    );
});