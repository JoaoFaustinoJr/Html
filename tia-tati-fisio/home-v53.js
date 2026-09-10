(()=>{
'use strict';
const VERSION='53';

const LABELS={
 road:'Caminho Seguro',bee:'Abelhinha e a Flor',target:'Alcance ao Alvo',hands:'Duas Mãos',
 sensory:'Descobertas',breathe:'Respira Comigo',react:'Reflexo Neon',memory:'Memorize',
 beat:'Beat & Move',pulse:'Pulse Lab',restart:'Recomeço',movequest:'Move Quest',
 circuit:'Circuito',voice:'Voz da Tia Tati',reports:'Relatórios',fisio:'Modo Fisio',interventions:'Cards da Tia Tati'
};

/* v53: usa somente a arte válida do hero. O arquivo experimental v52 ficou inválido no repositório. */
const hero=document.querySelector('.hero-tati>img');
if(hero){
 hero.src='assets/tati-approved-hero.webp?v='+VERSION;
 hero.alt='Tia Tati, fisioterapeuta, com as mãos em forma de coração';
 hero.decoding='async';
 hero.fetchPriority='high';
 hero.addEventListener('error',()=>{
  hero.src='assets/tati-approved-avatar.webp?v='+VERSION;
  hero.classList.add('hero-image-fallback');
 },{once:true});
}
document.querySelectorAll('img[src="assets/tati-approved-avatar.webp"]').forEach(img=>{
 img.src='assets/tati-approved-avatar.webp?v='+VERSION;
});

const style=document.createElement('style');
style.id='tia-tati-v53-shell-style';
style.textContent=`
 body.v53-activity-open{overflow:hidden!important}
 #activityOverlayV53{position:fixed;inset:0;z-index:99999;background:#f8fbff;display:grid;grid-template-rows:auto 1fr;animation:v53in .16s ease-out}
 #activityOverlayV53 .v53-activity-head{min-height:62px;padding:8px max(10px,env(safe-area-inset-right)) 8px max(10px,env(safe-area-inset-left));display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;background:rgba(255,255,255,.98);border-bottom:1px solid #e6edf5;box-shadow:0 4px 18px rgba(34,76,120,.08)}
 #activityOverlayV53 .v53-back{appearance:none;border:1px solid #d9e5ef;background:#fff;color:#174c7f;border-radius:14px;min-height:44px;padding:0 14px;font:800 14px/1 system-ui;cursor:pointer}
 #activityOverlayV53 .v53-title{min-width:0;text-align:center;display:grid;gap:2px;color:#153f69}
 #activityOverlayV53 .v53-title strong{font:900 16px/1.1 system-ui;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 #activityOverlayV53 .v53-title small{font:700 10px/1 system-ui;color:#76899d;letter-spacing:.04em}
 #activityOverlayV53 .v53-mark{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #fff;box-shadow:0 0 0 1px #dbe7f0}
 #activityOverlayV53 .v53-frame-wrap{position:relative;min-height:0;background:linear-gradient(135deg,#fff8fc,#eefaff)}
 #activityOverlayV53 iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#f8fbff}
 #activityOverlayV53 .v53-loading{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#38658c;background:linear-gradient(135deg,#fff8fc,#eefaff);z-index:2;pointer-events:none;transition:opacity .18s ease}
 #activityOverlayV53.ready .v53-loading{opacity:0}
 #activityOverlayV53 .v53-loading span{font-size:38px;display:block;margin-bottom:8px}
 #activityOverlayV53 .v53-loading strong{font:850 15px/1.2 system-ui}
 @keyframes v53in{from{opacity:.25;transform:translateY(8px)}to{opacity:1;transform:none}}
 @media(max-width:520px){#activityOverlayV53 .v53-activity-head{min-height:56px;padding-top:max(6px,env(safe-area-inset-top))}#activityOverlayV53 .v53-back{min-height:40px;padding:0 11px}#activityOverlayV53 .v53-title strong{font-size:14px}#activityOverlayV53 .v53-mark{width:40px;height:40px}}
`;
document.head.appendChild(style);

function cleanupOverlay(){
 const overlay=document.getElementById('activityOverlayV53');
 if(overlay) overlay.remove();
 document.body.classList.remove('v53-activity-open');
}

function closeActivity(fromButton=false){
 if(fromButton && history.state && history.state.tiaTatiActivity){history.back();return;}
 cleanupOverlay();
}

function openActivity(key){
 if(key==='home'){cleanupOverlay();window.scrollTo({top:0,behavior:'smooth'});return;}
 cleanupOverlay();
 const label=LABELS[key]||'Atividade';
 const overlay=document.createElement('section');
 overlay.id='activityOverlayV53';
 overlay.setAttribute('aria-label',label);
 const url=new URL('./activity-v52.html',location.href);
 url.searchParams.set('open',key);
 url.searchParams.set('embed','1');
 url.searchParams.set('v',VERSION);
 url.searchParams.set('t',Date.now().toString());
 overlay.innerHTML=`<header class="v53-activity-head"><button class="v53-back" type="button" aria-label="Voltar ao início">← Voltar</button><div class="v53-title"><strong>${label}</strong><small>TIA TATI • FISIO SENSORIAL</small></div><img class="v53-mark" src="assets/tati-approved-avatar.webp?v=${VERSION}" alt="Tia Tati"></header><div class="v53-frame-wrap"><div class="v53-loading"><div><span>💗</span><strong>Preparando ${label}…</strong></div></div><iframe title="${label}" src="${url.href}" allow="autoplay; fullscreen" loading="eager"></iframe></div>`;
 document.body.appendChild(overlay);
 document.body.classList.add('v53-activity-open');
 overlay.querySelector('.v53-back')?.addEventListener('click',()=>closeActivity(true));
 const frame=overlay.querySelector('iframe');
 frame?.addEventListener('load',()=>setTimeout(()=>overlay.classList.add('ready'),90),{once:true});
 const h=new URL(location.href);h.hash='atividade-'+key;
 history.pushState({tiaTatiActivity:key},'',h.href);
}

window.addEventListener('popstate',()=>cleanupOverlay());

document.addEventListener('click',e=>{
 const sc=e.target.closest('[data-scroll]');
 if(sc){
  e.preventDefault();
  const id=sc.dataset.scroll;
  if(id==='top')window.scrollTo({top:0,behavior:'smooth'});
  else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  return;
 }
 const op=e.target.closest('[data-open]');
 if(op){e.preventDefault();e.stopPropagation();openActivity(op.dataset.open);return;}
 const card=e.target.closest('[data-card-open]');
 if(card){e.preventDefault();e.stopPropagation();openActivity('interventions');}
});

/* Remove hash de atividade deixado por uma atualização/reabertura sem restaurar uma tela antiga. */
if(location.hash.startsWith('#atividade-')){
 history.replaceState(null,'',location.pathname+location.search);
}

if('serviceWorker' in navigator){
 window.addEventListener('load',async()=>{
  try{
   const reg=await navigator.serviceWorker.register('./sw.js?v='+VERSION,{updateViaCache:'none'});
   await reg.update();
  }catch(_){ }
 });
}
})();
