
(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  function compact(){
    if(!document.body.classList.contains('rai-gamer-running'))return;
    const stage=root.querySelector('.tl-stage');
    const hud=document.querySelector('.rai-gamer-hud');
    if(!stage||!hud)return;
    if(hud.parentElement!==stage)stage.prepend(hud);
    stage.style.setProperty('position','relative','important');
    hud.style.setProperty('position','absolute','important');
    hud.style.setProperty('top','max(8px,env(safe-area-inset-top))','important');
    hud.style.setProperty('right','8px','important');
    hud.style.setProperty('left','auto','important');
    hud.style.setProperty('bottom','auto','important');
    hud.style.setProperty('transform','none','important');
    hud.style.setProperty('width','auto','important');
    hud.style.setProperty('height','auto','important');
    hud.style.setProperty('flex','none','important');
    hud.style.setProperty('padding','6px 7px 6px 10px','important');
    hud.style.setProperty('border-radius','13px','important');
    const label=hud.querySelector('.rai-gamer-label'); if(label)label.style.setProperty('display','none','important');
    const best=hud.querySelector('.rai-gamer-best'); if(best)best.style.setProperty('display','none','important');
    const status=hud.querySelector('.rai-gamer-status'); if(status)status.style.setProperty('display','none','important');
    const time=hud.querySelector('.rai-gamer-time'); if(time)time.style.setProperty('font-size','20px','important');
    const full=root.querySelector('#mFull'); if(full)full.style.setProperty('display','none','important');
    const zoom=root.querySelector('#focusZoom'); if(zoom)zoom.style.setProperty('display','none','important');
    const back=root.querySelector('.tl-focus-back'); if(back)back.style.setProperty('display','none','important');
  }
  const mo=new MutationObserver(()=>setTimeout(compact,0));
  mo.observe(document.body,{attributes:true,attributeFilter:['class']});
  mo.observe(root,{attributes:true,attributeFilter:['class']});
  document.addEventListener('click',e=>{
    if(e.target.closest?.('#raiGamerButton')){setTimeout(compact,0);setTimeout(compact,140);setTimeout(compact,550)}
  },true);
  setTimeout(compact,0);setTimeout(compact,350);
})();
