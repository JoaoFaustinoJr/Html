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

  const rai='../tangram-prof-junior/rai-chalk.webp?v=9f';
  const aboutBtn=document.getElementById('aboutApp');
  const installBtn=document.getElementById('installApp');
  const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  const isAndroid=/Android/i.test(navigator.userAgent);
  let deferredPrompt=null;
  let aboutInstall=null;
  let installHelp=null;

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
        <div class="tl-about-body">
          <p><b>Prof. João Faustino Junior</b> é Farmacêutico e Bioquímico por formação e educador por vocação. Sua formação inicial em <b>Farmácia e Bioquímica foi realizada na Universidade Estadual de Ponta Grossa (UEPG)</b>. Depois de mais de duas décadas de atuação em análises clínicas, aproximou sua experiência científica da sala de aula, onde ensina <b>Química, Programação e Robótica</b> e desenvolve projetos de educação tecnológica e cultura maker.</p>
          <p>Possui <b>Formação Pedagógica com Habilitação em Química pela UTFPR</b> e especializações em <b>Tecnologias Digitais e Inovação na Educação</b> e <b>Metodologias Ativas e Tecnologias Educacionais</b>.</p>
          <p>Sua trajetória inclui também <b>experiência pedagógica internacional na University of Texas Rio Grande Valley (UTRGV), no Texas</b>, com vivência em atividades de <b>Human Genetics</b> e contato com metodologias de ensino como <b>Problem-Based Learning (PBL)</b> e <b>sala de aula invertida</b>.</p>
          <p>Entre seus projetos estão <b>RunnBot – Uma Aventura STEAM</b>, <b>LoRa – AgroAlerta</b> e <b>R.A.I. – Robô Assistente Interativo</b>, entre outros. Seus trabalhos já foram premiados em iniciativas como <b>Agrinho</b> e <b>GeniusCon</b>. O RunnBot também alcançou a <b>segunda fase do Prêmio LED – Luz na Educação</b>, iniciativa da Globo voltada à valorização de projetos transformadores na educação.</p>
          <p>Mais do que utilizar tecnologia em sala de aula, seu trabalho busca transformá-la em ferramenta de curiosidade, autoria, criatividade e aprendizagem significativa.</p>
          <hr>
          <p><b>Sobre o projeto.</b> O Tangram Educativo foi concebido para desenvolver raciocínio lógico, percepção espacial, estratégia e conceitos de geometria por meio de desafios interativos.</p>
          <p class="tl-install-help" id="installHelp"><b>Instalar no celular:</b> toque em “Instalar aplicativo”. Se o navegador não abrir a janela automaticamente, use o menu ⋮ do Chrome → “Instalar app” ou “Adicionar à tela inicial”.</p>
          <div class="tl-about-actions"><button type="button" class="tl-about-btn primary" id="aboutInstall">⬇ Instalar aplicativo</button><button type="button" class="tl-about-btn" id="aboutClose">Fechar</button></div>
          <p class="tl-signature">Desenvolvido por Prof. João Faustino Junior • Jaboti–PR</p>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const close=()=>overlay.classList.remove('show');
    aboutBtn.addEventListener('click',()=>overlay.classList.add('show'));
    overlay.querySelector('.tl-about-close').addEventListener('click',close);
    overlay.querySelector('#aboutClose').addEventListener('click',close);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close()});

    installHelp=overlay.querySelector('#installHelp');
    aboutInstall=overlay.querySelector('#aboutInstall');

    const showHelp=msg=>{
      overlay.classList.add('show');
      if(installHelp)installHelp.innerHTML=msg;
      if(installHelp)installHelp.scrollIntoView({behavior:'smooth',block:'center'});
    };

    const doInstall=async()=>{
      if(isStandalone()){
        if(aboutInstall){aboutInstall.textContent='✓ Aplicativo instalado';aboutInstall.disabled=true;}
        showHelp('<b>✓ O Tangram R.A.I. já está instalado neste aparelho.</b> Você pode abri-lo pelo ícone na tela inicial ou na lista de aplicativos.');
        return;
      }
      if(deferredPrompt){
        const promptEvent=deferredPrompt;
        deferredPrompt=null;
        try{
          await promptEvent.prompt();
          const choice=await promptEvent.userChoice;
          if(choice&&choice.outcome==='accepted'){
            showHelp('<b>✓ Instalação iniciada.</b> O Tangram R.A.I. será adicionado aos seus aplicativos.');
          }else{
            showHelp('<b>A instalação foi cancelada.</b> Toque novamente em “Instalar aplicativo” quando quiser tentar outra vez.');
          }
        }catch(e){
          showHelp('<b>O Chrome não conseguiu abrir a instalação automática.</b> Toque no menu <b>⋮</b> do Chrome e escolha <b>“Instalar app”</b> ou <b>“Adicionar à tela inicial”</b>.');
        }
        if(installBtn)installBtn.style.display='none';
        return;
      }
      showHelp(isAndroid
        ? '<b>A instalação automática ainda não foi liberada pelo Chrome.</b> Toque no menu <b>⋮</b> no canto superior direito e escolha <b>“Instalar app”</b> ou <b>“Adicionar à tela inicial”</b>. Depois de uma atualização da página, o botão automático também pode aparecer.'
        : '<b>Para instalar:</b> use o menu do navegador e escolha <b>“Adicionar à tela inicial”</b>. No iPhone: Safari → Compartilhar → <b>“Adicionar à Tela de Início”</b>.');
    };

    if(installBtn)installBtn.addEventListener('click',doInstall);
    aboutInstall.addEventListener('click',doInstall);

    if(isStandalone()){
      aboutInstall.textContent='✓ Aplicativo instalado';
      aboutInstall.disabled=true;
      if(installBtn)installBtn.style.display='none';
    }else if(isAndroid&&installBtn){
      installBtn.style.display='inline-flex';
    }
  }

  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    if(installBtn)installBtn.style.display='inline-flex';
    if(aboutInstall&&!isStandalone()){
      aboutInstall.disabled=false;
      aboutInstall.textContent='⬇ Instalar aplicativo';
    }
    if(installHelp)installHelp.innerHTML='<b>Pronto para instalar.</b> Toque em “Instalar aplicativo” e confirme a janela do Chrome.';
  });

  window.addEventListener('appinstalled',()=>{
    deferredPrompt=null;
    if(installBtn)installBtn.style.display='none';
    if(aboutInstall){aboutInstall.textContent='✓ Aplicativo instalado';aboutInstall.disabled=true;}
    if(installHelp)installHelp.innerHTML='<b>✓ Tangram R.A.I. instalado com sucesso.</b> Procure o ícone na tela inicial ou na lista de aplicativos.';
  });

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>reg.update()).catch(err=>console.warn('SW',err));
  }
})();
