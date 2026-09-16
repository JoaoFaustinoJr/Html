/* v26 — single Home controller; prevents legacy portal return and restores visible CTA over image mask */
(function(){
 function $(id){return document.getElementById(id)}
 function closeOverlays(){
  try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}
  document.querySelectorAll('.modal.open,.intent-modal.open,.dm-sheet-bg.open,.dm-auto.open').forEach(function(x){x.classList.remove('open')});
 }
 function showHome(replaceHistory){
  closeOverlays();
  var p=$('portal'),n=$('novena');
  if(n)n.classList.add('hidden');
  if(p)p.classList.remove('hidden');
  document.body.classList.add('dm-home');
  window.scrollTo(0,0);
  if(replaceHistory!==false){try{history.replaceState({dm:'home'},'',location.pathname+location.search)}catch(e){}}
 }
 function showNovena(){document.body.classList.remove('dm-home')}
 function bind(){
  var p=$('portal'),n=$('novena'); if(!p||!n)return;
  window.home=function(){showHome(true)};
  document.querySelectorAll('.homebtn').forEach(function(b){b.onclick=function(e){e.preventDefault();showHome(true)}});
  var main=p.querySelector('.portal-actions .main');
  if(main){main.setAttribute('aria-label','Iniciar / continuar a Novena');main.innerHTML='<span class="dm-main-label">✝&nbsp;&nbsp; Iniciar / continuar a Novena &nbsp;›</span>';main.onclick=function(e){e.preventDefault();showNovena();if(typeof window.enterNovena==='function')window.enterNovena()}}
  p.querySelectorAll('.portal-actions button:not(.main)').forEach(function(b){b.addEventListener('click',showNovena,{capture:true})});
  try{history.replaceState({dm:'home'},'',location.pathname+location.search)}catch(e){}
  window.addEventListener('popstate',function(){showHome(false)});
  showHome(false);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();