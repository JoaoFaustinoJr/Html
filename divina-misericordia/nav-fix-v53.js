/* v53 — barra inferior: roteamento por POSIÇÃO física, independente de aria-label/handlers antigos */
(function(){
'use strict';
const $=s=>document.querySelector(s);
function stop(){try{speechSynthesis.cancel()}catch(e){}}
function enter(){stop();document.body.classList.remove('dm-home');$('#portal')?.classList.add('hidden');$('#novena')?.classList.remove('hidden');window.enterNovena?.()}
const actions=[
 ()=>{stop();window.home?.()},
 ()=>{enter();setTimeout(()=>window.dmOpeningPrayers?window.dmOpeningPrayers(+(localStorage.dmDay||1)):window.setDay?.(+(localStorage.dmDay||1)),80)},
 ()=>{enter();setTimeout(()=>window.openFixed?.(),80)},
 ()=>{stop();window.openMusic?.()},
 ()=>{enter();setTimeout(()=>window.setDay?.(+(localStorage.dmDay||1)),80)},
 ()=>{stop();window.openDMAbout?.()}
];
function bind(){let nav=$('#portal .dm-bottom');if(!nav)return;let old=nav.cloneNode(true);nav.replaceWith(old);let bs=[...old.querySelectorAll('button')];bs.forEach((b,i)=>{b.onclick=null;b.removeAttribute('onclick');b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();actions[i]?.()},true)});old.dataset.nav53='1'}
function removeLanguage(){document.querySelector('.dm-lang-home51')?.remove();document.querySelector('#dmLang50')?.remove()}
function init(){removeLanguage();bind();setTimeout(()=>{removeLanguage();bind()},500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,350));else setTimeout(init,350);
})();