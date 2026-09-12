(()=>{
 if(window.__raiAulasEntry1595)return;window.__raiAulasEntry1595=true;
 const HIGHLIGHT_KEY='raiProvaParanaLaunch1597';
 let queued=false,highlightDone=false;
 function showLaunchNotice(){
  let t=document.getElementById('raiPPLaunchNotice');
  if(!t){t=document.createElement('div');t.id='raiPPLaunchNotice';t.className='rai-pp-launch-notice';t.setAttribute('role','status');t.setAttribute('aria-live','polite');t.innerHTML='<span>🎯</span><div><b>Especial Prova Paraná</b><small>Matemática e Língua Portuguesa • 6º ao 9º ano</small></div>';document.body.appendChild(t)}
  requestAnimationFrame(()=>t.classList.add('show'));
  clearTimeout(t._hide);t._hide=setTimeout(()=>t.classList.remove('show'),3200);
 }
 function highlight(button){
  if(highlightDone||!button)return;
  let seen=false;try{seen=sessionStorage.getItem(HIGHLIGHT_KEY)==='1'}catch(e){}
  if(seen){highlightDone=true;return}
  highlightDone=true;
  try{sessionStorage.setItem(HIGHLIGHT_KEY,'1')}catch(e){}
  setTimeout(()=>{
   if(!button.isConnected)return;
   button.classList.add('rai-pp-launch-highlight');showLaunchNotice();
   setTimeout(()=>button.classList.remove('rai-pp-launch-highlight'),6200);
  },420);
 }
 function ensure(){
  const root=document.getElementById('tangram-levels'),dock=document.getElementById('raiLessonDock'),tools=root?.querySelector('.tl-brand-tools');
  if(!root||!dock||!tools)return;
  let b=document.getElementById('raiLessonHeaderButton');
  if(!b){
   b=document.createElement('button');b.type='button';b.id='raiLessonHeaderButton';b.className='tl-mini-action';b.setAttribute('aria-label','Abrir Aulas da Raí — Especial Prova Paraná');b.innerHTML='🎓 <span>Aulas</span><i class="rai-lesson-header-pr">🎯 Prova Paraná</i>';
   b.addEventListener('click',()=>document.getElementById('raiLessonDock')?.click());
   const perf=document.getElementById('performanceApp'),about=document.getElementById('aboutApp');
   if(perf)tools.insertBefore(b,perf);else if(about)tools.insertBefore(b,about);else tools.appendChild(b);
  }else{
   const badge=b.querySelector('.rai-lesson-header-pr');if(badge&&badge.textContent!=='🎯 Prova Paraná')badge.textContent='🎯 Prova Paraná';
  }
  highlight(b);
 }
 const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensure()})};
 ensure();setTimeout(ensure,180);setTimeout(ensure,520);
 const mo=new MutationObserver(run);mo.observe(document.documentElement,{childList:true,subtree:true});
 addEventListener('pageshow',ensure);addEventListener('orientationchange',()=>setTimeout(ensure,120));
 window.__raiEnsureAulasEntry=ensure;
})();