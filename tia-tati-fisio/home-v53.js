(()=>{
'use strict';
const V='53';

const polish=document.createElement('link');
polish.rel='stylesheet';
polish.href='home-v51-polish.css?v='+V;
document.head.appendChild(polish);

const hero=document.querySelector('.hero-tati>img');
if(hero){
 const fallback=()=>{hero.src='assets/tati-approved-hero.webp?v='+V;};
 fetch('assets/tati-approved-hero-v52.b64?v='+V,{cache:'no-store'})
  .then(r=>{if(!r.ok)throw 0;return r.text();})
  .then(b64=>{b64=b64.trim();if(!b64.startsWith('UklG'))throw 0;hero.src='data:image/webp;base64,'+b64;})
  .catch(fallback);
 hero.addEventListener('error',fallback,{once:true});
}

document.querySelectorAll('img[src^="assets/tati-approved-avatar.webp"]').forEach(img=>img.src='assets/tati-approved-avatar.webp?v='+V);

const labels={road:'Caminho Seguro',bee:'Abelhinha e a Flor',target:'Alcance ao Alvo',hands:'Duas Mãos',sensory:'Descobertas',breathe:'Respira Comigo',react:'Reflexo Neon',memory:'Memorize',beat:'Beat & Move',pulse:'Pulse Lab',restart:'Recomeço',movequest:'Move Quest',circuit:'Circuito',voice:'Voz da Tia Tati',reports:'Relatórios',fisio:'Modo Fisio',interventions:'Cards da Tia Tati'};

const css=document.createElement('style');
css.textContent=`body.tt-open{overflow:hidden!important}#ttActivity{position:fixed;inset:0;z-index:99999;background:#f8fbff;display:grid;grid-template-rows:auto 1fr}#ttActivity header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;min-height:58px;padding:max(7px,env(safe-area-inset-top)) 10px 7px;background:#fff;border-bottom:1px solid #e1eaf1;box-shadow:0 4px 16px #1f4d7814}#ttActivity header button{border:1px solid #dbe6ee;background:#fff;border-radius:13px;min-height:40px;padding:0 12px;font-weight:850;color:#174c7f}#ttActivity .ttl{text-align:center;min-width:0;display:grid;gap:2px}#ttActivity .ttl strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px;color:#164b87}#ttActivity .ttl small{font-size:9px;font-weight:800;color:#798da0}#ttActivity header img{width:40px;height:40px;border-radius:50%;object-fit:cover}#ttActivity .frame{position:relative;min-height:0;background:linear-gradient(135deg,#fff8fc,#eefaff)}#ttActivity iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#f8fbff}#ttActivity .load{position:absolute;inset:0;z-index:2;display:grid;place-items:center;text-align:center;background:linear-gradient(135deg,#fff8fc,#eefaff);color:#37658d;transition:.18s}#ttActivity.ready .load{opacity:0;pointer-events:none}`;
document.head.appendChild(css);

function closeActivity(){document.getElementById('ttActivity')?.remove();document.body.classList.remove('tt-open');}
function openActivity(key){
 if(key==='home'){closeActivity();window.scrollTo({top:0,behavior:'smooth'});return;}
 closeActivity();
 const title=labels[key]||'Atividade';
 const url=new URL('./activity-v52.html',location.href);
 url.searchParams.set('open',key);url.searchParams.set('embed','1');url.searchParams.set('v',V);url.searchParams.set('t',Date.now());
 const box=document.createElement('section');box.id='ttActivity';
 box.innerHTML=`<header><button type="button">← Voltar</button><div class="ttl"><strong>${title}</strong><small>TIA TATI • FISIO SENSORIAL</small></div><img src="assets/tati-approved-avatar.webp?v=${V}" alt="Tia Tati"></header><div class="frame"><div class="load"><div>💗<br><strong>Preparando ${title}…</strong></div></div><iframe title="${title}" src="${url.href}" allow="autoplay; fullscreen"></iframe></div>`;
 document.body.appendChild(box);document.body.classList.add('tt-open');
 box.querySelector('header button').onclick=closeActivity;
 box.querySelector('iframe').addEventListener('load',()=>setTimeout(()=>box.classList.add('ready'),100),{once:true});
}

document.addEventListener('click',e=>{
 const s=e.target.closest('[data-scroll]');if(s){e.preventDefault();const id=s.dataset.scroll;if(id==='top')window.scrollTo({top:0,behavior:'smooth'});else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const o=e.target.closest('[data-open]');if(o){e.preventDefault();e.stopPropagation();openActivity(o.dataset.open);return;}
 if(e.target.closest('[data-card-open]')){e.preventDefault();openActivity('interventions');}
});

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v='+V,{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}));
})();
