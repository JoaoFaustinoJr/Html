(()=>{
  if(window.__raiTangramBonusBridge?.open&&window.__raiTangramBonusBridge?.isSampleActive)return;
  window.__raiTangramBonusBridge={
    open(i){
      try{
        if(typeof levelIndex==='undefined'||typeof reset!=='function'||typeof levels==='undefined'||!levels[i])return false;
        levelIndex=i;
        reset();
        try{if(typeof sound==='function')sound()}catch(e){}
        return true;
      }catch(e){console.warn('Abrir desafio bônus',e);return false}
    },
    isSampleActive(){try{return typeof sampleActive!=='undefined'&&!!sampleActive}catch(e){return false}},
    refresh(){
      try{if(typeof renderLevels==='function'){renderLevels();return true}}catch(e){}
      return false;
    }
  };
})();
