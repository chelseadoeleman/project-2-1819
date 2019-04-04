if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
          registration.update()
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
}