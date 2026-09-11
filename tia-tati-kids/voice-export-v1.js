(()=>{
'use strict';
if(window.__TIA_TATI_VOICE_EXPORT_V2__)return;
window.__TIA_TATI_VOICE_EXPORT_V2__=true;

const DB_NAME='TiaTatiVoiceV12';
const STORE='clips';

function openDB(){
  return new Promise((resolve,reject)=>{
    if(!window.indexedDB)return reject(new Error('IndexedDB indisponível'));
    const r=indexedDB.open(DB_NAME,1);
    r.onupgradeneeded=()=>{
      if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE,{keyPath:'id'});
    };
    r.onsuccess=()=>resolve(r.result);
    r.onerror=()=>reject(r.error||new Error('Falha ao abrir as gravações'));
  });
}

async function getAllClips(){
  const db=await openDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,'readonly');
    const st=tx.objectStore(STORE);
    if(st.getAll){
      const q=st.getAll();
      q.onsuccess=()=>resolve(q.result||[]);
      q.onerror=()=>reject(q.error);
      return;
    }
    const rows=[];
    const q=st.openCursor();
    q.onsuccess=e=>{const c=e.target.result;if(c){rows.push(c.value);c.continue();}else resolve(rows);};
    q.onerror=()=>reject(q.error);
  });
}

function blobToDataURL(blob){
  return new Promise((resolve,reject)=>{
    const r=new FileReader();
    r.onload=()=>resolve(r.result);
    r.onerror=()=>reject(r.error||new Error('Falha ao converter áudio'));
    r.readAsDataURL(blob);
  });
}

function stamp(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}

async function exportVoices(btn){
  const old=btn.textContent;
  btn.disabled=true;
  btn.textContent='Preparando pacote…';
  try{
    const clips=await getAllClips();
    if(!clips.length){
      alert('Ainda não há falas gravadas neste aparelho.');
      return;
    }
    const payload={app:'Tia Tati – Fisio Sensorial',schema:1,database:DB_NAME,exportedAt:new Date().toISOString(),count:clips.length,clips:[]};
    for(const rec of clips){
      if(!rec?.id||!rec?.blob)continue;
      payload.clips.push({id:rec.id,type:rec.blob.type||'audio/webm',size:rec.blob.size||0,at:rec.at||null,data:await blobToDataURL(rec.blob)});
    }
    payload.count=payload.clips.length;
    const json=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(json);
    const a=document.createElement('a');
    a.href=url;
    a.download=`tia-tati-pacote-de-vozes-${stamp()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),3000);
  }catch(err){
    console.error(err);
    alert('Não consegui exportar as vozes. Tente novamente neste mesmo aparelho e navegador.');
  }finally{
    btn.disabled=false;
    btn.textContent=old;
  }
}

function installUI(){
  const screen=document.getElementById('screen-voice');
  if(!screen||screen.querySelector('#voiceExportPanel'))return;
  const toolbar=screen.querySelector('.voice-toolbar');
  const list=document.getElementById('phraseList');
  const count=document.getElementById('voiceCount');
  if(!toolbar&&!list&&!count)return;

  const panel=document.createElement('section');
  panel.id='voiceExportPanel';
  panel.setAttribute('aria-label','Exportação das vozes gravadas');
  panel.style.cssText='display:block!important;margin:14px 0 18px!important;padding:16px!important;border-radius:22px!important;background:linear-gradient(135deg,#fff6fb,#eefaff)!important;border:1px solid rgba(43,91,112,.16)!important;box-shadow:0 8px 24px rgba(24,66,91,.08)!important;visibility:visible!important;opacity:1!important;';
  panel.innerHTML=`<div style="display:flex;gap:12px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap"><div style="flex:1;min-width:210px"><strong style="display:block;color:#173d71;font-size:1rem;margin-bottom:5px">Pacote definitivo de vozes</strong><small style="display:block;color:#667f91;line-height:1.45">Depois de revisar as gravações, exporte tudo em um único arquivo. Esse pacote será usado para incorporar a voz da Tatiana ao app.</small></div><button id="exportVoicesBtn" type="button" style="border:0;border-radius:999px;padding:12px 17px;background:linear-gradient(90deg,#f2479a,#ff65ae);color:white;font-weight:900;box-shadow:0 8px 20px rgba(242,71,154,.2);cursor:pointer;min-height:44px">⬇️ Exportar pacote de vozes</button></div>`;

  if(toolbar?.parentElement===screen){
    toolbar.insertAdjacentElement('afterend',panel);
  }else if(list?.parentElement===screen){
    screen.insertBefore(panel,list);
  }else{
    screen.appendChild(panel);
  }
  panel.querySelector('#exportVoicesBtn')?.addEventListener('click',e=>exportVoices(e.currentTarget));
}

installUI();
[80,250,700,1500].forEach(ms=>setTimeout(installUI,ms));
new MutationObserver(installUI).observe(document.documentElement,{subtree:true,childList:true});
})();
