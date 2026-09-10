(()=>{
'use strict';
const VERSION='49';
const toast=document.getElementById('shellToast');
const routes={
 road:'[data-mission="road"]',bee:'[data-mission="bee"]',target:'[data-mission="target"]',hands:'[data-mission="hands"]',sensory:'[data-mission="sensory"]',breathe:'[data-mission="breathe"]',
 react:'[data-youth-light="react"]',memory:'[data-youth-light="memory"]',beat:'[data-youth-light="beat"]',pulse:'[data-youth-sensory]',restart:'[data-youth-breathe]',movequest:'[data-youth-physical]',
 circuit:'[data-nav="circuit"]',voice:'[data-nav="voice"]',reports:'[data-nav="reports"]',fisio:'[data-nav="fisio"]',interventions:'#interventionsBtn'
};
const cardRoutes={welcome:'[data-card="welcome"]',guide:'[data-card="guide"]',success:'[data-card="success"]',celebrate:'[data-card="celebrate"]'};

function showToast(msg){
 if(!toast)return;
 toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);
 showToast.t=setTimeout(()=>toast.classList.remove('show'),1800);
}

/* Cabeçalho: usa a identidade já aprovada dos cards da Tia Tati,
   recortando o retrato em vez de exibir a arte inteira em miniatura. */
function applyApprovedHeaderAvatar(){
 const brand=document.querySelector('.shell-brand');
 const img=brand&&brand.querySelector('img');
 if(!brand||!img||img.dataset.v49Crop)return;
 img.dataset.v49Crop='1';
 const crop=document.createElement('span');
 crop.setAttribute('aria-hidden','true');
 Object.assign(crop.style,{width:'50px',height:'50px',borderRadius:'17px',overflow:'hidden',position:'relative',display:'block',flex:'0 0 50px',background:'#fff',border:'3px solid #fff',boxShadow:'0 6px 18px rgba(33,74,105,.12)'});
 img.parentNode.insertBefore(crop,img);crop.appendChild(img);
 Object.assign(img.style,{position:'absolute',width:'88px',height:'88px',maxWidth:'none',left:'53%',top:'49%',transform:'translate(-50%,-50%)',objectFit:'cover',objectPosition:'center 22%',border:'0',borderRadius:'0',boxShadow:'none'});
}

function openLegacy(key,selectorOverride){
 if(key==='home'){window.scrollTo({top:0,behavior:'smooth'});return;}
 const selector=selectorOverride||routes[key];
 if(!selector){showToast('Atividade indisponível.');return;}
 const url=new URL('./index.html',location.href);
 url.searchParams.set('legacy','1');
 url.searchParams.set('shell',VERSION);
 url.searchParams.set('open',key);
 if(selectorOverride)url.searchParams.set('selector',selectorOverride);
 url.searchParams.set('t',Date.now().toString());
 location.href=url.href;
}

document.addEventListener('click',e=>{
 const scroll=e.target.closest('[data-scroll]');
 if(scroll){
  const id=scroll.dataset.scroll;
  if(id==='top')window.scrollTo({top:0,behavior:'smooth'});
  else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  return;
 }
 const open=e.target.closest('[data-open]');
 if(open){e.preventDefault();openLegacy(open.dataset.open);return;}
 const card=e.target.closest('[data-card-open]');
 if(card){e.preventDefault();openLegacy('card',cardRoutes[card.dataset.cardOpen]);}
});

applyApprovedHeaderAvatar();
if('serviceWorker' in navigator){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v='+VERSION).catch(()=>{}));
}
})();
