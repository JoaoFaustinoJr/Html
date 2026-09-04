(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;

  const STORE='tangram_v10_experience';
  const defaults={sound:true,haptic:true};
  let prefs={...defaults};
  try{prefs={...defaults,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(e){}
  const savePrefs=()=>{try{localStorage.setItem(STORE,JSON.stringify(prefs))}catch(e){}};

  let audioCtx=null;
  const ensureAudio=()=>{
    if(!prefs.sound)return null;
    try{
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return null;
      if(!audioCtx)audioCtx=new AC();
      if(audioCtx.state==='suspended')audioCtx.resume().catch(()=>{});
      return audioCtx;
    }catch(e){return null}
  };
  const tone=(freq,duration=0.06,volume=0.035,type='sine',delay=0)=>{
    const ctx=ensureAudio(); if(!ctx)return;
    try{
      const t=ctx.currentTime+delay;
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.type=type; osc.frequency.setValueAtTime(freq,t);
      gain.gain.setValueAtTime(0.0001,t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002,volume),t+0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001,t+duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t+duration+0.02);
    }catch(e){}
  };
  const sweep=(from,to,duration=0.09,volume=0.03)=>{
    const ctx=ensureAudio(); if(!ctx)return;
    try{
      const t=ctx.currentTime;
      const osc=ctx.createOscillator(); const gain=ctx.createGain();
      osc.type='sine'; osc.frequency.setValueAtTime(from,t); osc.frequency.exponentialRampToValueAtTime(to,t+duration);
      gain.gain.setValueAtTime(0.0001,t); gain.gain.exponentialRampToValueAtTime(volume,t+0.008); gain.gain.exponentialRampToValueAtTime(0.0001,t+duration);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(t); osc.stop(t+duration+0.02);
    }catch(e){}
  };
  const sfx={
    tap:()=>tone(330,0.045,0.024,'sine'),
    drop:()=>{tone(245,0.045,0.024,'triangle');tone(330,0.04,0.016,'sine',0.025)},
    rotate:()=>sweep(380,560,0.075,0.028),
    hint:()=>{tone(523.25,0.07,0.025,'sine');tone(659.25,0.08,0.025,'sine',0.075)},
    check:()=>{tone(392,0.05,0.022,'triangle');tone(493.88,0.05,0.02,'triangle',0.045)},
    warn:()=>{tone(220,0.09,0.018,'triangle');tone(196,0.09,0.014,'triangle',0.07)},
    success:()=>{[523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,0.13,0.034,'sine',i*0.085))},
    level:()=>{tone(440,0.045,0.018,'sine');tone(587.33,0.055,0.019,'sine',0.04)}
  };
  const haptic=(pattern=8)=>{if(prefs.haptic&&navigator.vibrate){try{navigator.vibrate(pattern)}catch(e){}}};

  const toast=(msg)=>{
    let el=document.getElementById('tlV10Toast');
    if(!el){el=document.createElement('div');el.id='tlV10Toast';el.className='tl-v10-toast';document.body.appendChild(el)}
    el.textContent=msg; el.classList.add('show'); clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('show'),1500);
  };

  const focusButtons=[document.getElementById('focusZoom'),document.getElementById('mFull')].filter(Boolean);
  if(focusButtons.length){
    const back=document.createElement('button'); back.type='button'; back.className='tl-focus-back'; back.setAttribute('aria-label','Voltar ao aplicativo'); back.innerHTML='← <span>Voltar</span>'; root.appendChild(back);
    let savedY=0;
    const update=()=>{const on=root.classList.contains('tl-focus');const a=document.getElementById('focusZoom');const b=document.getElementById('mFull');if(a)a.textContent=on?'← Voltar ao app':'🔍 Ampliar área de jogo';if(b)b.innerHTML=on?'←<span>Voltar</span>':'🔍<span>Ampliar</span>'};
    const enter=()=>{if(root.classList.contains('tl-focus'))return;savedY=window.scrollY||0;root.classList.add('tl-focus');document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';update()};
    const exit=()=>{if(!root.classList.contains('tl-focus'))return;root.classList.remove('tl-focus');document.documentElement.style.overflow='';document.body.style.overflow='';update();requestAnimationFrame(()=>window.scrollTo(0,savedY))};
    const toggle=()=>root.classList.contains('tl-focus')?exit():enter(); focusButtons.forEach(b=>b.addEventListener('click',toggle)); back.addEventListener('click',exit); document.addEventListener('keydown',e=>{if(e.key==='Escape')exit()}); update();
  }

  const rai='../tangram-prof-junior/rai-chalk.webp?v=10a';
  const aboutBtn=document.getElementById('aboutApp');
  const expBtn=document.getElementById('experienceApp');
  const installBtn=document.getElementById('installApp');
  const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  const isAndroid=/Android/i.test(navigator.userAgent);
  let deferredPrompt=null, aboutInstall=null, installHelp=null;

  const makeOverlay=(cls,html)=>{const overlay=document.createElement('div');overlay.className='tl-about-overlay '+cls;overlay.innerHTML=html;document.body.appendChild(overlay);return overlay};

  if(aboutBtn){
    const overlay=makeOverlay('tl-about-main',`<div class="tl-about-card" role="dialog" aria-modal="true" aria-labelledby="aboutTitle"><div class="tl-about-top"><img src="${rai}" alt="R.A.I."><div><div class="tl-about-title" id="aboutTitle">Tangram Educativo</div><div class="tl-about-sub">Prof. João Faustino Junior</div></div><button class="tl-about-close" type="button" aria-label="Fechar">×</button></div><div class="tl-about-body"><p><b>Prof. João Faustino Junior</b> é Farmacêutico e Bioquímico por formação e educador por vocação. Sua formação inicial em <b>Farmácia e Bioquímica foi realizada na Universidade Estadual de Ponta Grossa (UEPG)</b>. Depois de mais de duas décadas de atuação em análises clínicas, aproximou sua experiência científica da sala de aula, onde ensina <b>Química, Programação e Robótica</b> e desenvolve projetos de educação tecnológica e cultura maker.</p><p>Possui <b>Formação Pedagógica com Habilitação em Química pela UTFPR</b> e especializações em <b>Tecnologias Digitais e Inovação na Educação</b> e <b>Metodologias Ativas e Tecnologias Educacionais</b>.</p><p>Sua trajetória inclui também <b>experiência pedagógica internacional na University of Texas Rio Grande Valley (UTRGV), no Texas</b>, com vivência em atividades de <b>Human Genetics</b> e contato com metodologias de ensino como <b>Problem-Based Learning (PBL)</b> e <b>sala de aula invertida</b>.</p><p>Entre seus projetos estão <b>RunnBot – Uma Aventura STEAM</b>, <b>LoRa – AgroAlerta</b> e <b>R.A.I. – Robô Assistente Interativo</b>, entre outros. O RunnBot também alcançou a <b>segunda fase do Prêmio LED – Luz na Educação</b>, iniciativa da Globo voltada à valorização de projetos transformadores na educação.</p><p>Mais do que utilizar tecnologia em sala de aula, seu trabalho busca transformá-la em ferramenta de curiosidade, autoria, criatividade e aprendizagem significativa.</p><hr><p><b>Sobre o projeto.</b> O Tangram Educativo foi concebido para desenvolver raciocínio lógico, percepção espacial, estratégia e conceitos de geometria por meio de desafios interativos.</p><p class="tl-install-help" id="installHelp"><b>Instalar no celular:</b> toque em “Instalar aplicativo”. Se o navegador não abrir a janela automaticamente, use o menu ⋮ do Chrome → “Instalar app” ou “Adicionar à tela inicial”.</p><div class="tl-about-actions"><button type="button" class="tl-about-btn primary" id="aboutInstall">⬇ Instalar aplicativo</button><button type="button" class="tl-about-btn" id="aboutClose">Fechar</button></div><p class="tl-signature">Desenvolvido por Prof. João Faustino Junior • Jaboti–PR</p></div></div>`);
    const close=()=>overlay.classList.remove('show'); aboutBtn.addEventListener('click',()=>overlay.classList.add('show')); overlay.querySelector('.tl-about-close').addEventListener('click',close); overlay.querySelector('#aboutClose').addEventListener('click',close); overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
    installHelp=overlay.querySelector('#installHelp'); aboutInstall=overlay.querySelector('#aboutInstall');
    const showHelp=msg=>{overlay.classList.add('show');if(installHelp)installHelp.innerHTML=msg;if(installHelp)installHelp.scrollIntoView({behavior:'smooth',block:'center'})};
    const doInstall=async()=>{
      if(isStandalone()){if(aboutInstall){aboutInstall.textContent='✓ Aplicativo instalado';aboutInstall.disabled=true}showHelp('<b>✓ O Tangram Educativo já está instalado neste aparelho.</b>');return}
      if(deferredPrompt){const ev=deferredPrompt;deferredPrompt=null;try{await ev.prompt();const choice=await ev.userChoice;if(choice&&choice.outcome==='accepted')showHelp('<b>✓ Instalação iniciada.</b> O Tangram Educativo será adicionado aos seus aplicativos.');else showHelp('<b>A instalação foi cancelada.</b> Você pode tentar novamente quando quiser.')}catch(e){showHelp('<b>O Chrome não conseguiu abrir a instalação automática.</b> Use o menu <b>⋮ → Instalar app</b> ou <b>Adicionar à tela inicial</b>.')}if(installBtn)installBtn.style.display='none';return}
      showHelp(isAndroid?'<b>A instalação automática ainda não foi liberada pelo Chrome.</b> Use o menu <b>⋮ → Instalar app</b> ou <b>Adicionar à tela inicial</b>.':'<b>Para instalar:</b> use “Adicionar à tela inicial”. No iPhone: Safari → Compartilhar → <b>Adicionar à Tela de Início</b>.');
    };
    if(installBtn)installBtn.addEventListener('click',doInstall); aboutInstall.addEventListener('click',doInstall);
    if(isStandalone()){aboutInstall.textContent='✓ Aplicativo instalado';aboutInstall.disabled=true;if(installBtn)installBtn.style.display='none'}else if(isAndroid&&installBtn){installBtn.style.display='inline-flex'}
  }

  if(expBtn){
    const overlay=makeOverlay('tl-exp-overlay',`<div class="tl-exp-card" role="dialog" aria-modal="true" aria-labelledby="expTitle"><div class="tl-exp-head"><div><div class="tl-about-title" id="expTitle">🎧 Experiência v10</div><div class="tl-about-sub">Feedback discreto, sem música contínua</div></div><button class="tl-about-close" type="button" aria-label="Fechar">×</button></div><div class="tl-exp-body"><p>Os efeitos foram pensados para reforçar ações do jogo sem competir com a concentração. Você pode desligá-los a qualquer momento.</p><button class="tl-pref-row" id="soundToggle" type="button"><span><b>🔊 Efeitos sonoros</b><small>seleção, rotação, dicas e conclusão</small></span><span class="tl-pref-state"></span></button><button class="tl-pref-row" id="hapticToggle" type="button"><span><b>📳 Vibração tátil</b><small>toques curtos em ações importantes</small></span><span class="tl-pref-state"></span></button><div class="tl-exp-actions"><button class="tl-about-btn primary" id="testSound" type="button">▶ Testar experiência</button><button class="tl-about-btn" id="resetExperience" type="button">Restaurar padrão</button></div><p class="tl-exp-note">As preferências ficam salvas somente neste aparelho.</p></div></div>`);
    const close=()=>overlay.classList.remove('show');
    const soundToggle=overlay.querySelector('#soundToggle'), hapticToggle=overlay.querySelector('#hapticToggle');
    const renderPrefs=()=>{soundToggle.querySelector('.tl-pref-state').textContent=prefs.sound?'Ligado':'Desligado';hapticToggle.querySelector('.tl-pref-state').textContent=prefs.haptic?'Ligado':'Desligado';soundToggle.classList.toggle('on',prefs.sound);hapticToggle.classList.toggle('on',prefs.haptic);expBtn.innerHTML=prefs.sound?'🔊 <span>Som</span>':'🔇 <span>Som</span>'};
    expBtn.addEventListener('click',()=>{overlay.classList.add('show');renderPrefs();sfx.tap()}); overlay.querySelector('.tl-about-close').addEventListener('click',close); overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
    soundToggle.addEventListener('click',()=>{prefs.sound=!prefs.sound;savePrefs();renderPrefs();if(prefs.sound){sfx.level();toast('Som ativado')}else toast('Som desativado')});
    hapticToggle.addEventListener('click',()=>{prefs.haptic=!prefs.haptic;savePrefs();renderPrefs();if(prefs.haptic){haptic([12,35,12]);toast('Vibração ativada')}else toast('Vibração desativada')});
    overlay.querySelector('#testSound').addEventListener('click',()=>{sfx.tap();setTimeout(sfx.rotate,110);setTimeout(()=>{sfx.success();haptic([15,45,20])},250)});
    overlay.querySelector('#resetExperience').addEventListener('click',()=>{prefs={...defaults};savePrefs();renderPrefs();sfx.level();haptic(10);toast('Preferências restauradas')});
    renderPrefs();
  }

  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(installBtn)installBtn.style.display='inline-flex';if(aboutInstall&&!isStandalone()){aboutInstall.disabled=false;aboutInstall.textContent='⬇ Instalar aplicativo'}if(installHelp)installHelp.innerHTML='<b>Pronto para instalar.</b> Toque em “Instalar aplicativo” e confirme a janela do Chrome.'});
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;if(installBtn)installBtn.style.display='none';if(aboutInstall){aboutInstall.textContent='✓ Aplicativo instalado';aboutInstall.disabled=true}if(installHelp)installHelp.innerHTML='<b>✓ Tangram Educativo instalado com sucesso.</b>'});

  let activePointer=null;
  root.addEventListener('pointerdown',e=>{
    const shape=e.target&&e.target.closest?e.target.closest('svg polygon,svg path,svg rect'):null;
    if(shape){activePointer={x:e.clientX,y:e.clientY,moved:false};sfx.tap();haptic(5)}
  },{passive:true});
  root.addEventListener('pointermove',e=>{if(activePointer&&Math.hypot(e.clientX-activePointer.x,e.clientY-activePointer.y)>7)activePointer.moved=true},{passive:true});
  root.addEventListener('pointerup',()=>{if(activePointer&&activePointer.moved){sfx.drop();haptic(6)}activePointer=null},{passive:true});
  root.addEventListener('pointercancel',()=>{activePointer=null},{passive:true});

  root.addEventListener('click',e=>{
    const b=e.target&&e.target.closest?e.target.closest('button'):null; if(!b)return;
    if([aboutBtn,expBtn,installBtn].includes(b)||b.closest('.tl-about-overlay'))return;
    b.classList.add('tl-v10-pop');setTimeout(()=>b.classList.remove('tl-v10-pop'),180);
    const label=((b.getAttribute('aria-label')||'')+' '+(b.textContent||'')+' '+(b.id||'')).toLowerCase();
    if(/girar|rotacion|45|↺|↻|rotate/.test(label)){sfx.rotate();haptic(8)}
    else if(/amostra|dica|hint|sample/.test(label)){sfx.hint();haptic([8,25,8])}
    else if(/verificar|check/.test(label)){sfx.check();haptic(10)}
    else if(/nível|nivel|miss[aã]o|level/.test(label)){sfx.level()}
  });

  let feedbackTimer=null,lastFeedback='',lastSuccessAt=0;
  const inspectFeedback=()=>{
    clearTimeout(feedbackTimer); feedbackTimer=setTimeout(()=>{
      const msgEl=root.querySelector('#msg');
      const msgText=(msgEl?.textContent||'').replace(/\s+/g,' ').trim();
      if(!msgText||msgText===lastFeedback)return; lastFeedback=msgText;
      const t=msgText.toLowerCase();
      if(/miss[aã]o conclu[ií]da/.test(t)){
        const now=Date.now();
        if(now-lastSuccessAt>1600){
          lastSuccessAt=now;
          haptic([18,40,25,40,35]);
          const stage=root.querySelector('.tl-stage');
          if(stage){stage.classList.add('tl-v10-success');setTimeout(()=>stage.classList.remove('tl-v10-success'),1000)}
          toast('✨ Desafio concluído!');
        }
      }else if(/sobrepos|fora da|lacuna|tente novamente|ainda n[aã]o/.test(t)){sfx.warn();haptic(14)}
    },60);
  };
  const msgWatch=root.querySelector('#msg');
  if(msgWatch)new MutationObserver(inspectFeedback).observe(msgWatch,{subtree:true,childList:true,characterData:true});
  const statusWatch=root.querySelector('#status');
  const normalizeReadyStatus=()=>{
    if(!statusWatch)return;
    const done=/miss[aã]o conclu[ií]da/i.test(root.querySelector('#msg')?.textContent||'');
    if(!done&&/miss[aã]o completa/i.test(statusWatch.textContent||''))statusWatch.textContent='✅ Encaixe pronto — toque em Verificar';
  };
  if(statusWatch)new MutationObserver(normalizeReadyStatus).observe(statusWatch,{subtree:true,childList:true,characterData:true});
  normalizeReadyStatus();

  document.addEventListener('pointerdown',ensureAudio,{once:true,passive:true});
  if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>reg.update()).catch(err=>console.warn('SW',err))}
})();
