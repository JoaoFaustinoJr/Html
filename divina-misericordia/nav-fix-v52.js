/* v52 — roteamento definitivo da navegação inferior da capa. Sem traduções. */
(function(){
'use strict';
function stopAudio(){try{speechSynthesis.cancel()}catch(e){}}
function enter(){stopAudio();document.body.classList.remove('dm-home');document.getElementById('portal')?.classList.add('hidden');document.getElementById('novena')?.classList.remove('hidden');window.enterNovena?.()}
function home(){stopAudio();window.home?.()}
function novena(){enter();setTimeout(()=>{if(window.dmOpeningPrayers)window.dmOpeningPrayers(+(localStorage.dmDay||1));else window.setDay?.(+(localStorage.dmDay||1))},60)}
function prayers(){enter();setTimeout(()=>window.openFixed?.(),60)}
function music(){stopAudio();window.openMusic?.()}
function reflections(){enter();setTimeout(()=>window.setDay?.(+(localStorage.dmDay||1)),60)}
function more(){stopAudio();window.openDMAbout?.()}
const routes={inicio:home,'início':home,novena:novena,'orações':prayers,oracoes:prayers,'músicas':music,musicas:music,'reflexões':reflections,reflexoes:reflections,mais:more};
function bind(){
 const nav=document.querySelector('#portal .dm-bottom'); if(!nav||nav.dataset.nav52)return;
 nav.dataset.nav52='1';
 nav.addEventListener('click',function(e){
   const b=e.target.closest('button'); if(!b||!nav.contains(b))return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const key=(b.getAttribute('aria-label')||'').trim().toLowerCase();
   (routes[key]||[home,novena,prayers,music,reflections,more][Array.from(nav.querySelectorAll('button')).indexOf(b)]||home)();
 },true);
}
function removeLanguage(){document.querySelector('.dm-lang-home51')?.remove();document.querySelector('#dmLang50')?.remove()}
function init(){removeLanguage();bind();setTimeout(()=>{removeLanguage();bind()},300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,200));else setTimeout(init,200);
})();