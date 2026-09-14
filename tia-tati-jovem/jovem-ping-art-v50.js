(()=>{
'use strict';
if(window.__TIA_TATI_PING_ART_V50__)return;
window.__TIA_TATI_PING_ART_V50__=true;
const $=(s,r=document)=>r.querySelector(s);
function style(){if($('#pingArt50Style'))return;const s=document.createElement('style');s.id='pingArt50Style';s.textContent=`
#screen-home .ping50-art{position:relative!important;display:block!important;width:100%!important;aspect-ratio:2.88/1!important;overflow:hidden!important;background:linear-gradient(135deg,#06142f,#101d4f 58%,#32105d)!important}
#screen-home .ping50-image{position:absolute;inset:0;background-size:cover;background-position:center;background-repeat:no-repeat;filter:saturate(1.08) contrast(1.03)}
#screen-home .ping50-image:before{content:"";position:absolute;z-index:2;left:0;top:0;bottom:0;width:62%;pointer-events:none;background:radial-gradient(circle at 28% 54%,rgba(48,231,255,.18),transparent 24%),linear-gradient(90deg,#06142f 0%,#0a1a45 67%,rgba(10,26,69,.80) 82%,rgba(10,26,69,0) 100%)}
#screen-home .ping50-image:after{content:"";position:absolute;z-index:3;inset:0;border:1px solid rgba(69,233,255,.36);box-shadow:inset 0 0 28px rgba(255,79,168,.18);pointer-events:none}
#screen-home .ping50-badge{position:absolute;left:9px;top:7px;z-index:4;color:#fff;font-size:.46rem;font-style:normal;font-weight:950;letter-spacing:.08em;text-shadow:0 2px 7px rgba(0,0,0,.9)}
@media(max-width:720px){#screen-home .ping50-image:before{width:64%}}
`;document.head.appendChild(s)}
async function apply(){style();const card=$('[data-ping48]');if(!card)return false;const art=$('.youth-card-art',card);if(!art)return false;try{const r=await fetch('assets/jovem-v27/pingpong-approved-v50.b64?v=50',{cache:'reload'});const b64=(await r.text()).trim();art.className='youth-card-art ping50-art';art.innerHTML='<div class="ping50-image"></div><em class="ping50-badge">PING PONG FOCUS</em>';const img=$('.ping50-image',art);img.style.backgroundImage=`url("data:image/webp;base64,${b64}")`;art.dataset.v50='1';return true}catch(e){console.warn('Arte Ping Pong v50 não carregada',e);return false}}
function boot(){apply();[300,700,1400].forEach(t=>setTimeout(apply,t))}
boot();window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(apply,450));
})();