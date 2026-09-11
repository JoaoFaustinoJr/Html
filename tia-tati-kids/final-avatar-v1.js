(()=>{
  'use strict';
  // V2: o antigo completion-avatar.webp está corrompido em alguns navegadores.
  // Usa o card success.webp, já validado, e reaplica quando a tela final é exibida.
  const SRC='assets/success.webp?v=completion-v2';
  const FALLBACK='assets/celebrate.webp?v=completion-v2';

  function applyCompletionAvatar(){
    const screen=document.querySelector('#screen-done');
    if(!screen)return;
    const img=screen.querySelector('.done > img');
    if(!img)return;

    img.style.setProperty('display','block','important');
    img.style.setProperty('visibility','visible','important');
    img.style.setProperty('opacity','1','important');
    img.style.setProperty('object-fit','cover','important');
    img.style.setProperty('object-position','center','important');
    img.style.setProperty('max-width','100%','important');
    img.setAttribute('alt','Tia Tati comemorando a conquista');
    img.setAttribute('loading','eager');
    img.setAttribute('decoding','sync');

    if((img.getAttribute('src')||'')!==SRC) img.setAttribute('src',SRC);
    img.onerror=()=>{
      img.onerror=null;
      img.setAttribute('src',FALLBACK);
    };
  }

  function armObserver(){
    const screen=document.querySelector('#screen-done');
    if(!screen)return;
    const run=()=>{
      if(screen.classList.contains('active')){
        [0,80,250,700].forEach(ms=>setTimeout(applyCompletionAvatar,ms));
      }
    };
    new MutationObserver(run).observe(screen,{attributes:true,attributeFilter:['class']});
    run();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>{applyCompletionAvatar();armObserver();},{once:true});
  }else{
    applyCompletionAvatar();
    armObserver();
  }
  window.addEventListener('pageshow',applyCompletionAvatar);
})();