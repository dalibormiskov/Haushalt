// Offline support: the app itself is cached; your data never goes through here (it lives on the device and in your Google Drive).
const V='haushalt-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin)return; // Google sign-in & Drive go straight to the network
  const isPage=req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('.html');
  if(isPage){ // newest version when online, cached copy when offline
    e.respondWith(Promise.race([fetch(req),new Promise((_,rej)=>setTimeout(()=>rej(new Error('slow')),4000))])
      .then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(V).then(c=>c.put('./index.html',cp))}return r})
      .catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(req,cp))}return res})));
});
