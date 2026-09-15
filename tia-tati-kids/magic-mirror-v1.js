(()=>{
'use strict';
if(window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK__)return;
window.__TIA_TATI_MAGIC_MIRROR_PORTAL_LINK__=true;
const $=(s,r=document)=>r.querySelector(s);
function install(){
 const g=$('.home-v22-missions');
 if(!g||g.querySelector('[data-magic-mirror-portal]'))return false;
 const b=document.createElement('button');
 b.type='button';
 b.className='home-v22-mission mm-card';
 b.dataset.magicMirrorPortal='1';
 b.innerHTML='<span class="home-v22-visual" style="min-height:150px;display:grid;place-items:center;background:linear-gradient(145deg,#efe7ff,#fff4fa)"><span style="width:104px;height:124px;border:8px solid #b26cff;border-radius:48% 48% 44% 44%;background:linear-gradient(145deg,#eafaff,#fff);box-shadow:0 10px 22px #7e4cc72a,inset 0 0 0 4px #fff;display:grid;place-items:center;font-size:52px">😊</span></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🪞</span><span><strong>Espelho Mágico</strong><small>Expressões • imitação • consciência facial</small></span></span><em>Portal</em>';
 b.addEventListener('click',()=>{location.href='../tia-tati-espelho/?from=kids'});
 g.appendChild(b);
 return true;
}
function boot(){if(!install())setTimeout(boot,220)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();