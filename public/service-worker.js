if(!self.define){let e,s={};const t=(t,r)=>(t=new URL(t+".js",r).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const c=e=>t(e,o),i={module:{uri:o},exports:l,require:c};s[o]=Promise.all(r.map((e=>i[e]||c(e)))).then((e=>(n(...e),l)))}}define(["./workbox-437b998b"],(function(e){"use strict";importScripts("fallback-development.js","fallback-development.js","fallback-development.js","https://js.pusher.com/beams/service-worker.js"),self.skipWaiting(),e.clientsClaim(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/.*/i,new e.NetworkOnly({cacheName:"dev",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
