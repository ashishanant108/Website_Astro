// Shared client logic: funnel ?src tracking, click logging, consent + GA.
// Loaded in <head> via Base.astro so window.* helpers exist before page scripts run.
import { site, SRC_MAP } from '../data/site.js';

function getSource(){
  const p = new URLSearchParams(location.search).get('src');
  return p ? (SRC_MAP[p.toLowerCase()] || 'Website') : 'Website';
}
window.getSource = getSource;
window.SOURCE = getSource();

window.logClick = function(id){
  try{
    if(site.WEBAPP_URL) navigator.sendBeacon(site.WEBAPP_URL + '?ping=click&offer=' + encodeURIComponent(id) + '&src=' + encodeURIComponent(window.SOURCE));
  }catch(e){}
  if(window.__ga_on && typeof gtag === 'function') gtag('event','offer_click',{offer:id, src:window.SOURCE});
};

function loadGA(){
  if(!site.GA_ID || window.__ga_on) return;
  const s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + site.GA_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('consent','update',{'analytics_storage':'granted'});
  gtag('config', site.GA_ID);
  window.__ga_on = true;
}

// Meta Pixel: loaded only after consent. No advanced matching, no automatic event detection;
// we send PageView, ViewContent (register/guide pages) and Lead (successful sign-up) ourselves.
function loadPixel(){
  if(!site.META_PIXEL_ID || window.__px_on) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('set','autoConfig',false,site.META_PIXEL_ID);
  fbq('init', site.META_PIXEL_ID);
  fbq('track','PageView');
  const p = location.pathname;
  const page = p.indexOf('/sessions/register')===0 ? 'yoga-sessions-register' : p.indexOf('/nadi-shodhana/register')===0 ? 'nadi-shodhana-register' : p.indexOf('/guide')===0 ? 'yogic-breathing-guide' : '';
  if(page) fbq('track','ViewContent',{content_name: page});
  window.__px_on = true;
}

// One call from the forms: records a sign-up in GA4 and Meta (only if the visitor accepted cookies).
// Never pass names, phone numbers or emails here.
window.trackLead = function(name, source){
  try{ if(window.__ga_on && typeof gtag === 'function') gtag('event','generate_lead',{form:name, source:source}); }catch(e){}
  try{ if(window.__px_on && window.fbq) fbq('track','Lead',{content_name:name}); }catch(e){}
};

window.setConsent = function(yes){
  try{ localStorage.setItem('ys_consent_v2', yes ? 'yes' : 'no'); }catch(e){}
  const c = document.getElementById('consent'); if(c) c.style.display='none';
  if(yes){ loadGA(); loadPixel(); }
};

// Carry the visitor's ?src (e.g. ?src=ig from the Instagram bio) into every on-site form link,
// so a registration made two pages later is still credited to the right platform.
document.addEventListener('DOMContentLoaded', function(){
  const src = new URLSearchParams(location.search).get('src');
  if(!src || !/^[A-Za-z0-9-]{2,40}$/.test(src)) return;
  document.querySelectorAll('a[href^="/sessions/register/"],a[href^="/nadi-shodhana/register/"],a[href^="/guide/"]').forEach(function(a){
    try{ const u = new URL(a.getAttribute('href'), location.origin); u.searchParams.set('src', src); a.setAttribute('href', u.pathname + u.search + u.hash); }catch(e){}
  });
});

// Show banner only if a choice hasn't been made and GA is configured.
document.addEventListener('DOMContentLoaded', function(){
  let choice=null; try{ choice=localStorage.getItem('ys_consent_v2'); }catch(e){}
  if(choice === 'yes'){ loadGA(); loadPixel(); }
  else if(!choice && (site.GA_ID || site.META_PIXEL_ID)){
    const c=document.getElementById('consent'); if(c) c.style.display='block';
  }
});
