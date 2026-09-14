(()=>{
'use strict';
if(window.__joaoAuthorshipUI)return;window.__joaoAuthorshipUI=1;
const AUTHOR='Prof. João Faustino Júnior';
const TATIANA='Dra. Tatiana de Oliveira Machado';
const LINK='https://github.com/JoaoFaustinoJr/Html/blob/main/AUTHORSHIP.md';
const IS_TIA=/\/tia-tati(?:-|\/)/i.test(location.pathname);
const CREDIT='© 2026 João Faustino Júnior • Concepção e direção do projeto';
const detail=IS_TIA
 ? `<div class="jf-auth-box"><strong>Autoria e colaboração profissional</strong><p><b>${TATIANA}</b><br>Conteúdos profissionais, orientações de fisioterapia, imagem, voz e contribuições terapêuticas.</p><p><b>${AUTHOR}</b><br>Concepção do produto digital, direção, arquitetura da experiência, definição das funcionalidades, integração, testes, validação e evolução.</p><p><b>${CREDIT}</b></p><a href="${LINK}" target="_blank" rel="noopener">Ver declaração completa de autoria</a></div>`
 : `<div class="jf-auth-box"><strong>${CREDIT}</strong><p>Concepção, direção do produto, arquitetura da experiência, curadoria de conteúdo, testes, validação e evolução: ${AUTHOR}.</p><a href="${LINK}" target="_blank" rel="noopener">Ver declaração completa de autoria</a></div>`;
const css=document.createElement('style');css.textContent=`
.jf-auth-box{margin:18px 0 4px;padding:13px 14px;border:1px solid rgba(127,127,127,.22);border-radius:14px;background:rgba(127,127,127,.07);font:600 12px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:inherit}.jf-auth-box strong{display:block;font-size:12.5px;margin-bottom:5px}.jf-auth-box p{margin:0 0 9px;opacity:.82}.jf-auth-box a{color:inherit;text-decoration:underline;font-weight:800}.jf-auth-btn{position:fixed;z-index:2147483000;right:12px;bottom:max(74px,calc(env(safe-area-inset-bottom) + 64px));border:1px solid rgba(127,127,127,.25);border-radius:999px;padding:7px 10px;background:rgba(255,255,255,.92);color:#244b73;font:800 11px/1 system-ui;box-shadow:0 5px 18px rgba(0,0,0,.12);backdrop-filter:blur(8px)}.jf-auth-overlay{position:fixed;z-index:2147483646;inset:0;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.48);backdrop-filter:blur(6px)}.jf-auth-card{width:min(92vw,520px);max-height:82vh;overflow:auto;border-radius:24px;padding:20px;background:#fff;color:#183b5c;box-shadow:0 20px 70px rgba(0,0,0,.3);font:600 14px/1.5 system-ui}.jf-auth-card h2{margin:0 0 10px}.jf-auth-card button{float:right;border:0;border-radius:999px;padding:8px 11px;background:#edf3f8;color:#264b6b;font-weight:900}.jf-auth-card .jf-auth-box{font-size:13px}@media(prefers-color-scheme:dark){.jf-auth-btn{background:rgba(18,31,45,.92);color:#eef8ff}.jf-auth-card{background:#102030;color:#eef8ff}}
`;document.head.appendChild(css);
function appendCredit(root){if(!root||root.querySelector?.('.jf-auth-box'))return;const box=document.createElement('div');box.innerHTML=detail;const node=box.firstElementChild;const close=root.querySelector('button:last-of-type');if(close&&close.parentElement===root)root.insertBefore(node,close);else root.appendChild(node)}
function visibleDialog(){const all=[...document.querySelectorAll('[role="dialog"],dialog,.modal,.mq-modal-card,.tl-modal-card,.sheet,.settings-card,.about-card')];return all.reverse().find(el=>{const s=getComputedStyle(el);const r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>50&&r.height>30})}
function openOwn(){document.querySelector('.jf-auth-overlay')?.remove();const o=document.createElement('div');o.className='jf-auth-overlay';o.innerHTML=`<div class="jf-auth-card" role="dialog" aria-modal="true"><button type="button" aria-label="Fechar">✕</button><h2>Sobre e autoria</h2>${detail}</div>`;o.addEventListener('click',e=>{if(e.target===o||e.target.closest('button'))o.remove()});document.body.appendChild(o)}
function wire(){const sel='#aboutApp,[data-about],[id*="about" i],[id*="sobre" i],[title*="sobre" i],[aria-label*="sobre" i]';const found=[...document.querySelectorAll(sel)].filter(el=>!el.classList.contains('jf-auth-btn'));
 found.forEach(btn=>{if(btn.dataset.jfAuth)return;btn.dataset.jfAuth='1';btn.addEventListener('click',()=>{setTimeout(()=>{const d=visibleDialog();if(d)appendCredit(d);else openOwn()},60),{passive:true})});
 if(!found.length&&!document.querySelector('.jf-auth-btn')){const b=document.createElement('button');b.type='button';b.className='jf-auth-btn';b.textContent='ⓘ Sobre';b.title='Sobre e autoria';b.addEventListener('click',openOwn);document.body.appendChild(b)}
}
const mo=new MutationObserver(()=>wire());mo.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();
setTimeout(wire,700);setTimeout(wire,2200);
})();
