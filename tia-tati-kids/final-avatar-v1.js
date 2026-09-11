(()=>{
  'use strict';
  const SRC='assets/completion-avatar.webp?v=completion-v1';
  function applyCompletionAvatar(){
    document.querySelectorAll('#screen-done .done > img').forEach(img=>{
      if((img.getAttribute('src')||'')!==SRC) img.setAttribute('src',SRC);
      img.setAttribute('alt','Tia Tati comemorando a conquista');
      img.setAttribute('decoding','async');
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyCompletionAvatar,{once:true});
  }else{
    applyCompletionAvatar();
  }
  window.addEventListener('pageshow',applyCompletionAvatar);
})();