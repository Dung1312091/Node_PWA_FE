if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    const showNotification = () => {
      self.registration.showNotification('Background sync success!', {
        body: '🎉`🎉`🎉`'
      });
    };

    const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue', {
      callbacks: {
        queueDidReplay: showNotification
        // other types of callbacks could go here
      }
    });

    const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin],
    });


    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
    // workbox.routing.registerRoute(
    //     "http://3f32b7bc.ngrok.io/post",
    //     new workbox.strategies.NetworkFirst()
    //   );

    workbox.routing.registerRoute(
      "http://3f32b7bc.ngrok.io/users",
      networkWithBackgroundSync,
      'POST'
    );


  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}