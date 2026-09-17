/* v56 — mapa físico independente da barra inferior; não reutiliza os botões/cards da capa */
(function(){
'use strict';
const $=s=>document.querySelector(s);
function stop(){try{speechSynthesis.cancel()}catch(e){}}
function enter(){stop();document.body.classList.remove('dm-home');$('#portal')?.classList.add('hidden');$('#novena')?.classList.remove('hidden');window.enterNovena?.()}
function run(i){
 if(i===0){stop();window.home?.();return}
 if(i===1){enter();setTimeout(()=>window.dmOpeningPrayers?.(+(localStorage.dmDay||1))||window.setDay?.(+(localStorage.dmDay||1)),100);return}
 if(i===2){enter();setTimeout(()=>window.openFixed?.(),100);return}
 if(i===3){stop();window.openMusic?.();return}
 if(i===4){enter();setTimeout(()=>window.setDay?.(+(localStorage.dmDay||1)),100);return}
 if(i===5){stop();window.openDMAbout?.();return}
}
function build(){
 const p=$('#portal'); if(!p)return;
 p.querySelector('.dm-bottom')?.style.setProperty('pointer-events','none','important');
 p.querySelector('.dm-nav56')?.remove();
 const nav=document.createElement('div');nav.className='dm-nav56';
 nav.style.cssText='position:absolute;z-index:9999;left:3%;right:3%;top:82.8%;height:7.2%;display:grid;grid-template-columns:repeat(6,1fr);gap:0;pointer-events:auto;background:transparent;';
 ['Início','Novena','Orações','Músicas','Reflexões','Mais'].forEach((name,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',name);b.style.cssText='display:block;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent;color:transparent;appearance:none;-webkit-appearance:none;touch-action:manipulation;pointer-events:auto;';let fired=false;const go=e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(fired)return;fired=true;run(i);setTimeout(()=>fired=false,500)};b.addEventListener('touchend',go,{capture:true,passive:false});b.addEventListener('pointerup',go,true);b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation()},true);nav.appendChild(b)});
 p.appendChild(nav);
}
function init(){build();setTimeout(build,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,500));else setTimeout(init,500);
})();