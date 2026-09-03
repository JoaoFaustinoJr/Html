(()=>{
  const root=document.getElementById('tangram-levels');
  const btn=document.getElementById('comfortApp');
  if(!root||!btn)return;

  const STORE='tangram_v11_comfort';
  const defaults={relax:false,largeText:false,bigControls:false,highContrast:false,reducedMotion:false};
  let prefs={...defaults};
  try{prefs={...defaults,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(e){}
  const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(prefs))}catch(e){}};

  const markPressure=()=>{
    const ids=['timer','xp','rank','levelStars','attempts','bestTime'];
    ids.forEach(id=>{
      const el=document.getElementById(id); if(!el)return;
      const box=el.closest('.tl-chip,.tl-score'); if(box)box.classList.add('tl-v11-pressure');
    });
  };
  markPressure();

  const apply=()=>{
    root.classList.toggle('tl-v11-relax',prefs.relax);
    root.classList.toggle('tl-v11-large-text',prefs.largeText);
    root.classList.toggle('tl-v11-big-controls',prefs.bigControls);
    root.classList.toggle('tl-v11-high-contrast',prefs.highContrast);
    root.classList.toggle('tl-v11-reduced-motion',prefs.reducedMotion);
    btn.innerHTML=prefs.relax?'☕ <span>Relaxar</span>':'♿ <span>Conforto</span>';
  };

  const overlay=document.createElement('div');
  overlay.className='tl-v11-overlay';
  overlay.innerHTML=`<div class="tl-v11-card" role="dialog" aria-modal="true" aria-labelledby="v11Title">
    <div class="tl-v11-head"><div><div class="tl-v11-title" id="v11Title">♿ Conforto & Acessibilidade</div><div class="tl-v11-sub">A mesma lógica, no seu ritmo</div></div><button type="button" class="tl-v11-close" aria-label="Fechar">×</button></div>
    <div class="tl-v11-body">
      <p>Estas opções alteram apenas a apresentação. As peças, as missões e a validação geométrica continuam exatamente as mesmas.</p>
      <button type="button" class="tl-v11-row" data-key="relax"><span><b>☕ Modo Relaxar</b><small>oculta cronômetro, XP, ranking, tentativas e melhor tempo durante o jogo</small></span><span class="tl-v11-state"></span></button>
      <button type="button" class="tl-v11-row" data-key="largeText"><span><b>🔎 Texto maior</b><small>aumenta textos e informações de apoio</small></span><span class="tl-v11-state"></span></button>
      <button type="button" class="tl-v11-row" data-key="bigControls"><span><b>👆 Controles maiores</b><small>amplia botões e áreas de toque</small></span><span class="tl-v11-state"></span></button>
      <button type="button" class="tl-v11-row" data-key="highContrast"><span><b>◐ Alto contraste</b><small>reforça bordas, textos e diferenciação visual</small></span><span class="tl-v11-state"></span></button>
      <button type="button" class="tl-v11-row" data-key="reducedMotion"><span><b>➖ Movimento reduzido</b><small>reduz animações e transições não essenciais</small></span><span class="tl-v11-state"></span></button>
      <div class="tl-v11-actions"><button type="button" class="tl-v11-primary" id="v11RelaxPreset">☕ Ativar modo Relaxar</button><button type="button" id="v11Reset">Restaurar padrão</button></div>
      <p class="tl-v11-note">As preferências ficam salvas neste aparelho. O Modo Relaxar não altera a geometria nem libera fases; ele apenas remove elementos de pressão visual.</p>
    </div>
  </div>`;
  document.body.appendChild(overlay);

  const rows=[...overlay.querySelectorAll('.tl-v11-row')];
  const render=()=>{
    rows.forEach(row=>{
      const key=row.dataset.key;
      const on=!!prefs[key];
      row.classList.toggle('on',on);
      row.querySelector('.tl-v11-state').textContent=on?'Ligado':'Desligado';
      row.setAttribute('aria-pressed',String(on));
    });
    const preset=overlay.querySelector('#v11RelaxPreset');
    preset.textContent=prefs.relax?'☕ Desativar modo Relaxar':'☕ Ativar modo Relaxar';
    apply();
  };

  const close=()=>overlay.classList.remove('show');
  btn.addEventListener('click',()=>{markPressure();render();overlay.classList.add('show')});
  overlay.querySelector('.tl-v11-close').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});

  rows.forEach(row=>row.addEventListener('click',()=>{
    const key=row.dataset.key;
    prefs[key]=!prefs[key];
    save(); render();
  }));

  overlay.querySelector('#v11RelaxPreset').addEventListener('click',()=>{
    prefs.relax=!prefs.relax;
    if(prefs.relax){prefs.largeText=true;prefs.bigControls=true;}
    save(); render();
  });

  overlay.querySelector('#v11Reset').addEventListener('click',()=>{
    prefs={...defaults}; save(); render();
  });

  const observer=new MutationObserver(()=>{markPressure()});
  const stats=root.querySelector('.tl-stats');
  const side=root.querySelector('.tl-side');
  if(stats)observer.observe(stats,{childList:true,subtree:true});
  if(side)observer.observe(side,{childList:true,subtree:true});

  render();
})();
