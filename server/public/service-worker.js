const CORE_CACHE_NAME = 'core-cache'
const CORE_ASSETS = [ 
    '/css/index.css',
    '/js/index.js',
    '/offlinePage.html',
    '/assets/images/logo__image.svg',
    '/fonts/VWHeadWeb-Bold.woff2',
    '/fonts/VWHeadWeb-Regular.woff2',
    '/fonts/VWTextWeb-Bold.woff2',
    '/fonts/VWTextWeb-Regular.woff2',
    'https://cors-anywhere.herokuapp.com/https://stocklandmartelblog.files.wordpress.com/2015/05/uwe-duettmann_volkswagen-3.jpg',
    'https://cors-anywhere.herokuapp.com/https://www.volkswagen.nl/-/media/vwpkw/images/acties/fast-start-2019/fast_start_2400x1350.ashx',
    'https://cors-anywhere.herokuapp.com/https://www.volkswagen.nl/-/media/vwpkw/images/homepage/tile-module/1200x1200-vwnl-verschil-moet-er-zijn.ashx',
    'https://cors-anywhere.herokuapp.com/https://www.volkswagen.nl/-/media/vwpkw/images/snelwegsprookjes/snelwegsprookjes_thumbnail.ashx',
    'https://cors-anywhere.herokuapp.com/https://www.volkswagen.nl/-/media/vwpkw/images/modellen/passat/passat_tile.ashx',
    'https://cors-anywhere.herokuapp.com/https://www.volkswagen.nl/-/media/vwpkw/images/homepage/tile-module/elektrisch-rijden-11.ashx',
    'https://cors-anywhere.herokuapp.com/https://presspage-production-content.s3.amazonaws.com/uploads/1397/500_golf1-536821.jpg?10000'
]

self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(CORE_CACHE_NAME)
    .then(cache => cache.addAll(CORE_ASSETS))
    .then(() => self.skipWaiting())
    )
})


self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate'
        || (event.request.method === 'GET'
            && event.request.headers.get('accept').includes('text/html')
        )
    ) {
        event.respondWith(fetch(event.request.url, {mode: 'no-cors'})
            .then(response => {
                return caches.open('html-cache').then(cache => {
                    return cache.put(event.request.url, response.clone()).then(() => {
                        return response
                    })
                })
            })
            .catch(error => {
                return caches.open('html-cache').then(cache => {
                    return cache.match(event.request.url).then(response => {
                        return response 
                            ? response
                            : caches.open('core-cache').then(cache => {
                                return cache.match('/offlinePage.html').then(response => {
                                    return response
                                })
                            })
                    })
                })
            })
        )
    } else {
        event.respondWith(
            caches
            .match(event.request)
            .then(response => response
                ? response
                : fetch(event.request)
            )
        )
    }
})