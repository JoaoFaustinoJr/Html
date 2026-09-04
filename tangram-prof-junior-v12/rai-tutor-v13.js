(()=>{const root=document.getElementById('tangram-levels');if(!root)return;
const sub=root.querySelector('.tl-sub');if(sub&&/v12/i.test(sub.textContent||''))sub.textContent='Prof. João Faustino Junior • v13.1 • R.A.I. Tutora';const STORE='tangram_rai_tutora_v13';let prefs={auto:true,voice:false,rating:0};try{prefs={...prefs,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(e){}const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(prefs))}catch(e){}};
const rai='rai-icon.svg?v=rai3';const title=()=>((root.querySelector('#title')?.textContent||'Missão atual').replace(/\s+/g,' ').trim());const allText=()=>[...root.querySelectorAll('.tl-metertext,.tl-msg,#msg,.tl-chip,.tl-stats')].map(x=>x.textContent||'').join(' ').replace(/\s+/g,' ').trim();
const metric=(t,n)=>{const m=t.match(new RegExp(n+'\\s*:?\\s*([0-9]+(?:[\\.,][0-9]+)?)','i'));return m?Number(m[1].replace(',','.')):null};const metrics=()=>{const t=allText();return{coverage:metric(t,'cobertura'),overlap:metric(t,'sobreposição'),outside:metric(t,'fora')}};
let raiVoice=null;
const pickRaiVoice=()=>{
  if(!('speechSynthesis'in window))return null;
  const voices=speechSynthesis.getVoices().filter(v=>/^pt(-|_)BR/i.test(v.lang)||/^pt/i.test(v.lang));
  if(!voices.length)return null;
  const preferred=[/luciana/i,/francisca/i,/camila/i,/vit[oó]ria/i,/maria/i,/let[ií]cia/i,/female/i,/google.*portugu/i,/portugu.*brasil/i];
  for(const rx of preferred){const v=voices.find(x=>rx.test(x.name||''));if(v)return v}
  return voices[0];
};
if('speechSynthesis'in window&&speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',()=>{raiVoice=pickRaiVoice()});
const say=t=>{if(!prefs.voice||!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.voice=raiVoice||pickRaiVoice();u.rate=1.03;u.pitch=1.24;u.volume=.96;speechSynthesis.speak(u)}catch(e){}};
window.__raiSpeak=say;

const fab=document.createElement('button');fab.type='button';fab.className='rai-tutor-fab';fab.setAttribute('aria-label','Abrir R.A.I.');fab.innerHTML='<img src="'+rai+'" alt="R.A.I.">';document.body.appendChild(fab);
const bubble=document.createElement('div');bubble.className='rai-tutor-bubble';document.body.appendChild(bubble);const show=(msg,speak=false)=>{bubble.innerHTML='<b>🤖 R.A.I.</b><br>'+msg;bubble.classList.add('show');clearTimeout(bubble._t);bubble._t=setTimeout(()=>bubble.classList.remove('show'),4700);if(speak)say(msg)};

const panel=document.createElement('div');panel.className='rai-tutor-overlay';panel.innerHTML='<div class="rai-tutor-card"><div class="rai-tutor-head"><img src="'+rai+'" alt="R.A.I."><div><h3>R.A.I. • Tutora</h3><small>Dicas, explicações e incentivo</small></div><button class="rai-tutor-close" type="button">×</button></div><p>Posso ajudar sem entregar a solução.</p><div class="rai-tutor-grid"><button class="rai-tutor-action primary" id="raiHint" type="button"><b>💡 Dica</b><small>Ajuda em níveis</small></button><button class="rai-tutor-action" id="raiExplain" type="button"><b>🧠 Explicar</b><small>Entenda a geometria</small></button><button class="rai-tutor-action" id="raiAnalyse" type="button"><b>🔎 Analisar</b><small>Leia os indicadores</small></button><button class="rai-tutor-action" id="raiCheer" type="button"><b>🌟 Incentivar</b><small>Motivação curta</small></button><button class="rai-tutor-action" id="raiFeedback" type="button"><b>💬 Feedback</b><small>Enviar ao professor</small></button><button class="rai-tutor-action" id="raiContinue" type="button"><b>✓ Continuar</b><small>Voltar ao desafio</small></button></div><div class="rai-tutor-setting"><span>Intervenções automáticas</span><button class="rai-tutor-toggle" id="raiAuto" type="button"></button></div><div class="rai-tutor-setting"><span>Fala da R.A.I.</span><button class="rai-tutor-toggle" id="raiVoice" type="button"></button></div></div>';document.body.appendChild(panel);
const closePanel=()=>panel.classList.remove('show');fab.addEventListener('click',()=>panel.classList.add('show'));panel.querySelector('.rai-tutor-close').addEventListener('click',closePanel);panel.querySelector('#raiContinue').addEventListener('click',closePanel);panel.addEventListener('click',e=>{if(e.target===panel)closePanel()});
const renderToggles=()=>{[['#raiAuto','auto'],['#raiVoice','voice']].forEach(([s,k])=>{const b=panel.querySelector(s);b.textContent=prefs[k]?'Ligado':'Desligado';b.classList.toggle('on',prefs[k])})};renderToggles();
panel.querySelector('#raiAuto').addEventListener('click',()=>{prefs.auto=!prefs.auto;save();renderToggles();show(prefs.auto?'Vou ajudar quando perceber uma dificuldade.':'Agora só apareço quando você me chamar.')});panel.querySelector('#raiVoice').addEventListener('click',()=>{prefs.voice=!prefs.voice;save();renderToggles();show(prefs.voice?'Minha fala foi ativada.':'Minha fala foi desativada.',prefs.voice)});

const hintState=new Map();const hint=()=>{const m=metrics(),k=title(),n=((hintState.get(k)||0)%3)+1;hintState.set(k,n);if(n===1){if((m.overlap||0)>0)return'Dica 1: há sobreposição. Separe primeiro as peças que ocupam o mesmo espaço.';if((m.outside||0)>0)return'Dica 1: uma peça ultrapassa o contorno. Alinhe uma de suas bordas à silhueta.';if((m.coverage||0)>=75)return'Dica 1: você está perto. Observe as lacunas e compare o tamanho delas com as peças menores.';return'Dica 1: observe a silhueta inteira e comece pelas peças maiores.'}if(n===2){if((m.overlap||0)>0)return'Dica 2: mova uma das peças sobrepostas para uma borda livre e só depois ajuste o ângulo.';if((m.outside||0)>0)return'Dica 2: alinhe um lado da peça ao contorno e experimente uma rotação de 45 graus.';return'Dica 2: procure ângulos de 45 e 90 graus. Eles ajudam a decidir a rotação.'}return'Dica 3: resolva uma lacuna por vez. Compare sua forma com o quadrado, o paralelogramo e os triângulos pequenos.'};
const explain=()=>{const m=metrics();if((m.overlap||0)>0)return'Sobreposição significa que duas peças ocupam a mesma região. Elas podem se tocar, mas não ficar uma sobre a outra.';if((m.outside||0)>0)return'“Fora” mede quanto das peças ultrapassa a silhueta. O encaixe correto mantém todas dentro do contorno.';if(m.coverage!=null&&m.coverage<100)return'Cobertura indica quanto da figura-alvo já foi preenchido. O objetivo é 100%, sem sobreposição e sem partes fora.';const b=['Rotação muda a orientação da peça, mas preserva forma e tamanho.','Espelhar muda a orientação. Isso é especialmente perceptível no paralelogramo.','O Tangram trabalha composição e decomposição: formas simples podem criar figuras complexas.','Percepção espacial é imaginar posições e rotações antes de mover as peças.'];return b[Math.floor(Math.random()*b.length)]};
const analyse=()=>{const m=metrics();if(m.coverage==null&&m.overlap==null&&m.outside==null)return'Use Verificar e eu consigo interpretar os indicadores.';const p=[];if(m.coverage!=null)p.push('cobertura '+m.coverage.toFixed(1).replace('.',',')+'%');if(m.overlap!=null)p.push('sobreposição '+m.overlap.toFixed(1).replace('.',',')+'%');if(m.outside!=null)p.push('fora '+m.outside.toFixed(1).replace('.',',')+'%');let f='.';if((m.overlap||0)>0)f=' Reduza primeiro a sobreposição.';else if((m.outside||0)>0)f=' Reposicione a peça fora do contorno.';else if((m.coverage||0)<100)f=' Ainda há lacunas.';else f=' Encaixe perfeito!';return'Vejo '+p.join(', ')+f};
const cheers=['Você consegue. Observe, teste e ajuste uma coisa de cada vez.','Cada tentativa revela uma informação nova. Continue!','Boa! Compare ângulos e tamanhos antes de mover a próxima peça.','Sem pressa: pensar antes de mover costuma economizar tentativas.'];
panel.querySelector('#raiHint').addEventListener('click',()=>{closePanel();show(hint(),true)});panel.querySelector('#raiExplain').addEventListener('click',()=>{closePanel();show(explain(),true)});panel.querySelector('#raiAnalyse').addEventListener('click',()=>{closePanel();show(analyse(),true)});panel.querySelector('#raiCheer').addEventListener('click',()=>{closePanel();show(cheers[Math.floor(Math.random()*cheers.length)],true)});

const FORM_URL='https://docs.google.com/forms/d/e/1FAIpQLSd1DGiUqz5kA-EmB3Y0a9WxFtqZ17Hq99L1up2E_yXmpjbanA/viewform?usp=publish-editor';
panel.querySelector('#raiFeedback').addEventListener('click',()=>{closePanel();const w=window.open(FORM_URL,'_blank','noopener,noreferrer');if(!w)window.location.href=FORM_URL});

const successLines=[
  'Parabéns! É isso aí! Você conseguiu. Vamos para a próxima fase!',
  'Muito bem! Mandou bem demais! Vamos encarar o próximo desafio?',
  'Isso! Encaixe concluído! Bora para a próxima missão!',
  'Oba! Você encontrou a solução. Agora vamos para a próxima fase!',
  'Excelente! Mais uma missão vencida. Vamos continuar?',
  'Aí sim! Ficou certinho. Próximo desafio, vamos lá!'
];
let successIx=-1;
const successMessage=()=>{
  if(/^\s*10\./.test(title()))return'Parabéns! Você concluiu todas as missões do Tangram! Missão cumprida!';
  let i=Math.floor(Math.random()*successLines.length);
  if(successLines.length>1&&i===successIx)i=(i+1)%successLines.length;
  successIx=i;return successLines[i];
};
let lastTitle='',lastMsg='',lastAuto=0;
const intro=()=>{const t=title();if(!prefs.auto||!t||t===lastTitle)return;lastTitle=t;setTimeout(()=>{if(Date.now()-lastAuto<4500)return;lastAuto=Date.now();show('Nova missão! Observe primeiro a silhueta e imagine onde as peças maiores podem formar a estrutura.')},700)};
const inspect=()=>{
  const msg=(root.querySelector('#msg')?.textContent||'').replace(/\s+/g,' ').trim();
  if(!prefs.auto||!msg||msg===lastMsg)return;
  lastMsg=msg;
  const low=msg.toLowerCase(),now=Date.now();
  if(now-lastAuto<1600)return;
  if(/miss[aã]o conclu[ií]da/.test(low)){
    const m=metrics();
    const valid=(m.coverage==null||m.coverage>=99.7)&&(m.overlap==null||m.overlap<=0.12)&&(m.outside==null||m.outside<=0.12);
    if(valid){lastAuto=now;show(successMessage(),true)}
  }else if(/tente novamente|ainda n[aã]o|sobrepos|fora/.test(low)){lastAuto=now;show(analyse())}
};
const te=root.querySelector('#title');if(te)new MutationObserver(()=>setTimeout(intro,50)).observe(te,{subtree:true,childList:true,characterData:true});const me=root.querySelector('#msg');if(me)new MutationObserver(()=>setTimeout(inspect,70)).observe(me,{subtree:true,childList:true,characterData:true,attributes:true});
root.addEventListener('click',e=>{const b=e.target?.closest?.('button');if(!b)return;const l=((b.textContent||'')+' '+(b.id||'')).toLowerCase();if(/dica/.test(l))setTimeout(()=>show(hint()),140);else if(/verificar|check/.test(l)&&prefs.auto)setTimeout(()=>{if(Date.now()-lastAuto>1700){lastAuto=Date.now();show(analyse())}},520);else if(/amostra|sample/.test(l))show('A amostra é apoio visual. Compare a organização e depois tente reconstruir com sua própria estratégia.')});intro();
})();
/* RAI_ENHANCE_SHAPES_DRAG */
(()=>{
  const root=document.getElementById('tangram-levels');
  const fab=document.querySelector('.rai-tutor-fab');
  const bubble=document.querySelector('.rai-tutor-bubble');
  const panel=document.querySelector('.rai-tutor-overlay');
  if(!root||!fab||!bubble||!panel)return;

  const POS='tangram_rai_fab_position_v13';
  let moved=false,start=null,lastPos=null;

  const clamp=(x,y)=>{
    const r=fab.getBoundingClientRect(),w=r.width||54,h=r.height||54;
    return {
      x:Math.max(6,Math.min(window.innerWidth-w-6,x)),
      y:Math.max(6,Math.min(window.innerHeight-h-6,y))
    };
  };
  const apply=(x,y)=>{
    const p=clamp(x,y);
    fab.style.left=p.x+'px';fab.style.top=p.y+'px';
    fab.style.right='auto';fab.style.bottom='auto';
    lastPos=p;
  };
  const savePos=()=>{if(lastPos)try{localStorage.setItem(POS,JSON.stringify(lastPos))}catch(e){}};
  try{
    const p=JSON.parse(localStorage.getItem(POS)||'null');
    if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))apply(p.x,p.y);
  }catch(e){}

  const placeBubble=()=>{
    if(!bubble.classList.contains('show'))return;
    requestAnimationFrame(()=>{
      const fr=fab.getBoundingClientRect(),br=bubble.getBoundingClientRect();
      let x=fr.left;
      if(x+br.width>window.innerWidth-8)x=window.innerWidth-br.width-8;
      if(x<8)x=8;
      let y=fr.top-br.height-10;
      if(y<8)y=Math.min(window.innerHeight-br.height-8,fr.bottom+10);
      bubble.style.left=x+'px';bubble.style.top=y+'px';
      bubble.style.right='auto';bubble.style.bottom='auto';
    });
  };
  new MutationObserver(placeBubble).observe(bubble,{attributes:true,attributeFilter:['class']});

  fab.style.touchAction='none';
  fab.addEventListener('pointerdown',e=>{
    if(e.button!=null&&e.button!==0)return;
    const r=fab.getBoundingClientRect();
    start={id:e.pointerId,dx:e.clientX-r.left,dy:e.clientY-r.top,x:e.clientX,y:e.clientY};
    moved=false;
    try{fab.setPointerCapture(e.pointerId)}catch(err){}
  });
  fab.addEventListener('pointermove',e=>{
    if(!start||e.pointerId!==start.id)return;
    if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>7)moved=true;
    if(!moved)return;
    e.preventDefault();bubble.classList.remove('show');
    apply(e.clientX-start.dx,e.clientY-start.dy);
  });
  fab.addEventListener('pointerup',e=>{
    if(!start||e.pointerId!==start.id)return;
    if(moved){
      const r=fab.getBoundingClientRect();
      const x=(r.left+r.width/2)<window.innerWidth/2?8:window.innerWidth-r.width-8;
      apply(x,r.top);savePos();
      fab.dataset.dragged='1';
      setTimeout(()=>delete fab.dataset.dragged,250);
    }
    start=null;
  });
  fab.addEventListener('pointercancel',()=>{start=null});
  fab.addEventListener('click',e=>{
    if(fab.dataset.dragged==='1'){e.preventDefault();e.stopImmediatePropagation()}
  },true);
  window.addEventListener('resize',()=>{
    if(lastPos)apply(lastPos.x,lastPos.y);
  });

  const map=[
    {id:'L1',name:'Triângulo grande',frac:'1/4',area:'25%',text:'É um triângulo retângulo isósceles: possui um ângulo de 90° e dois de 45°. Cada triângulo grande ocupa 1/4 da área total do Tangram.'},
    {id:'L2',name:'Triângulo grande',frac:'1/4',area:'25%',text:'É um triângulo retângulo isósceles: possui um ângulo de 90° e dois de 45°. Cada triângulo grande ocupa 1/4 da área total do Tangram.'},
    {id:'M',name:'Triângulo médio',frac:'1/8',area:'12,5%',text:'Também é um triângulo retângulo isósceles, com ângulos de 45°, 45° e 90°. Sua área é 1/8 do Tangram, igual à área do quadrado e do paralelogramo.'},
    {id:'S1',name:'Triângulo pequeno',frac:'1/16',area:'6,25%',text:'É um triângulo retângulo isósceles de 45°, 45° e 90°. Cada pequeno ocupa 1/16 da área total. Dois pequenos juntos têm a mesma área do triângulo médio.'},
    {id:'S2',name:'Triângulo pequeno',frac:'1/16',area:'6,25%',text:'É um triângulo retângulo isósceles de 45°, 45° e 90°. Cada pequeno ocupa 1/16 da área total. Quatro pequenos equivalem à área de um triângulo grande.'},
    {id:'Q',name:'Quadrado',frac:'1/8',area:'12,5%',text:'O quadrado possui quatro lados iguais e quatro ângulos retos de 90°. Sua área corresponde a 1/8 do Tangram.'},
    {id:'P',name:'Paralelogramo',frac:'1/8',area:'12,5%',text:'O paralelogramo possui dois pares de lados opostos paralelos. Nesta peça aparecem ângulos de 45° e 135°. Em algumas montagens é preciso espelhá-lo, não apenas girá-lo.'}
  ];
  const currentPiece=()=>{
    const arr=[...root.querySelectorAll('#board .piece')];
    if(!arr.length)return null;
    const el=root.querySelector('#board .piece.selected')||arr[0];
    const i=arr.indexOf(el);
    return map[i]||null;
  };
  const speak=t=>{try{if(window.__raiSpeak)window.__raiSpeak(t)}catch(e){}};
  const showShape=()=>{
    const p=currentPiece();
    if(!p){bubble.innerHTML='<b>🤖 R.A.I.</b><br>Selecione uma peça do Tangram e tente novamente.'}
    else{
      const extra=p.id==='Q'?' Fórmula de área: lado × lado.':p.id==='P'?' Fórmula de área: base × altura.':' Fórmula de área: base × altura ÷ 2.';
      const msg=p.name+'. '+p.text+extra;
      bubble.innerHTML='<b>🤖 R.A.I. • '+p.name+'</b><br>'+msg;
      speak(msg);
    }
    bubble.classList.add('show');clearTimeout(bubble._t);bubble._t=setTimeout(()=>bubble.classList.remove('show'),7600);placeBubble();
  };

  const grid=panel.querySelector('.rai-tutor-grid');
  if(grid&&!panel.querySelector('#raiShape')){
    const b=document.createElement('button');
    b.id='raiShape';b.type='button';b.className='rai-tutor-action';
    b.innerHTML='<b>📐 Peça selecionada</b><small>Conheça a forma, ângulos e área</small>';
    const fb=panel.querySelector('#raiFeedback');
    if(fb)grid.insertBefore(b,fb);else grid.appendChild(b);
    b.addEventListener('click',()=>{panel.classList.remove('show');showShape()});
  }

  const seen=new Set();
  root.addEventListener('click',e=>{
    const b=e.target?.closest?.('button');if(!b)return;
    const id=b.id||'';
    if((id==='left'||id==='right'||id==='mLeft'||id==='mRight')&&!seen.has('rot')){
      seen.add('rot');
      setTimeout(()=>{
        bubble.innerHTML='<b>🤖 R.A.I. • Geometria</b><br>Você realizou uma <b>rotação de 45°</b>. A peça mudou de orientação, mas conservou sua forma e seu tamanho.';
        bubble.classList.add('show');clearTimeout(bubble._t);bubble._t=setTimeout(()=>bubble.classList.remove('show'),6200);placeBubble();
      },180);
    }
    if((id==='flip'||id==='mFlip')&&!seen.has('flip')){
      seen.add('flip');
      setTimeout(()=>{
        bubble.innerHTML='<b>🤖 R.A.I. • Geometria</b><br>Isso é uma <b>reflexão ou espelhamento</b>: a orientação da figura foi invertida. Observe especialmente o paralelogramo.';
        bubble.classList.add('show');clearTimeout(bubble._t);bubble._t=setTimeout(()=>bubble.classList.remove('show'),6500);placeBubble();
      },180);
    }
  });
})();
