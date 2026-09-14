(()=>{
'use strict';
if(window.__TIA_TATI_PING_ART_V51__)return;
window.__TIA_TATI_PING_ART_V51__=true;

const CARD_SELECTOR='[data-jlab="ping-focus"]';
const APPROVED_FILE='assets/jovem-v27/pingpong-approved-v50.b64?v=51';
const FALLBACK_FILE='assets/jovem-v27/ping-pong-focus.svg?v=51';
let approvedPromise=null;

const $=(s,r=document)=>r.querySelector(s);

function getImage(){
  const card=$(CARD_SELECTOR);
  if(!card)return null;
  return $('.jlab-card-art img,.youth-card-art img',card);
}

function fallback(img,reason){
  if(!img)return false;
  img.src=FALLBACK_FILE;
  img.alt='Ping Pong Focus';
  img.decoding='async';
  const card=img.closest(CARD_SELECTOR);
  if(card)card.dataset.pingArt='fallback';
  if(reason)console.warn('Ping Pong: usando arte de segurança.',reason);
  return false;
}

function loadApproved(){
  if(approvedPromise)return approvedPromise;
  approvedPromise=(async()=>{
    const url=new URL(APPROVED_FILE,document.baseURI);
    const res=await fetch(url.href,{cache:'no-store',credentials:'same-origin'});
    if(!res.ok)throw new Error('HTTP '+res.status+' ao carregar a arte aprovada');
    const b64=(await res.text()).replace(/\s+/g,'');
    if(b64.length<1000||!/^UklGR/.test(b64)||!/^[A-Za-z0-9+/=]+$/.test(b64)){
      throw new Error('arquivo Base64 da arte aprovada inválido ou incompleto');
    }
    const data='data:image/webp;base64,'+b64;
    await new Promise((resolve,reject)=>{
      const probe=new Image();
      probe.onload=resolve;
      probe.onerror=()=>reject(new Error('WebP aprovado não pôde ser decodificado'));
      probe.src=data;
    });
    return data;
  })().catch(err=>{
    approvedPromise=null;
    throw err;
  });
  return approvedPromise;
}

async function apply(){
  const img=getImage();
  if(!img)return false;
  try{
    const data=await loadApproved();
    if(!img.isConnected)return false;
    img.src=data;
    img.alt='Ping Pong Focus com Tia Tati';
    img.decoding='async';
    img.loading='eager';
    const card=img.closest(CARD_SELECTOR);
    if(card)card.dataset.pingArt='approved-v50';
    return true;
  }catch(err){
    return fallback(img,err);
  }
}

function boot(){
  apply();
  [250,600,1200,2200].forEach(ms=>setTimeout(apply,ms));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(apply,80));
window.addEventListener('pageshow',apply);
})();