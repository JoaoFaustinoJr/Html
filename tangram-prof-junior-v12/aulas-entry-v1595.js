(()=>{
 if(window.__raiAulasEntry1595)return;window.__raiAulasEntry1595=true;
 let queued=false;
 function ensure(){
  const root=document.getElementById('tangram-levels'),dock=document.getElementById('raiLessonDock'),tools=root?.querySelector('.tl-brand-tools');
  if(!root||!dock||!tools)return;
  let b=document.getElementById('raiLessonHeaderButton');
  if(!b){
   b=document.createElement('button');b.type='button';b.id='raiLessonHeaderButton';b.className='tl-mini-action';b.setAttribute('aria-label','Abrir Aulas da Raí');b.innerHTML='🎓 <span>Aulas</span><i class="rai-lesson-header-pr">PR</i>';
   b.addEventListener('click',()=>document.getElementById('raiLessonDock')?.click());
   const perf=document.getElementById('performanceApp'),about=document.getElementById('aboutApp');
   if(perf)tools.insertBefore(b,perf);else if(about)tools.insertBefore(b,about);else tools.appendChild(b);
  }
 }
 const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensure()})};
 ensure();setTimeout(ensure,180);setTimeout(ensure,520);
 const mo=new MutationObserver(run);mo.observe(document.documentElement,{childList:true,subtree:true});
 addEventListener('pageshow',ensure);addEventListener('orientationchange',()=>setTimeout(ensure,120));
 window.__raiEnsureAulasEntry=ensure;
})();