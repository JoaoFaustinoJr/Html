(()=>{
  if(window.__raiTangramBonusBridge?.open&&window.__raiTangramBonusBridge?.isSampleActive)return;
  window.__raiTangramBonusBridge={
    open(i){
      try{
        const root=document.getElementById('tangram-levels');
        const buttons=[...(root?.querySelectorAll('#levels button.tl-level,#levels .tl-level')||[])];
        const b=buttons[Number(i)];
        if(b){b.click();return true}
        if(typeof levelIndex!=='undefined'&&typeof reset==='function'&&typeof levels!=='undefined'&&levels[i]){levelIndex=i;reset();return true}
        return false;
      }catch(e){console.warn('Abrir desafio X1',e);return false}
    },
    isSampleActive(){try{return typeof sampleActive!=='undefined'&&!!sampleActive}catch(e){return document.documentElement.dataset.sampleUsed==='1'}},
    refresh(){try{const root=document.getElementById('tangram-levels');const buttons=[...(root?.querySelectorAll('#levels button.tl-level,#levels .tl-level')||[])];return buttons.length>0}catch(e){return false}}
  };
})();