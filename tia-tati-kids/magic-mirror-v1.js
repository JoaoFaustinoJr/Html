(()=>{
'use strict';
if(window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK_V22__)return;
window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK_V22__=true;
const $=(s,r=document)=>r.querySelector(s);
function installStyle(){
 if($('#mmCardV22Style'))return;
 const s=document.createElement('style');s.id='mmCardV22Style';s.textContent=`
 .mm-card .mm-card-art{min-height:150px!important;position:relative!important;overflow:hidden!important;background:linear-gradient(145deg,#ffe9f4,#eef7ff)!important}
 .mm-card .mm-card-art>img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center 48%!important;transform:scale(1.05);display:block!important}
 .mm-card .mm-card-art::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(77,34,91,.16));pointer-events:none}
 .mm-card-sparkles{position:absolute;z-index:2;left:10px;bottom:8px;color:#fff7c4;font-size:16px;letter-spacing:5px;text-shadow:0 1px 8px #a64b97,0 0 8px #fff}
 .mm-card-meta{display:flex;gap:5px;flex-wrap:wrap;padding:0 14px 14px;margin-top:-3px}
 .mm-card-meta i{font-style:normal;font-size:.7rem;font-weight:850;line-height:1;padding:6px 8px;border-radius:999px;background:#f9eef7;color:#d94792;box-shadow:inset 0 0 0 1px #f1dce9}
 .mm-card-meta i:nth-child(2){background:#edf6ff;color:#2777be;box-shadow:inset 0 0 0 1px #dbeaf8}
 .mm-card-meta i:nth-child(3){background:#f4eeff;color:#8151c8;box-shadow:inset 0 0 0 1px #e8ddfa}
 `;document.head.appendChild(s);
}
function install(){
 const g=$('.home-v22-missions');
 if(!g)return false;
 const old=g.querySelector('[data-magic-mirror-portal]');if(old)old.remove();
 installStyle();
 const b=document.createElement('button');
 b.type='button';b.className='home-v22-mission mm-card';b.dataset.magicMirrorPortal='1';
 b.innerHTML=`<span class="home-v22-visual mm-card-art"><img src="../tia-tati-espelho/assets/mask-v6-2.webp?v=22" alt="Espelho Encantado da Tia Tati" decoding="async"><span class="mm-card-sparkles" aria-hidden="true">✦ ✨ ✦</span></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🪞</span><span><strong>Espelho Encantado</strong><small>Expressões • imitação • consciência facial</small></span></span><span class="mm-card-meta" aria-hidden="true"><i>👧 Menina</i><i>👦 Menino</i><i>⭐ 4 emoções</i></span><em>Portal</em>`;
 b.addEventListener('click',()=>{location.href='../tia-tati-espelho/?from=kids&v=22&fresh='+Date.now()});
 g.appendChild(b);return true;
}
function boot(){if(!install())setTimeout(boot,220)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();