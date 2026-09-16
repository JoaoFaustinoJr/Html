(()=>{
'use strict';
if(window.__TIA_TATI_ROAD_DESTINATION_VIS_V37__)return;
window.__TIA_TATI_ROAD_DESTINATION_VIS_V37__=true;
const MAP={
 'Escola':{icon:'🏫',label:'ESCOLA',cls:'school'},
 'Casa':{icon:'🏠',label:'CASA',cls:'home'},
 'Parque':{icon:'🌳',label:'PARQUE',cls:'park'}
};
function ensureStyle(){
 if(document.getElementById('roadDestinationVisibilityV37Style'))return;
 const s=document.createElement('style');s.id='roadDestinationVisibilityV37Style';s.textContent=`
 .road-game-stage{isolation:isolate}
 .road-destination-v37{position:absolute;z-index:24;top:4.2%;right:3.8%;width:112px;min-height:74px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;pointer-events:none;transform:translateZ(0);filter:drop-shadow(0 5px 7px rgba(30,64,80,.18))}
 .road-destination-v37 .landmark{display:grid;place-items:center;width:64px;height:52px;border:4px solid rgba(255,255,255,.96);border-radius:18px;background:linear-gradient(145deg,#fffdf6,#fff3d5);font-size:35px;line-height:1;box-shadow:0 4px 10px rgba(43,72,86,.12)}
 .road-destination-v37 .label{margin-top:-4px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.96);color:#24547a;font-weight:950;font-size:11px;letter-spacing:.4px;box-shadow:0 2px 7px rgba(43,72,86,.12)}
 .road-destination-v37.park .landmark{background:linear-gradient(145deg,#f4ffe9,#d9f5c9)}
 .road-destination-v37.home .landmark{background:linear-gradient(145deg,#fff7f1,#ffe6d5)}
 .road-destination-v37.school .landmark{background:linear-gradient(145deg,#fffceb,#fff0b9)}
 @media(max-width:520px){.road-destination-v37{top:5.4%;right:2.5%;width:96px}.road-destination-v37 .landmark{width:56px;height:46px;font-size:30px}.road-destination-v37 .label{font-size:10px;padding:3px 8px}}
 `;document.head.appendChild(s);
}
function install(){
 const stage=document.querySelector('.road-game-stage');if(!stage)return false;
 const name=(document.querySelector('.road-score .score-dest b')?.textContent||'Escola').trim();
 const cfg=MAP[name]||MAP.Escola;
 let el=stage.querySelector('.road-destination-v37');
 if(!el){el=document.createElement('div');el.className='road-destination-v37';stage.appendChild(el);}
 el.className='road-destination-v37 '+cfg.cls;
 el.innerHTML='<span class="landmark">'+cfg.icon+'</span><span class="label">'+cfg.label+'</span>';
 return true;
}
ensureStyle();
const obs=new MutationObserver(()=>install());
obs.observe(document.documentElement,{childList:true,subtree:true});
addEventListener('pageshow',install);setTimeout(install,100);setTimeout(install,500);
})();
