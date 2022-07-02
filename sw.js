self.addEventListener('install', function (event) {
	console.log('[SW] Install');
	caches.delete('static');
	self.skipWaiting();
	event.waitUntil(
		caches.open('static').then(function (cache) {
			cache.addAll([
				'index.html',
                'script.js'
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			} else {
				return fetch(event.request);
			}
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	var notification = event.notification;
	var action = event.action;
	console.log(notification);
	clients.openWindow(notification.data.url);
	notification.close();
});

self.addEventListener('push', function (event) {
	var data = {
		title: 'Something',
		content: 'Some content',
		url: 'https://avinshvidyarthi.github.io',
	};
	if (event.data) {
		data = JSON.parse(event.data.text());
	}
	var options = {
		body: data.content,
		icon: '../img/icons/icons-96x96.png',
		badge: '../img/icons/icons-96x96.png',
		vibrate: [100, 50, 200],
		data: {
			url: data.url,
		},
	};
	if (data.image) {
		options.image = data.image;
	}
	event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('activate', function (event) {
	console.log('[SW] Activated');
});
