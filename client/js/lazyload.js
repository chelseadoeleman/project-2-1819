document.addEventListener('DOMContentLoaded', function() {
  let lazyImages = [...document.querySelectorAll('img.c-image')]
  console.log(lazyImages)

  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target
          console.log(lazyImage)
          lazyImage.src = lazyImage.dataset.src
          lazyImage.srcset = lazyImage.dataset.srcset
          lazyImage.classList.remove('lazy')
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage)
    })
  } else {
    console.error(error)
  }
})