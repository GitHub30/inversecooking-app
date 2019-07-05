importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/059de540080481bceb51.js",
    "revision": "6ecc44bdf16fb817fa935f2975f2064e"
  },
  {
    "url": "/_nuxt/4703fddbba9bb163f487.js",
    "revision": "223c10c550b4558160ec0b3462dd8dc7"
  },
  {
    "url": "/_nuxt/8da50cb39102e5c07253.js",
    "revision": "4ab1c8d6008926bb2d6e90062d53b569"
  },
  {
    "url": "/_nuxt/8e9e787b184c266eed69.js",
    "revision": "c3736dd9d5d958d109754d4e969498a3"
  },
  {
    "url": "/_nuxt/a048f50405d2fe16095d.js",
    "revision": "3d84011b501c2d379f04d85c2de4723b"
  }
], {
  "cacheId": "inversecooking-app",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
