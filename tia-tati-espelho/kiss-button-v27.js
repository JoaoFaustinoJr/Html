(()=>{
'use strict';
if(window.__TIA_TATI_KISS_BUTTON_V27__)return;
window.__TIA_TATI_KISS_BUTTON_V27__=true;
function install(){
 const b=document.querySelector('.hs-kiss[data-expression="kiss"]');
 if(!b)return false;
 b.addEventListener('click',()=>{
   b.classList.add('selected-kiss');
   setTimeout(()=>b.classList.remove('selected-kiss'),3200);
   setTimeout(()=>window.dispatchEvent(new CustomEvent('tia:mirror-expression',{detail:{expression:'kiss',source:'camera',manual:true}})),30);
 });
 return true;
}
function boot(){if(!install())setTimeout(boot,120)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();