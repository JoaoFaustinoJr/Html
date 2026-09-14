(()=>{
  if(window.__raiProvaRewardsV1?.mounted)return;
  const STORE='raiProvaParana2026V2';
  const BONUS_START=10;
  const BONUS=[
    {title:'Gato Espelhado',need:1,icon:'🐈'},
    {title:'Corredor Invertido',need:2,icon:'🏃'},
    {title:'Cisne Reflexo',need:3,icon:'🦢'},
    {title:'Foguete Reverso',need:4,icon:'🚀'}
  ];
  let root=null,levelsHost=null,observer=null,celebration=null;

  function readState(){
    try{const v=JSON.parse(localStorage.getItem(STORE)||'{}');return{...v,mastered:Array.isArray(v.mastered)?v.mastered:[]}}
    catch(e){return{mastered:[]}}
  }
  const count=()=>Math.min(4,readState().mastered.length);

  function installAccessBridge(refresh=true){
    try{
      const current=window.canAccess;
      if(typeof current!=='function')return false;
      if(!current.__raiBonusAccess){
        const base=current;
        const wrapped=function(i){
          if(i>=BONUS_START&&i<BONUS_START+BONUS.length){
            const meta=BONUS[i-BONUS_START];
            return !!meta&&count()>=meta.need;
          }
          return base(i);
        };
        wrapped.__raiBonusAccess=true;
        wrapped.__raiBase=base;
        window.canAccess=wrapped;
      }
      if(refresh&&typeof window.renderLevels==='function')window.renderLevels();
      return true;
    }catch(e){console.warn('Acesso bônus Prova Paraná',e);return false}
  }

  function ensureCelebration(){
    if(celebration?.isConnected)return celebration;
    celebration=document.createElement('div');
    celebration.className='rai-bonus-overlay';
    celebration.innerHTML=`<div class="rai-bonus-card" role="dialog" aria-modal="true" aria-labelledby="raiBonusTitle"><button type="button" class="rai-bonus-close" aria-label="Fechar">×</button><div class="rai-bonus-trophy">🎁</div><small id="raiBonusEyebrow">MISSÃO DA RAÍ</small><h3 id="raiBonusTitle">Desafio Bônus</h3><p id="raiBonusText"></p><div class="rai-bonus-actions"><button type="button" class="primary" data-play>▶ Jogar agora</button><button type="button" data-study>🎯 Ir para Prova Paraná</button><button type="button" data-close>Continuar</button></div></div>`;
    document.body.appendChild(celebration);
    const close=()=>celebration.classList.remove('show');
    celebration.querySelector('.rai-bonus-close').addEventListener('click',close);
    celebration.querySelector('[data-close]').addEventListener('click',close);
    celebration.addEventListener('click',e=>{if(e.target===celebration)close()});
    celebration.querySelector('[data-study]').addEventListener('click',()=>{close();openProva()});
    return celebration;
  }

  function openProva(){
    try{if(window.__raiProvaParanaV1?.open){window.__raiProvaParanaV1.open();return}document.querySelector('.rai-pp-hero')?.click()}catch(e){}
  }

  function bonusButton(i){
    if(!levelsHost)return null;
    return [...levelsHost.querySelectorAll('button.tl-level')][BONUS_START+i]||null;
  }

  function showLocked(i){
    const meta=BONUS[i],current=count(),missing=Math.max(1,meta.need-current),o=ensureCelebration();
    o.querySelector('.rai-bonus-trophy').textContent='🔒';
    o.querySelector('#raiBonusEyebrow').textContent='DESAFIO BÔNUS • PROVA PARANÁ';
    o.querySelector('#raiBonusTitle').textContent=meta.icon+' '+meta.title;
    o.querySelector('#raiBonusText').innerHTML=missing===1?'Conclua mais <b>1 aula</b> do Especial Prova Paraná com o aproveitamento mínimo para liberar esta missão. <strong>Aprenda. Acerte. Desbloqueie.</strong>':`Conclua mais <b>${missing} aulas</b> do Especial Prova Paraná com o aproveitamento mínimo para liberar esta missão. <strong>Aprenda. Acerte. Desbloqueie.</strong>`;
    o.querySelector('[data-play]').hidden=true;
    o.querySelector('[data-study]').hidden=false;
    o.querySelector('[data-close]').textContent='Agora não';
    o.classList.add('show');
  }

  function showOpenError(i){
    const meta=BONUS[i],o=ensureCelebration();
    o.querySelector('.rai-bonus-trophy').textContent='↻';
    o.querySelector('#raiBonusEyebrow').textContent='MISSÃO LIBERADA';
    o.querySelector('#raiBonusTitle').textContent=meta.icon+' '+meta.title;
    o.querySelector('#raiBonusText').innerHTML='A missão está liberada. Atualizamos a lista de desafios; toque em <strong>Abrir desafio</strong> para entrar.';
    const play=o.querySelector('[data-play]');
    play.hidden=false;play.textContent='▶ Abrir desafio';
    o.querySelector('[data-study]').hidden=true;o.querySelector('[data-close]').textContent='Fechar';
    play.onclick=()=>{
      o.classList.remove('show');
      refreshAccess();
      setTimeout(()=>bonusButton(i)?.click(),40);
    };
    o.classList.add('show');
  }

  function showUnlocked(i){
    const meta=BONUS[i],o=ensureCelebration();
    o.querySelector('.rai-bonus-trophy').textContent='🔓';
    o.querySelector('#raiBonusEyebrow').textContent='DESAFIO DESBLOQUEADO!';
    o.querySelector('#raiBonusTitle').textContent=meta.icon+' '+meta.title;
    o.querySelector('#raiBonusText').innerHTML='Seu estudo abriu uma nova missão no Tangram. <strong>Recompensa conquistada pela aprendizagem.</strong>';
    const play=o.querySelector('[data-play]');
    play.hidden=false;play.textContent='▶ Jogar agora';
    o.querySelector('[data-study]').hidden=true;o.querySelector('[data-close]').textContent='Continuar estudando';
    play.onclick=()=>{
      o.classList.remove('show');
      refreshAccess();
      setTimeout(()=>bonusButton(i)?.click(),40);
    };
    o.classList.add('show');
    try{navigator.vibrate?.([22,45,30,45,45])}catch(e){}
  }

  function ensureSection(){
    if(!levelsHost)return;
    const first=bonusButton(0);if(!first)return;
    let section=levelsHost.querySelector('.rai-bonus-section');
    if(!section){section=document.createElement('div');section.className='rai-bonus-section';first.parentNode.insertBefore(section,first)}
    section.innerHTML=`<span>🎯</span><div><b>Desafios Bônus</b><small>Prova Paraná • ${count()}/4 liberados</small></div>`;
  }

  function decorate(){
    if(!root)return;
    levelsHost=root.querySelector('#levels');if(!levelsHost)return;
    const buttons=[...levelsHost.querySelectorAll('button.tl-level')],mastered=count();
    BONUS.forEach((meta,i)=>{
      const b=buttons[BONUS_START+i];if(!b)return;
      const unlocked=mastered>=meta.need;
      b.dataset.raiBonus=String(i);b.dataset.raiBonusNeed=String(meta.need);
      b.disabled=!unlocked;
      b.setAttribute('aria-disabled',unlocked?'false':'true');
      b.classList.add('rai-bonus-level');
      b.classList.toggle('rai-bonus-locked',!unlocked);
      b.classList.toggle('rai-bonus-unlocked',unlocked);
      let badge=b.querySelector('.rai-bonus-badge');
      if(!badge){badge=document.createElement('span');badge.className='rai-bonus-badge';b.appendChild(badge)}
      badge.textContent=unlocked?'🔓 ABRIR':`🔒 ${meta.need} aula${meta.need>1?'s':''}`;
      b.title=unlocked?'Abrir Desafio Bônus liberado pelas aulas do Especial Prova Paraná':`Complete ${meta.need} aula${meta.need>1?'s':''} do Especial Prova Paraná com aproveitamento mínimo`;
    });
    ensureSection();
  }

  function refreshAccess(){
    installAccessBridge(true);
    levelsHost=root?.querySelector('#levels')||levelsHost;
    decorate();
  }

  function wire(){
    root=document.getElementById('tangram-levels');if(!root){setTimeout(wire,120);return}
    levelsHost=root.querySelector('#levels');if(!levelsHost){setTimeout(wire,120);return}
    refreshAccess();
    root.addEventListener('click',e=>{
      const b=e.target?.closest?.('#levels button.tl-level[data-rai-bonus]');if(!b)return;
      const i=Number(b.dataset.raiBonus),meta=BONUS[i];if(!meta)return;
      if(count()<meta.need){
        e.preventDefault();e.stopImmediatePropagation();showLocked(i);
      }
    },true);
    let queued=false;
    observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorate()})});
    observer.observe(levelsHost,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','class']});
    window.addEventListener('rai-prova-mastered',e=>{
      refreshAccess();
      const before=Number(e.detail?.previousMastered||0),after=Number(e.detail?.mastered||count());
      if(after>before&&after>=1&&after<=4)showUnlocked(after-1);
    });
    window.addEventListener('storage',e=>{if(e.key===STORE)refreshAccess()});
    decorate();
  }

  window.__raiProvaRewardsV1={mounted:true,refresh:refreshAccess,count,showUnlocked,showLocked,showOpenError};
  wire();
})();
