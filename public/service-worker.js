if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>c(e,n),d={module:{uri:n},exports:r,require:t};s[n]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts("fallback-ac4EfwpUYPJMcxzUjFEGh.js","https://js.pusher.com/beams/service-worker.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ac4EfwpUYPJMcxzUjFEGh/_buildManifest.js",revision:"26e9db6b42de547c1a506293f84a47f0"},{url:"/_next/static/ac4EfwpUYPJMcxzUjFEGh/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/ac4EfwpUYPJMcxzUjFEGh/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0b7b90cd.120713ce78293bc3.js",revision:"120713ce78293bc3"},{url:"/_next/static/chunks/10-116a30dfad864e78.js",revision:"116a30dfad864e78"},{url:"/_next/static/chunks/127.c817071ad795cf72.js",revision:"c817071ad795cf72"},{url:"/_next/static/chunks/209-4eb9318aa9760e24.js",revision:"4eb9318aa9760e24"},{url:"/_next/static/chunks/283.3bff462af949a3c3.js",revision:"3bff462af949a3c3"},{url:"/_next/static/chunks/287-02952a3c11777d02.js",revision:"02952a3c11777d02"},{url:"/_next/static/chunks/311-f973d2dfae628560.js",revision:"f973d2dfae628560"},{url:"/_next/static/chunks/501.0cd79cff598a0897.js",revision:"0cd79cff598a0897"},{url:"/_next/static/chunks/523-9054452e44886905.js",revision:"9054452e44886905"},{url:"/_next/static/chunks/71-c9f0144f3ccfb437.js",revision:"c9f0144f3ccfb437"},{url:"/_next/static/chunks/79-836b560745318bd7.js",revision:"836b560745318bd7"},{url:"/_next/static/chunks/83-f4496703e04fc6a7.js",revision:"f4496703e04fc6a7"},{url:"/_next/static/chunks/843-b0956d5bec6f136a.js",revision:"b0956d5bec6f136a"},{url:"/_next/static/chunks/846-22a3236684e2597a.js",revision:"22a3236684e2597a"},{url:"/_next/static/chunks/847.b45fd6c151926427.js",revision:"b45fd6c151926427"},{url:"/_next/static/chunks/948-9515e8eb4b9af926.js",revision:"9515e8eb4b9af926"},{url:"/_next/static/chunks/967.f0ea1d3de2dc2f4d.js",revision:"f0ea1d3de2dc2f4d"},{url:"/_next/static/chunks/f389acab-6ee8eda23f2e3394.js",revision:"6ee8eda23f2e3394"},{url:"/_next/static/chunks/framework-1437075e0c2d888d.js",revision:"1437075e0c2d888d"},{url:"/_next/static/chunks/main-4683452d090cffa9.js",revision:"4683452d090cffa9"},{url:"/_next/static/chunks/pages/_app-099c34d172804a39.js",revision:"099c34d172804a39"},{url:"/_next/static/chunks/pages/_error-6102d216f12ce8c6.js",revision:"6102d216f12ce8c6"},{url:"/_next/static/chunks/pages/_offline-fa148a461008a327.js",revision:"fa148a461008a327"},{url:"/_next/static/chunks/pages/adresses-8379fb1d81fb5011.js",revision:"8379fb1d81fb5011"},{url:"/_next/static/chunks/pages/calendrier-b40e73b82bc97379.js",revision:"b40e73b82bc97379"},{url:"/_next/static/chunks/pages/event/%5Bid%5D-e400e0e136488ca4.js",revision:"e400e0e136488ca4"},{url:"/_next/static/chunks/pages/index-1d3ad1438b57350b.js",revision:"1d3ad1438b57350b"},{url:"/_next/static/chunks/pages/league-019aa23824eae6e7.js",revision:"019aa23824eae6e7"},{url:"/_next/static/chunks/pages/login-b2edeb58f0984239.js",revision:"b2edeb58f0984239"},{url:"/_next/static/chunks/pages/news-603726cfadc51feb.js",revision:"603726cfadc51feb"},{url:"/_next/static/chunks/pages/notifications-f882d9c05dd27c32.js",revision:"f882d9c05dd27c32"},{url:"/_next/static/chunks/pages/profile-a2d63e560dc68c14.js",revision:"a2d63e560dc68c14"},{url:"/_next/static/chunks/pages/request/%5Banswer%5D/%5Btoken%5D-2058a69694059fd7.js",revision:"2058a69694059fd7"},{url:"/_next/static/chunks/pages/request/view/%5Btoken%5D-de688ac8abdbaf72.js",revision:"de688ac8abdbaf72"},{url:"/_next/static/chunks/pages/stuff-28f48d228d3197b2.js",revision:"28f48d228d3197b2"},{url:"/_next/static/chunks/pages/teams-03319e64cd5d4de9.js",revision:"03319e64cd5d4de9"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-4b563679f022c134.js",revision:"4b563679f022c134"},{url:"/_next/static/chunks/pages/verify-4003885da3c1bdec.js",revision:"4003885da3c1bdec"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-41a2c6c06e38aa9e.js",revision:"41a2c6c06e38aa9e"},{url:"/_next/static/css/0bdca50252361be3.css",revision:"0bdca50252361be3"},{url:"/_next/static/css/2793ed08863f9a6a.css",revision:"2793ed08863f9a6a"},{url:"/_next/static/css/2b8e1a9b31132b1e.css",revision:"2b8e1a9b31132b1e"},{url:"/_next/static/css/2e6315d0171459ca.css",revision:"2e6315d0171459ca"},{url:"/_next/static/css/3cd2639620492fe0.css",revision:"3cd2639620492fe0"},{url:"/_next/static/css/49014f1b4f9d2e29.css",revision:"49014f1b4f9d2e29"},{url:"/_next/static/css/58158281033b77c6.css",revision:"58158281033b77c6"},{url:"/_next/static/css/5c6b7fbaf0a402df.css",revision:"5c6b7fbaf0a402df"},{url:"/_next/static/css/6470e06af38fe363.css",revision:"6470e06af38fe363"},{url:"/_next/static/css/67b95db05b21139e.css",revision:"67b95db05b21139e"},{url:"/_next/static/css/7c1a15c895ede752.css",revision:"7c1a15c895ede752"},{url:"/_next/static/css/7cd6b50cbf0c3704.css",revision:"7cd6b50cbf0c3704"},{url:"/_next/static/css/7eef1d92c46940e8.css",revision:"7eef1d92c46940e8"},{url:"/_next/static/css/8832ec9a3d617a71.css",revision:"8832ec9a3d617a71"},{url:"/_next/static/css/a7400b02407416f1.css",revision:"a7400b02407416f1"},{url:"/_next/static/css/bbcedd96881e5523.css",revision:"bbcedd96881e5523"},{url:"/_next/static/css/ce890a4a85f5968e.css",revision:"ce890a4a85f5968e"},{url:"/_next/static/css/de63d0b347d4c40a.css",revision:"de63d0b347d4c40a"},{url:"/_next/static/css/ec6c7c52f7845bd1.css",revision:"ec6c7c52f7845bd1"},{url:"/_next/static/css/f700ac14511f33e0.css",revision:"f700ac14511f33e0"},{url:"/_next/static/media/arrow-left-thin.2d81fc93.svg",revision:"4dc7fb393802a11bd0b1052ca2d7aa4b"},{url:"/_next/static/media/arrow-up-right-from-square.fe3c048f.svg",revision:"1b6873ca8327396975398704d4e3e91f"},{url:"/_next/static/media/calendar-days.413b77a0.svg",revision:"c85f631319ab9d3cb4b249582613b2f1"},{url:"/_next/static/media/flag-pennant.c1f6d785.svg",revision:"eaa2518cc3c4285ce69758236ca88294"},{url:"/_next/static/media/house.58f6fe8d.svg",revision:"e9fc4922723a86455d48a25cc203a605"},{url:"/_next/static/media/idcard.5c2f8d20.svg",revision:"a6f67c9652ae3425d01409bdfac7e6e6"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/map.60405b84.svg",revision:"8acedd6bfc84d89c21e04f3d04167719"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/media/marker.f9fc6d78.svg",revision:"fae8275c7944e40350fbfe58af271f32"},{url:"/_next/static/media/newspaper.3643f622.svg",revision:"d940eb39d91893cd43e991283382a87b"},{url:"/_next/static/media/pen.f6b5883a.svg",revision:"c3a4781f3a5798e1fd9d45615dd3f745"},{url:"/_next/static/media/warehouse.1cd55382.svg",revision:"d7c6ad1cdef4971f81c0a979be8b96b1"},{url:"/_next/static/media/xmark.d4617184.svg",revision:"b58830f6bd6d6e9dd1843254947cee14"},{url:"/_offline",revision:"ac4EfwpUYPJMcxzUjFEGh"},{url:"/favicon.ico",revision:"ebbe68e83d4bb41b9f71a53135006b06"},{url:"/icons/android-chrome-192x192.png",revision:"6eecd3d1e4532cfc9fc8f9c7b24506c5"},{url:"/icons/android-chrome-512x512.png",revision:"8476fcda4f1c1004c13bc42817bf9ddf"},{url:"/icons/android-chrome-maskable-192x192.png",revision:"eff65771a40a73f02ae1209d37795aa3"},{url:"/icons/android-chrome-maskable-512x512.png",revision:"ad66226ec55f30e0423937c79c80781b"},{url:"/icons/apple-touch-icon.png",revision:"06fa81e201188fe2e43ff805059d3ed4"},{url:"/icons/arrow-left-thin.svg",revision:"4dc7fb393802a11bd0b1052ca2d7aa4b"},{url:"/icons/arrow-up-right-from-square.svg",revision:"1b6873ca8327396975398704d4e3e91f"},{url:"/icons/bell.svg",revision:"d6c36e4fe4c9c2fd6c8542652356a5ef"},{url:"/icons/calendar-days.svg",revision:"c85f631319ab9d3cb4b249582613b2f1"},{url:"/icons/dragon.svg",revision:"49707179e49c784618366141ce901cd2"},{url:"/icons/flag-pennant.svg",revision:"eaa2518cc3c4285ce69758236ca88294"},{url:"/icons/house.svg",revision:"e9fc4922723a86455d48a25cc203a605"},{url:"/icons/icon-foreground.png",revision:"7370add2dd7b5061f2272f5fd5e2a484"},{url:"/icons/icon.png",revision:"4b5dae09a36407324fb96033c031c69f"},{url:"/icons/idcard.svg",revision:"a6f67c9652ae3425d01409bdfac7e6e6"},{url:"/icons/map.svg",revision:"8acedd6bfc84d89c21e04f3d04167719"},{url:"/icons/marker-black.svg",revision:"c87fae1d0d93940d34f5eca21f45c3e2"},{url:"/icons/marker.svg",revision:"fae8275c7944e40350fbfe58af271f32"},{url:"/icons/newspaper.svg",revision:"d940eb39d91893cd43e991283382a87b"},{url:"/icons/pen.svg",revision:"c3a4781f3a5798e1fd9d45615dd3f745"},{url:"/icons/people-group.svg",revision:"123850bfd3d63e81c068eb92fcd07070"},{url:"/icons/splash.png",revision:"6b1f57ed6cff2e11d1b4d1671639d474"},{url:"/icons/teams.svg",revision:"100a8cce19082ae6969d3645a67186f7"},{url:"/icons/warehouse.svg",revision:"d7c6ad1cdef4971f81c0a979be8b96b1"},{url:"/icons/xmark.svg",revision:"b58830f6bd6d6e9dd1843254947cee14"},{url:"/manifest.json",revision:"25a77fa6f471f0105671ca99128f3491"},{url:"/static/fonts/AmaticSC-Bold.ttf",revision:"fc2cf6f52e5e93d47948562ac011725b"},{url:"/static/fonts/AmaticSC-Regular.ttf",revision:"04b6b0803b089211561d2fd5e5d9af80"},{url:"/static/fonts/Poppins-Bold.ttf",revision:"08c20a487911694291bd8c5de41315ad"},{url:"/static/fonts/Poppins-Italic.ttf",revision:"c1034239929f4651cc17d09ed3a28c69"},{url:"/static/fonts/Poppins-Regular.ttf",revision:"093ee89be9ede30383f39a899c485a82"},{url:"/static/images/drakarrd.svg",revision:"364f273fc2cc97e271d9e4abf59709f4"},{url:"/static/images/kofi_logo.svg",revision:"d380eca940bfcf2a17b28bfb6e56a434"},{url:"/static/images/profile.webp",revision:"dbb5ebaad4a0c77282c17b4a78dbf32e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
