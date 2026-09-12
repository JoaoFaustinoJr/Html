(()=>{
  const ua=navigator.userAgent||'';
  const isIOS=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(!isIOS)return;
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const isSafari=/Safari/i.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram/i.test(ua);
  const APP_URL='https://joaofaustinojr.github.io/Html/tangram-prof-junior-v12/';

  function meta(name,content){let m=document.querySelector('meta[name="'+name+'"]');if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}m.content=content}
  meta('apple-mobile-web-app-capable','yes');
  meta('apple-mobile-web-app-status-bar-style','black-translucent');
  meta('apple-mobile-web-app-title','Tangram Educativo');

  let overlay=document.getElementById('raiIOSInstall');
  if(!overlay){
    overlay=document.createElement('div');overlay.id='raiIOSInstall';overlay.className='rai-ios-install';
    overlay.innerHTML='<div class="rai-ios-card" role="dialog" aria-modal="true" aria-labelledby="raiIOSTitle"><div class="rai-ios-head"><div class="rai-ios-logo">🍎</div><div><h3 id="raiIOSTitle">Instalar no iPhone</h3><small>Tangram Educativo como aplicativo</small></div><button type="button" class="rai-ios-close" aria-label="Fechar">×</button></div><div class="rai-ios-body"><div id="raiIOSBrowserNote"></div><div class="rai-ios-steps" id="raiIOSSteps"></div><div class="rai-ios-tip"><b>Depois de instalar:</b> o Tangram abre em tela própria, como um app, e o conteúdo principal fica disponível offline após o primeiro carregamento.</div><div class="rai-ios-actions"><button type="button" id="raiIOSCopy">Copiar endereço</button><button type="button" class="primary" id="raiIOSDone">Entendi</button></div><div class="rai-ios-copied" id="raiIOSCopied">✓ Endereço copiado</div></div></div>';
    document.body.appendChild(overlay);
  }
  const note=overlay.querySelector('#raiIOSBrowserNote'),steps=overlay.querySelector('#raiIOSSteps'),copied=overlay.querySelector('#raiIOSCopied');
  function render(){
    if(isSafari){
      note.innerHTML='<div class="rai-ios-ok">✓ Você está no Safari. Faltam apenas três passos.</div>';
      steps.innerHTML='<div class="rai-ios-step"><span>1</span><div><b>Toque em Compartilhar</b><small>Use o ícone de compartilhar do Safari: quadrado com seta para cima.</small></div><i class="rai-ios-share">⬆</i></div><div class="rai-ios-step"><span>2</span><div><b>Adicionar à Tela de Início</b><small>Role o menu de compartilhamento e escolha essa opção.</small></div></div><div class="rai-ios-step"><span>3</span><div><b>Adicionar</b><small>Se aparecer “Abrir como App da Web”, deixe ativado. Depois confirme em Adicionar.</small></div></div>';
    }else{
      note.innerHTML='<div class="rai-ios-warn"><b>Primeiro, abra no Safari.</b><small>Links abertos dentro do WhatsApp, Instagram, Gmail ou outro navegador interno podem esconder a opção de instalação.</small></div>';
      steps.innerHTML='<div class="rai-ios-step"><span>1</span><div><b>Abrir no Safari</b><small>No menu deste navegador, escolha “Abrir no Safari”. Se a opção não aparecer, copie o endereço abaixo e cole no Safari.</small></div></div><div class="rai-ios-step"><span>2</span><div><b>Toque em Compartilhar</b><small>No Safari, use o quadrado com seta para cima.</small></div><i class="rai-ios-share">⬆</i></div><div class="rai-ios-step"><span>3</span><div><b>Adicionar à Tela de Início</b><small>Escolha a opção no menu de compartilhamento.</small></div></div><div class="rai-ios-step"><span>4</span><div><b>Confirmar em Adicionar</b><small>Se “Abrir como App da Web” aparecer, deixe ativado.</small></div></div>';
    }
  }
  const close=()=>overlay.classList.remove('show');
  function openGuide(e){
    if(e){e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation()}
    if(standalone())return;
    render();overlay.classList.add('show');
  }
  overlay.querySelector('.rai-ios-close').addEventListener('click',close);
  overlay.querySelector('#raiIOSDone').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  overlay.querySelector('#raiIOSCopy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(APP_URL)}catch(e){const ta=document.createElement('textarea');ta.value=APP_URL;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(err){}ta.remove()}
    copied.classList.add('show');clearTimeout(copied._t);copied._t=setTimeout(()=>copied.classList.remove('show'),1800)
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

  function wire(){
    ['installApp','aboutInstall'].forEach(id=>{
      const b=document.getElementById(id);if(!b||b.dataset.raiIosInstall==='1')return;
      b.dataset.raiIosInstall='1';
      if(id==='installApp')b.title='Instalar o Tangram no iPhone';
      if(id==='aboutInstall')b.textContent='＋ Instalar no iPhone';
      b.addEventListener('click',openGuide,true);
    });
    if(standalone()){
      const a=document.getElementById('installApp');if(a)a.style.display='none';
      const b=document.getElementById('aboutInstall');if(b){b.textContent='✓ Aplicativo instalado';b.disabled=true}
    }
  }
  wire();setTimeout(wire,220);setTimeout(wire,700);
  const mo=new MutationObserver(()=>requestAnimationFrame(wire));mo.observe(document.body,{childList:true,subtree:true});
  addEventListener('pageshow',wire);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')wire()});
  window.__raiIOSInstall={open:openGuide,wire,isSafari,standalone};
})();