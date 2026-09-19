(()=>{
'use strict';
if(window.__raiVerifyAssistV1)return;window.__raiVerifyAssistV1=true;
const root=document.getElementById('tangram-levels');if(!root)return;
const status=root.querySelector('#status');
const msg=root.querySelector('#msg');
const title=root.querySelector('#title');
let prompt=null,timer=null,lastSignature='',dismissed='',pulseTimer=null;

const isGamer=()=>document.body.classList.contains('rai-gamer-running')||root.classList.contains('rai-gamer-running');
const textOf=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
const missionDone=()=>/miss[aã]o conclu[ií]da/i.test(textOf(msg));
const ready=()=>/encaixe pronto|miss[aã]o completa/i.test(textOf(status))&&!missionDone();
const signature=()=>textOf(title)+'|'+textOf(status);
const verifyButton=()=>root.querySelector('#mCheck')||[...root.querySelectorAll('button')].find(b=>/verificar/i.test(textOf(b)));

const style=document.createElement('style');
style.textContent=`
.rai-verify-assist{position:fixed;z-index:2147482500;left:50%;bottom:max(20px,calc(env(safe-area-inset-bottom) + 18px));transform:translate(-50%,14px);width:min(92vw,430px);opacity:0;pointer-events:none;transition:.2s ease;background:linear-gradient(145deg,rgba(8,29,48,.98),rgba(8,53,74,.98));color:#eefaff;border:1px solid rgba(76,218,255,.38);border-radius:20px;padding:14px 15px;box-shadow:0 18px 46px rgba(0,0,0,.32);font:600 14px/1.42 system-ui,-apple-system,"Segoe UI",sans-serif}
.rai-verify-assist.show{opacity:1;transform:translate(-50%,0);pointer-events:auto}
.rai-verify-assist-head{display:flex;gap:10px;align-items:center}.rai-verify-assist-head img{width:42px;height:42px;object-fit:contain}.rai-verify-assist-head b{display:block;font-size:15px;color:#fff}.rai-verify-assist-head span{display:block;margin-top:2px;color:#c9eaf4;font-size:12px}
.rai-verify-assist-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:12px}.rai-verify-assist-actions button{border:1px solid rgba(255,255,255,.2);border-radius:13px;padding:10px 11px;background:rgba(255,255,255,.08);color:#eefaff;font-weight:850;cursor:pointer}.rai-verify-assist-actions .primary{background:#14a8c7;border-color:#49d8ef;color:#041c26}
.rai-verify-pulse{animation:raiVerifyPulse 1s ease 2}@keyframes raiVerifyPulse{0%,100%{transform:scale(1);box-shadow:inherit}50%{transform:scale(1.06);box-shadow:0 0 0 7px rgba(41,214,239,.18),0 8px 24px rgba(0,0,0,.18)}}
@media(max-width:520px){.rai-verify-assist{bottom:max(74px,calc(env(safe-area-inset-bottom) + 66px));width:min(94vw,420px)}}
`;
document.head.appendChild(style);

function ensurePrompt(){
 if(prompt?.isConnected)return prompt;
 prompt=document.createElement('div');
 prompt.className='rai-verify-assist';
 prompt.setAttribute('role','dialog');
 prompt.setAttribute('aria-live','polite');
 prompt.innerHTML='<div class="rai-verify-assist-head"><img src="rai-icon.svg?v=rai3" alt="R.A.I."><div><b>Parece que você terminou!</b><span>Quer que eu confira o encaixe?</span></div></div><div class="rai-verify-assist-actions"><button type="button" class="primary" data-verify>✓ Verificar agora</button><button type="button" data-adjust>Continuar ajustando</button></div>';
 prompt.querySelector('[data-verify]').addEventListener('click',()=>{
   hide(true);
   const b=verifyButton();
   if(b){b.click();setTimeout(()=>b.focus?.(),60)}
 });
 prompt.querySelector('[data-adjust]').addEventListener('click',()=>{dismissed=signature();hide(false)});
 document.body.appendChild(prompt);
 return prompt;
}
function pulseVerify(){
 const b=verifyButton();if(!b)return;
 b.classList.remove('rai-verify-pulse');void b.offsetWidth;b.classList.add('rai-verify-pulse');
 clearTimeout(pulseTimer);pulseTimer=setTimeout(()=>b.classList.remove('rai-verify-pulse'),2300);
}
function show(){
 if(isGamer()||!ready()||missionDone())return;
 const sig=signature();if(!sig||sig===dismissed||sig===lastSignature)return;
 lastSignature=sig;
 const p=ensurePrompt();requestAnimationFrame(()=>p.classList.add('show'));pulseVerify();
}
function hide(clearDismiss=false){
 clearTimeout(timer);timer=null;
 prompt?.classList.remove('show');
 verifyButton()?.classList.remove('rai-verify-pulse');
 if(clearDismiss)dismissed='';
}
function schedule(){
 clearTimeout(timer);
 if(!ready()||missionDone()||isGamer()){hide(false);if(!ready())lastSignature='';return}
 timer=setTimeout(show,850);
}
const obs=new MutationObserver(schedule);
if(status)obs.observe(status,{subtree:true,childList:true,characterData:true,attributes:true});
if(msg)obs.observe(msg,{subtree:true,childList:true,characterData:true,attributes:true});
if(title)new MutationObserver(()=>{lastSignature='';dismissed='';hide(false)}).observe(title,{subtree:true,childList:true,characterData:true});
root.addEventListener('pointerdown',e=>{
 if(!prompt?.classList.contains('show'))return;
 if(e.target.closest('.rai-verify-assist'))return;
 if(e.target.closest('#board .piece')){dismissed=signature();hide(false)}
},{capture:true,passive:true});
root.addEventListener('click',e=>{
 const b=e.target.closest?.('#mCheck');if(b)hide(true);
},{capture:true});
window.addEventListener('blur',()=>hide(false));
schedule();
window.__raiVerifyAssist={show,hide,schedule};
})();