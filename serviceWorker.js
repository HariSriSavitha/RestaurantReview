
let cache_name = "myDatabase";
let url_to_be_load = []
//creating and storing cache by using install event
this.addEventListener('install',(e)=>{
  e.waitUntil(caches.open(cache_name).then((ca)=>{
    ca.addAll(url_to_be_load)
  })
)
})
// activate event
self.addEventListener('activate', function(event) {

  var listCache = ['myDatabase', 'blog-posts-cache-v1'];
  console.log("Service Worker activated successfully");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (listCache.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);

          }
        })
      );
    })
  );
});


//performing fetch event to access the application offline
this.addEventListener('fetch',(e)=>{
  e.respondWith(
    caches.open(cache_name).then((ca)=>{
      return ca.match(e.request).then((res)=>{
        return res || fetch(e.request).then((res)=>{
          ca.put(e.request,res.clone())
          return res;
        })
      })
    })
  )
})
