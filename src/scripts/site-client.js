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

window.setConsent = function(yes){
  try{ localStorage.setItem('ys_consent', yes ? 'yes' : 'no'); }catch(e){}
  const c = document.getElementById('consent'); if(c) c.style.display='none';
  if(yes) loadGA();
};

// Show banner only if a choice hasn't been made and GA is configured.
document.addEventListener('DOMContentLoaded', function(){
  let choice=null; try{ choice=localStorage.getItem('ys_consent'); }catch(e){}
  if(choice === 'yes') loadGA();
  else if(!choice && site.GA_ID){
    const c=document.getElementById('consent'); if(c) c.style.display='block';
  }
});
