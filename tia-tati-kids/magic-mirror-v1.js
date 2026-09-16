(()=>{
'use strict';
if(window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK_V32__)return;
window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK_V32__=true;
const $=(s,r=document)=>r.querySelector(s);
function installStyle(){
 if($('#mmCardV32Style'))return;
 const s=document.createElement('style');s.id='mmCardV32Style';s.textContent=`
 .home-v22-missions{position:relative!important;z-index:6!important;isolation:isolate}.home-v22-missions>.home-v22-mission{pointer-events:auto!important;touch-action:manipulation!important;position:relative;z-index:1}.home-v22-missions>.home-v22-mission:active{z-index:3}
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
function forceScreen(name){
 const target=$('#screen-'+name);if(!target)return false;
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));target.classList.add('active');
 window.scrollTo({top:0,behavior:'smooth'});return true;
}
function installMissionRepair(){
 if(window.__TIA_TATI_KIDS_MISSION_REPAIR_V32__)return;
 window.__TIA_TATI_KIDS_MISSION_REPAIR_V32__=true;
 const setup={road:'roadsetup',bee:'beesetup',target:'targetsetup',hands:'handssetup',light:'lightsetup'};
 document.addEventListener('click',e=>{
  const b=e.target?.closest?.('.home-v22-missions [data-mission]');if(!b)return;
  const mission=b.dataset.mission;
  setTimeout(()=>{
   if(!$('#screen-home')?.classList.contains('active'))return;
   if(b.__tiaRepairing)return;
   b.__tiaRepairing=true;
   try{if(typeof b.onclick==='function')b.onclick.call(b,new MouseEvent('click',{bubbles:false,cancelable:true,view:window}));}catch(_){}
   setTimeout(()=>{
    b.__tiaRepairing=false;
    if($('#screen-home')?.classList.contains('active')&&setup[mission])forceScreen(setup[mission]);
   },60);
  },60);
 },true);
 const ids=['startRoadMission','startBeeMission','startTargetMission','startHandsMission','startLightMission','startCircuit'];
 document.addEventListener('click',e=>{
  const b=e.target?.closest?.('button');if(!b||!ids.includes(b.id)||b.__tiaRepairing)return;
  const before=document.querySelector('.screen.active')?.id||'';
  setTimeout(()=>{
   const after=document.querySelector('.screen.active')?.id||'';if(after!==before||b.__tiaRepairing)return;
   if(typeof b.onclick!=='function')return;b.__tiaRepairing=true;
   try{b.onclick.call(b,new MouseEvent('click',{bubbles:false,cancelable:true,view:window}));}catch(_){}finally{setTimeout(()=>b.__tiaRepairing=false,80)}
  },70);
 },true);
}
function install(){
 const g=$('.home-v22-missions');if(!g)return false;
 const old=g.querySelector('[data-magic-mirror-portal]');if(old)old.remove();installStyle();installMissionRepair();
 const b=document.createElement('button');b.type='button';b.className='home-v22-mission mm-card';b.dataset.magicMirrorPortal='1';
 b.innerHTML=`<span class="home-v22-visual mm-card-art"><img src="../tia-tati-espelho/assets/mask-v6-2.webp?v=31" alt="Espelho Encantado da Tia Tati" decoding="async"><span class="mm-card-sparkles" aria-hidden="true">✦ ✨ ✦</span></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🪞</span><span><strong>Espelho Encantado</strong><small>Expressões • voz • saberes</small></span></span><span class="mm-card-meta" aria-hidden="true"><i>👧 Menina</i><i>👦 Menino</i><i>🎙️ Pergunte</i></span><em>Portal</em>`;
 b.addEventListener('click',()=>{location.href='../tia-tati-espelho/?from=kids&v=31&fresh='+Date.now()});g.appendChild(b);return true;
}
function boot(){if(!install())setTimeout(boot,220)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();