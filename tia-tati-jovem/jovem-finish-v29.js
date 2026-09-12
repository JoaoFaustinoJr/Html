(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_FINISH_V29__)return;
window.__TIA_TATI_JOVEM_FINISH_V29__=true;

function addStyle(){
 if(document.getElementById('jovemFinishV29Style'))return;
 const s=document.createElement('style');
 s.id='jovemFinishV29Style';
 s.textContent=`
 #screen-done .done{overflow:hidden}
 #screen-done .jovem-finish-visual{position:relative;display:block;width:min(190px,52vw);aspect-ratio:1/1;margin:0 auto 18px;border-radius:28px;overflow:hidden;background:linear-gradient(145deg,#eefaff,#fff4fa);box-shadow:0 0 0 3px rgba(255,255,255,.95),0 14px 34px rgba(14,64,104,.18)}
 #screen-done .jovem-finish-visual img{position:absolute;inset:0 auto 0 0;display:block;width:200%;max-width:none;height:100%;object-fit:fill;transform:translateX(0);image-rendering:auto;filter:saturate(1.02) contrast(1.01)}
 #screen-done .jovem-finish-visual::after{content:'Tia Tati';position:absolute;right:10px;bottom:9px;padding:5px 9px;border-radius:999px;background:rgba(7,19,47,.84);color:#fff;font:800 11px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:.02em;box-shadow:0 4px 14px rgba(0,0,0,.18)}
 @media(max-width:520px){#screen-done .jovem-finish-visual{width:min(172px,50vw);border-radius:24px}}
 `;
 document.head.appendChild(s);
}

function apply(){
 addStyle();
 const done=document.querySelector('#screen-done .done');
 if(!done)return false;
 const old=done.querySelector(':scope > img, :scope > .jovem-finish-visual');
 if(old?.classList?.contains('jovem-finish-visual'))return true;
 const wrap=document.createElement('div');
 wrap.className='jovem-finish-visual';
 wrap.setAttribute('role','img');
 wrap.setAttribute('aria-label','Tia Tati comemorando a conclusão da atividade');
 const img=document.createElement('img');
 img.src='../tia-tati-kids/assets/cards/cards-pair-2.webp?v=29';
 img.alt='';
 img.decoding='async';
 img.loading='eager';
 img.onerror=()=>{wrap.style.background='linear-gradient(145deg,#0c2c62,#34227a)';img.remove();wrap.setAttribute('aria-label','Tia Tati: muito bem, você conseguiu!');};
 wrap.appendChild(img);
 if(old)old.replaceWith(wrap);else done.prepend(wrap);
 return true;
}

function boot(){if(!apply())setTimeout(boot,180);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('tia:jovem-modules-ready',apply);
})();
