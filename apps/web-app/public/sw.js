const CACHE_NAME = 'app-cache-v2'
const FILES_TO_CACHE = []

self.addEventListener('install', event => {
	console.log('[Service Worker] Install')
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			console.log('[Service Worker] Pre-caching fonts and SVGs')
			return cache.addAll(FILES_TO_CACHE)
		}),
	)
	self.skipWaiting()
})

self.addEventListener('fetch', event => {
	const request = event.request
	if (
		request.url.endsWith('.woff') ||
		request.url.endsWith('.woff2') ||
		request.url.endsWith('.ttf') ||
		request.url.endsWith('.eot') ||
		request.url.endsWith('.otf') ||
		request.url.endsWith('.svg')
	) {
		event.respondWith(
			caches.match(request).then(cachedResponse => {
				if (cachedResponse) {
					console.log(`[Service Worker] Serving cached: ${request.url}`)
					return cachedResponse
				}
				console.log(`[Service Worker] Fetching and caching: ${request.url}`)
				return fetch(request).then(response => {
					return caches.open(CACHE_NAME).then(cache => {
						cache.put(request, response.clone())
						return response
					})
				})
			}),
		)
	}
})

self.addEventListener('activate', event => {
	console.log('[Service Worker] Activate')
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheName !== CACHE_NAME) {
						console.log(`[Service Worker] Deleting old cache: ${cacheName}`)
						return caches.delete(cacheName)
					}
				}),
			)
		}),
	)
	self.clients.claim()
})

self.addEventListener('push', event => {
	if (event.data) {
		const data = event.data.json()
		const options = {
			body: data.body,
			badge: '/logo.svg',
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: '2',
			},
		}
		event.waitUntil(self.registration.showNotification(data.title, options))
	}
})

self.addEventListener('notificationclick', event => {
	console.log('Notification click received.')
	event.notification.close()
	event.waitUntil(clients.openWindow('https://journ.app'))
})
