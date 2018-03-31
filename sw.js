var CACHE_NAME = 'tic-tac-toe-game-cache-v1';
var urlsToCache = [
  '/',
  'style.css',
  'script.js',
  '3px-tile.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css?family=VT323'
];


self.addEventListener('install', function(event) {
  console.log("installing")
// Perform install steps
event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).then(function() {
          console.log('All resources have been fetched and cached.');
        });
      })
  );
});

self.addEventListener('fetch', function (event){
    console.log("SW from TicTacToe at work");
  event.respondWith(
    caches.match(event.request).then(function(response){
     return response || fetch(event.request);

    })
  );

});

self.addEventListener('message',function(event){
    this.console.log("message received "+event.data.action)
    if(event.data.action=="skipWaiting"){
        self.skipWaiting();
    }
})


