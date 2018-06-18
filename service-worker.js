/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","f03ccc4148ff024ea5f4de390caecd8d"],["/about/index.html","1fd30f577704db83d6d83e387a09636e"],["/archives/2016/06/index.html","b1d7834b0482796b4950a1a1f55aaa3a"],["/archives/2016/index.html","9ff66b21aede8a3a22f9d2263d066be3"],["/archives/2017/05/index.html","27fdb3d60b9512bdc09709229c317f64"],["/archives/2017/index.html","47f554104c156900a9ebf6326de640d6"],["/archives/index.html","775d7e1271f71eeb67e9d5debdbb3bba"],["/assets/css/main.css","65acc085482d967c386b8f0960b952a3"],["/assets/images/algolia_logo.svg","8e0e9838589ad42418fe5fa23fa7e9f1"],["/assets/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/assets/images/avatar.png","f7d70e8d4d8accb6edeecbe0f670284f"],["/assets/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/assets/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/assets/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/assets/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/assets/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/assets/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/assets/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/assets/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/assets/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/assets/images/qrcode_donate_alipay.jpg","62ec4a313abc6ed484324358cdd0e6a9"],["/assets/images/qrcode_donate_wechat.jpg","0a7ac29b4e3412bb5fe2211a8b25d28f"],["/assets/images/qrcode_subscribe.jpg","4704e4f667c06fa47a80d531de2305fc"],["/assets/images/qrcode_subscribe.png","f6fc73b5671d61bd4b237148d7608bf0"],["/assets/images/qrcode_subscribe_full.png","a3ff828e1f3a6a2a135eef5fb4c4d3ab"],["/assets/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/assets/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/assets/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/assets/js/src/affix.js","0e040761292f32cb6b0dce7ab211d9fe"],["/assets/js/src/algolia-search.js","810b883d4855cf5c03d9844de68aa309"],["/assets/js/src/bootstrap.js","6893bf41480580e8ec2a95d416eb9d41"],["/assets/js/src/exturl.js","d07dea5d1b7bdd7b056b23b48c851f53"],["/assets/js/src/hook-duoshuo.js","21de6e9feabd4e680dc2bb5c1cd2a6ce"],["/assets/js/src/motion.js","0951f4fac47d717f41f572bb6abbde32"],["/assets/js/src/post-details.js","a739bac24ebfeb5c2de754c934c6554d"],["/assets/js/src/schemes/pisces.js","ce87385d362ea3860733d13a1523a3b3"],["/assets/js/src/scrollspy.js","5e2528a99fba161712832ec1e490e48f"],["/assets/js/src/utils.js","b8f54f50cb2f8597ca2c4cc5d83cb3d7"],["/assets/lib/algolia-instant-search/instantsearch.min.css","64e349207f5d086bfbf912ddcaa4d537"],["/assets/lib/algolia-instant-search/instantsearch.min.js","341443ac32139898a7d013dd33efcf4d"],["/assets/lib/canvas-nest/canvas-nest.min.js","e76d9741483d89f0c8c6a3c18fc8489f"],["/assets/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/assets/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/assets/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/assets/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/assets/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/assets/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/assets/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/assets/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","990b91c524c7b760d505c1eb7304ade6"],["/assets/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","4dc5549322963d427e08c2018eeb07db"],["/assets/lib/fancybox/source/helpers/jquery.fancybox-media.js","b0790f009f03a0bd69fb953e6cb1095d"],["/assets/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","5133d80120a238ef7fa4cbe43e8b9f02"],["/assets/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","b212bbd538adb5b7f4dbaabfbf136e3d"],["/assets/lib/fancybox/source/jquery.fancybox.css","809cdd6275df99497b70a32b928d0905"],["/assets/lib/fancybox/source/jquery.fancybox.js","734304210b79f70c0b7cc5d90ceaa9de"],["/assets/lib/fancybox/source/jquery.fancybox.pack.js","3b1d782e56d151b3ac68b12a413dadeb"],["/assets/lib/fastclick/README.html","47d980565a1314a4f37e2e1413462f5d"],["/assets/lib/fastclick/lib/fastclick.js","d5d61ccdf043350056ee61151f7e03e3"],["/assets/lib/fastclick/lib/fastclick.min.js","e99ab430385bb9df04c978d1040b0001"],["/assets/lib/font-awesome/css/font-awesome.css","c97c3824a8d6c5eb936727310d68fe87"],["/assets/lib/font-awesome/css/font-awesome.min.css","c97c3824a8d6c5eb936727310d68fe87"],["/assets/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/assets/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/assets/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/assets/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/assets/lib/jquery/index.js","07b63ad3536491064f034665adb54bc4"],["/assets/lib/jquery_lazyload/CONTRIBUTING.html","4f4b60a5a3760e6011fad3214aa8a8a5"],["/assets/lib/jquery_lazyload/README.html","7b63e5a6c9def8f3f15e955420e39a02"],["/assets/lib/jquery_lazyload/jquery.lazyload.js","272a3e87de6190d8d1fbe924bf95790e"],["/assets/lib/jquery_lazyload/jquery.scrollstop.js","8eb809edcf92e98e37dae361ccf3997c"],["/assets/lib/three/three-waves.min.js","f461fe4929324dc845f008065a04a629"],["/assets/lib/three/three.min.js","6187dacb4d386064bb6bdcb3f1eb4122"],["/assets/lib/ua-parser-js/dist/ua-parser.min.js","3c1b63884a4017cc7d38779d99a92c1c"],["/assets/lib/ua-parser-js/dist/ua-parser.pack.js","8617158a93df21886d7338eda0adfccc"],["/assets/lib/velocity/velocity.js","2f5551827d916f0d2188e4286f182806"],["/assets/lib/velocity/velocity.min.js","50c35f4e2f9d01c1dff0d562c1e22745"],["/assets/lib/velocity/velocity.ui.js","75ff4d65cbb60c71cf568e2679c312df"],["/assets/lib/velocity/velocity.ui.min.js","6c279d64b074445885de767323808683"],["/categories/CSS/index.html","7fc3cdc49932ec047fe8aa0ff093683a"],["/categories/JavaScript/index.html","113910c60ec3f265dfc186872465ff39"],["/categories/index.html","3039e628c75a7465bb769083b5ad28f2"],["/index.html","596510bf2fd89cfa31cf85d657348bf5"],["/posts/2016/1104843291/index.html","4f279435de5e3f8430d23b9579b08e35"],["/posts/2016/1640409887/index.html","c5123189211e3b0c3e22ae2ccb806958"],["/posts/2016/2680227017/index.html","63a896801236167e7be64ab7b5274393"],["/posts/2016/3711766572/index.html","dafb3d1404197e0eec45cc585fcd6279"],["/posts/2017/3721315630/index.html","6650203824d876dee6e13d1c1dee3ec6"],["/tags/CSS/index.html","d091f07e17daa7b0b01be225d0ae1f40"],["/tags/JavaScript/index.html","caa732e7e8f8f2dd22ad6ff2a073203d"],["/tags/index.html","f30b4ec151c26ccb252426bdbc6dddef"],["/tags/代码段/index.html","125d5a94c7c3f85ea96b7faf55c309f5"],["/tags/知识点/index.html","3cb385102d88869cef93555940ef7d3b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







