/* v51 — correção única da capa: navegação inferior + idioma global */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const labels={'pt-BR':'PT','en-US':'EN','es-ES':'ES','de-DE':'DE'};
function enter(){document.body.classList.remove('dm-home');window.enterNovena?.()}
function opening(){enter();setTimeout(()=>window.dmOpeningPrayers?.(+(localStorage.dmDay||1)),80)}
function prayers(){enter();setTimeout(()=>window.openFixed?.(),80)}
function bindBottom(){let n=$('#portal .dm-bottom');if(!n)return;let b=n.querySelectorAll('button');if(b.length<6)return;b[0].onclick=e=>{e.preventDefault();window.home?.()};b[1].onclick=e=>{e.preventDefault();opening()};b[2].onclick=e=>{e.preventDefault();prayers()};b[3].onclick=e=>{e.preventDefault();window.openMusic?.()};b[4].onclick=e=>{e.preventDefault();enter();setTimeout(()=>window.setDay?.(+(localStorage.dmDay||1)),70)};b[5].onclick=e=>{e.preventDefault();window.openDMAbout?.()}}
function bindCards(){let b=$$('#portal .portal-actions button');if(b.length<7)return;b[0].onclick=e=>{e.preventDefault();opening()};b[1].onclick=e=>{e.preventDefault();prayers()};b[2].onclick=e=>{e.preventDefault();enter();setTimeout(()=>window.openChaplet?.(),80)}}
function $$(s){return [...document.querySelectorAll(s)]}
function lang(){document.querySelector('.dm-lang-home51')?.remove();let p=$('#portal');if(!p)return;let w=document.createElement('div');w.className='dm-lang-home51';w.style.cssText='position:absolute;z-index:65;right:3.5%;top:2.2%;display:flex;gap:4px;padding:4px;border:1px solid rgba(228,190,113,.55);border-radius:14px;background:rgba(10,8,9,.72);backdrop-filter:blur(5px)';let cur=localStorage.dmLang||'pt-BR';Object.entries(labels).forEach(([k,v])=>{let x=document.createElement('button');x.type='button';x.textContent=v;x.setAttribute('aria-label',k);x.style.cssText='border:0;border-radius:9px;padding:5px 7px;background:'+(k===cur?'#8f1d25':'transparent')+';color:#f5d89c;font:700 11px system-ui';x.onclick=e=>{e.preventDefault();localStorage.dmLang=k;document.documentElement.lang=k;let internal=$('#dmLang50');if(internal){internal.value=k;internal.dispatchEvent(new Event('change',{bubbles:true}))}lang()};w.appendChild(x)});p.appendChild(w)}
function init(){bindBottom();bindCards();lang();setTimeout(bindBottom,250);setTimeout(bindCards,250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,180));else setTimeout(init,180);
})();