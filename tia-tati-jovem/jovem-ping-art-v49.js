(()=>{
'use strict';
if(window.__TIA_TATI_PING_ART_V49__)return;
window.__TIA_TATI_PING_ART_V49__=true;
const $=(s,r=document)=>r.querySelector(s);
function style(){if($('#pingArt49Style'))return;const s=document.createElement('style');s.id='pingArt49Style';s.textContent=`
#screen-home .ping49-art{position:relative!important;display:block!important;width:100%!important;aspect-ratio:2.88/1!important;overflow:hidden!important;background:linear-gradient(145deg,#071633,#121b55 58%,#35105e)!important}
#screen-home .ping49-face{position:absolute;right:0;top:0;width:47%;height:100%;overflow:hidden;z-index:1}
#screen-home .ping49-face img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center 24%!important;filter:saturate(.98) contrast(1.02)}
#screen-home .ping49-shade{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,#091538 0%,rgba(9,21,56,.93) 39%,rgba(9,21,56,.45) 59%,rgba(9,21,56,.05) 82%);pointer-events:none}
#screen-home .ping49-table{position:absolute;left:7%;width:51%;top:20%;bottom:13%;z-index:3;border:2px solid #48e9ff;border-radius:12px;transform:perspective(220px) rotateX(10deg);box-shadow:0 0 24px rgba(72,233,255,.32),inset 0 0 24px rgba(72,233,255,.09)}
#screen-home .ping49-net{position:absolute;left:50%;top:0;bottom:0;border-left:2px dashed rgba(255,255,255,.72)}
#screen-home .ping49-paddle{position:absolute;top:28%;width:8px;height:44%;border-radius:7px;box-shadow:0 0 15px currentColor}
#screen-home .ping49-p1{left:8px;background:#45e9ff;color:#45e9ff}.ping49-p2{right:8px;background:#ff4fa8;color:#ff4fa8}
#screen-home .ping49-ball{position:absolute;left:58%;top:38%;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 16px #fff}
#screen-home .ping49-badge{position:absolute;left:10px;top:8px;z-index:5;color:#fff;font-size:.48rem;font-style:normal;font-weight:950;letter-spacing:.08em;text-shadow:0 2px 7px rgba(0,0,0,.9)}
`;
document.head.appendChild(s)}
function apply(){style();const card=$('[data-ping48]');if(!card)return false;const art=$('.ping48-art',card)||$('.youth-card-art',card);if(!art||art.dataset.v49==='1')return !!art;art.dataset.v49='1';art.className='youth-card-art ping49-art';art.innerHTML=`<div class="ping49-face"><img src="assets/jovem-v27/hero-jovem.webp?v=49" alt="Tia Tati" decoding="async"></div><div class="ping49-shade"></div><div class="ping49-table"><div class="ping49-net"></div><div class="ping49-paddle ping49-p1"></div><div class="ping49-paddle ping49-p2"></div><div class="ping49-ball"></div></div><em class="ping49-badge">PING PONG FOCUS</em>`;return true}
function boot(){if(apply())return;let n=0;const t=setInterval(()=>{n++;if(apply()||n>25)clearInterval(t)},160)}
boot();window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(apply,400));
})();