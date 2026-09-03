(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;

  const buttons=[document.getElementById('focusZoom'),document.getElementById('mFull')].filter(Boolean);
  if(buttons.length){
    const back=document.createElement('button');
    back.type='button';
    back.className='tl-focus-back';
    back.setAttribute('aria-label','Voltar ao aplicativo');
    back.innerHTML='← <span>Voltar</span>';
    root.appendChild(back);

    let savedY=0;
    const update=()=>{
      const on=root.classList.contains('tl-focus');
      const a=document.getElementById('focusZoom');
      const b=document.getElementById('mFull');
      if(a)a.textContent=on?'← Voltar ao app':'🔍 Ampliar área de jogo';
      if(b)b.innerHTML=on?'←<span>Voltar</span>':'🔍<span>Ampliar</span>';
    };
    const enter=()=>{
      if(root.classList.contains('tl-focus'))return;
      savedY=window.scrollY||0;
      root.classList.add('tl-focus');
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';
      update();
    };
    const exit=()=>{
      if(!root.classList.contains('tl-focus'))return;
      root.classList.remove('tl-focus');
      document.documentElement.style.overflow='';
      document.body.style.overflow='';
      update();
      requestAnimationFrame(()=>window.scrollTo(0,savedY));
    };
    const toggle=()=>root.classList.contains('tl-focus')?exit():enter();
    buttons.forEach(b=>b.addEventListener('click',toggle));
    back.addEventListener('click',exit);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')exit()});
    update();
  }

  const rai='../tangram-prof-junior/rai-chalk.webp?v=9c';
  const aboutBtn=document.getElementById('aboutApp');
  const installBtn=document.getElementById('installApp');
  let deferredPrompt=null;

  if(aboutBtn){
    const overlay=document.createElement('div');
    overlay.className='tl-about-overlay';
    overlay.innerHTML=`
      <div class="tl-about-card" role="dialog" aria-modal="true" aria-labelledby="aboutTitle">
        <div class="tl-about-top">
          <img src="${rai}" alt="R.A.I.">
          <div><div class="tl-about-title" id="aboutTitle">Tangram Educativo</div><div class="tl-about-sub">Prof. João Faustino Junior</div></div>
          <button class="tl-about-close" type="button" aria-label="Fechar">×</button>
        </div>
        <p><b>Prof. João Faustino Junior</b> é Farmacêutico e Bioquímico por formação e educador por vocação. Depois de mais de duas décadas de atuação em análises clínicas, aproximou sua experiência científica da sala de aula, onde ensina <b>Química, Programação e Robótica</b> e desenvolve projetos de educação tecnológica e cultura maker.</p>
        <p>Possui <b>Formação Pedagógica com Habilitação em Química pela UTFPR</b> e especializações em <b>Tecnologias Digitais e Inovação na Educação</b> e <b>Metodologias Ativas e Tecnologias Educacionais</b>.</p>
        <p>Entre seus projetos estão <b>RunnBot – Uma Aventura STEAM</b>, <b>LoRa – AgroAlerta</b> e <b>R.A.I. – Robô Assistente Interativo</b>, entre outros. Seus trabalhos já foram reconhecidos e premiados em iniciativas como <b>Agrinho</b> e <b>GeniusCon</b>, além da classificação do RunnBot no <b>Prêmio LED – Luz na Educação, da Globo</b>.</p>
        <p>Mais do que utilizar tecnologia em sala de aula, seu trabalho busca transformá-la em ferramenta de curiosidade, autoria, criatividade e aprendizagem significativa.</p>
        <hr>
        <p><b>Sobre o projeto.</b> O Tangram Educativo foi concebido para desenvolver raciocínio lógico, percepção espacial, estratégia e conceitos de geometria por meio de desafios interativos.</p>
        <p class="tl-install-help" id="installHelp"><b>Instalar no celular:</b> no Android, use o botão “Instalar” quando disponível ou o menu do navegador → “Adicionar à tela inicial”. No iPhone, use Safari → Compartilhar → “Adicionar à Tela de Início”.</p>
        <div class="tl-about-actions"><button type="button" class="tl-about-btn primary" id="aboutInstall">⬇ Instalar aplicativo</button><button type="button" class="tl-about-btn" id="aboutClose">Fechar</button></div>
        <p class="tl-signature">Desenvolvido por Prof. João Faustino Junior • Jaboti–PR</p>
      </div>`;
    document.body.appendChild(overlay);

    const close=()=>overlay.classList.remove('show');
    aboutBtn.addEventListener('click',()=>overlay.classList.add('show'));
    overlay.querySelector('.tl-about-close').addEventListener('click',close);
    overlay.querySelector('#aboutClose').addEventListener('click',close);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close()});

    const installHelp=overlay.querySelector('#installHelp');
    const aboutInstall=overlay.querySelector('#aboutInstall');
    const doInstall=async()=>{
      if(deferredPrompt){
        deferredPrompt.prompt();
        try{await deferredPrompt.userChoice}catch(e){}
        deferredPrompt=null;
        if(installBtn)installBtn.style.display='none';
      }else{
        overlay.classList.add('show');
        installHelp.scrollIntoView({behavior:'smooth',block:'center'});
      }
    };
    if(installBtn)installBtn.addEventListener('click',doInstall);
    aboutInstall.addEventListener('click',doInstall);
  }

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    if(installBtn)installBtn.style.display='inline-flex';
  });
  window.addEventListener('appinstalled',()=>{
    deferredPrompt=null;
    if(installBtn)installBtn.style.display='none';
  });

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js',{scope:'./'}).catch(err=>console.warn('SW',err));
  }
})();
