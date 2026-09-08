
(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;

  function repairGamerLayout(){
    if(!document.body.classList.contains('rai-gamer-running'))return;

    const stage=root.querySelector('.tl-stage');
    const hud=document.querySelector('.rai-gamer-hud');
    const board=root.querySelector('.tl-board-scroll');
    const controls=root.querySelector('.tl-mobile-controls');
    if(!stage||!hud)return;

    // Physically place the timer before the board so it consumes real layout height.
    if(hud.parentElement!==stage || stage.firstElementChild!==hud){
      stage.insertBefore(hud,stage.firstChild);
    }

    stage.style.setProperty('display','flex','important');
    stage.style.setProperty('flex-direction','column','important');
    stage.style.setProperty('height','100dvh','important');
    stage.style.setProperty('overflow','hidden','important');

    hud.style.setProperty('position','relative','important');
    hud.style.setProperty('inset','auto','important');
    hud.style.setProperty('left','auto','important');
    hud.style.setProperty('top','auto','important');
    hud.style.setProperty('transform','none','important');
    hud.style.setProperty('flex','0 0 74px','important');
    hud.style.setProperty('height','74px','important');
    hud.style.setProperty('width','100%','important');
    hud.style.setProperty('margin','0','important');
    hud.style.setProperty('border-radius','0','important');

    if(board){
      board.style.setProperty('flex','1 1 0','important');
      board.style.setProperty('min-height','0','important');
      board.style.setProperty('padding','0','important');
      board.style.setProperty('margin','0','important');
      board.style.setProperty('overflow','hidden','important');
    }
    if(controls){
      controls.style.setProperty('position','relative','important');
      controls.style.setProperty('bottom','auto','important');
      controls.style.setProperty('grid-template-columns','repeat(3,minmax(0,1fr))','important');
    }

    const full=root.querySelector('#mFull');
    if(full)full.style.setProperty('display','none','important');
    const zoom=root.querySelector('#focusZoom');
    if(zoom)zoom.style.setProperty('display','none','important');
    const back=root.querySelector('.tl-focus-back');
    if(back)back.style.setProperty('display','none','important');
  }

  const obs=new MutationObserver(repairGamerLayout);
  obs.observe(document.body,{attributes:true,attributeFilter:['class']});
  obs.observe(root,{attributes:true,attributeFilter:['class']});

  document.addEventListener('click',e=>{
    if(e.target.closest?.('#raiGamerButton')) {
      setTimeout(repairGamerLayout,0);
      setTimeout(repairGamerLayout,120);
      setTimeout(repairGamerLayout,500);
    }
  },true);

  setTimeout(repairGamerLayout,0);
  setTimeout(repairGamerLayout,300);
})();
