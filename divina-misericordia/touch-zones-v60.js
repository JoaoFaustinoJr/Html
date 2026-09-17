/* v60 — fronteira física de toque: cards e barra inferior nunca se sobrepõem */
(function(){'use strict';
const $=s=>document.querySelector(s);
function apply(){const p=$('#portal');if(!p)return;
 /* A barra funcional v56 ocupa 82.8%–90%. Tudo nessa faixa pertence exclusivamente a ela. */
 let nav=p.querySelector('.dm-nav56');if(nav){nav.style.setProperty('z-index','2147483000','important');nav.style.setProperty('pointer-events','auto','important');nav.style.setProperty('isolation','isolate','important')}
 /* O último card da máscara terminava em ~83%; corta sua área invisível antes da barra. */
 let actions=p.querySelector('.portal-actions');if(actions){[...actions.querySelectorAll('button')].forEach((b,i)=>{b.style.setProperty('z-index','20','important');if(i>=5)b.style.setProperty('height','9.7%','important')})}
 /* Escudo transparente captura qualquer toque na faixa da barra antes de elementos inferiores. */
 let shield=p.querySelector('.dm-nav-shield60');if(!shield){shield=document.createElement('div');shield.className='dm-nav-shield60';shield.setAttribute('aria-hidden','true');shield.style.cssText='position:absolute;left:0;right:0;top:82.65%;height:7.55%;z-index:2147482999;pointer-events:auto;background:transparent;touch-action:manipulation;';['pointerdown','touchstart','click'].forEach(t=>shield.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()},{capture:true,passive:false}));p.appendChild(shield)}
 /* nav deve ficar acima do escudo */
 if(nav)p.appendChild(nav)
}
function init(){apply();setTimeout(apply,400);setTimeout(apply,1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,700));else setTimeout(init,700);
})();