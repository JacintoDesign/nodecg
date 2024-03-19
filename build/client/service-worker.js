// service-worker.js

// Install event - the browser attempts to install the service worker.
self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    // You can cache resources during install
  });
  
  // Activate event - the service worker is activated after a successful installation.
  self.addEventListener('activate', (event) => {
    console.log('Service worker activated.');
    // You can clean up old caches here
  });
  