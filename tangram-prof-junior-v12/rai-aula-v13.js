(()=>{
  const root=document.getElementById('tangram-levels');
  const launch=document.getElementById('raiLesson');
  if(!root||!launch)return;

  const lessons=[
    {
      topic:'Formas geométricas',
      concept:'O Tangram tem sete peças. Cinco são triângulos. Há também um quadrado e um paralelogramo.',
      formula:'Triângulo: A = (b × h) ÷ 2',
      use:'Áreas aparecem em plantas, pisos, terrenos e projetos.',
      challenge:'Escolha um triângulo. Procure nele um ângulo de 90 graus.',
      answer:'Os triângulos do Tangram são retângulos isósceles: têm um ângulo de 90° e dois de 45°.'
    },
    {
      topic:'Frações e área',
      concept:'Cada peça representa uma parte da área total. Os dois triângulos grandes ocupam metade do Tangram juntos.',
      formula:'Grande = 1/4 • Médio = 1/8 • Quadrado = 1/8 • Paralelogramo = 1/8 • Pequeno = 1/16',
      use:'Frações ajudam a comparar partes de uma mesma quantidade.',
      challenge:'Quantos triângulos pequenos têm a mesma área de um triângulo grande?',
      answer:'Quatro. Cada pequeno vale 1/16 e o grande vale 1/4, ou seja, 4/16.'
    },
    {
      topic:'Composição e decomposição',
      concept:'Uma figura grande pode ser formada por peças menores. Também podemos dividir uma figura em partes mais simples.',
      formula:'Compor = juntar • Decompor = separar',
      use:'Essa ideia aparece em geometria, desenho, construção e resolução de problemas.',
      challenge:'Antes de mover uma peça, tente imaginar qual região pode ser formada por duas peças menores.',
      answer:'Não existe uma única escolha. O importante é perceber quais peças podem formar juntas a mesma região.'
    },
    {
      topic:'Rotação',
      concept:'Rotacionar é girar uma peça. Ela muda de direção, mas mantém sua forma, seu tamanho e sua área.',
      formula:'2 giros de 45° = 90° • 4 giros = 180°',
      use:'Rotação aparece em robótica, engrenagens, mapas, jogos e desenho técnico.',
      challenge:'Gire uma peça duas vezes em 45 graus. Quanto ela girou ao todo?',
      answer:'90 graus.'
    },
    {
      topic:'Reflexão e espelhamento',
      concept:'Espelhar muda a orientação da peça. Não é a mesma coisa que apenas girar.',
      formula:'Reflexão preserva forma, tamanho, ângulos e área.',
      use:'Reflexão aparece em espelhos, simetria, design e orientação de objetos.',
      challenge:'Observe o paralelogramo. Tente imaginar quando girar não basta e é preciso espelhar.',
      answer:'Quando a inclinação necessária está invertida. O paralelogramo é a peça que mais deixa isso evidente.'
    },
    {
      topic:'Ângulos',
      concept:'Os ângulos ajudam a decidir como uma peça pode encaixar. No Tangram aparecem muito os ângulos de 45°, 90° e 135°.',
      formula:'45° + 45° = 90° • 90° + 45° = 135°',
      use:'Ângulos são usados em construção, desenho, navegação e movimentos de robôs.',
      challenge:'Procure dois ângulos de 45 graus que juntos formem um ângulo reto.',
      answer:'Dois ângulos de 45° somam 90°.'
    },
    {
      topic:'Translação e congruência',
      concept:'Transladar é mover uma peça sem girá-la. Duas figuras congruentes têm a mesma forma e o mesmo tamanho.',
      formula:'Translação: posição muda • forma e orientação não mudam',
      use:'Isso aparece em coordenadas, programação gráfica e movimentação de objetos.',
      challenge:'Mova uma peça sem girar. O que mudou?',
      answer:'Mudou apenas a posição. A forma, o tamanho e a orientação foram preservados.'
    },
    {
      topic:'Área e contorno',
      concept:'As sete peças sempre conservam a mesma área total. Mas o contorno da figura pode mudar bastante.',
      formula:'Área mede a superfície • Perímetro mede o contorno',
      use:'Essa diferença é importante em terrenos, cercas, pisos e projetos.',
      challenge:'Duas figuras feitas com as mesmas sete peças podem ter a mesma área e perímetros diferentes?',
      answer:'Sim. A área total é a mesma, mas o contorno pode mudar.'
    },
    {
      topic:'Lógica e restrições',
      concept:'Algumas peças têm poucas posições possíveis. Começar por elas reduz as opções e facilita o problema.',
      formula:'Observar → restringir opções → testar → verificar',
      use:'Essa estratégia aparece em quebra-cabeças, programação, planejamento e tomada de decisão.',
      challenge:'Antes de mover, procure a região mais difícil. Qual peça parece ter menos opções de encaixe?',
      answer:'A resposta depende da figura. O objetivo é começar pela peça ou região mais limitada.'
    },
    {
      topic:'Algoritmo e estratégia',
      concept:'Resolver um Tangram pode seguir uma sequência de passos. Isso se parece com um algoritmo.',
      formula:'Planejar → tentar → verificar → corrigir → continuar',
      use:'Programas de computador e robôs também trabalham com sequências, testes e correções.',
      challenge:'Se uma escolha bloqueia as peças restantes, o que você pode fazer?',
      answer:'Voltar, desfazer a escolha e testar outra possibilidade. Em computação, uma estratégia parecida é chamada de backtracking.'
    }
  ];

  const currentMission=()=>{
    const t=(root.querySelector('#title')?.textContent||'').trim();
    const m=t.match(/^\s*(\d+)\./);
    if(m)return Math.max(1,Math.min(10,Number(m[1])));
    const buttons=[...root.querySelectorAll('#levels button.tl-level')];
    const active=buttons.findIndex(b=>b.classList.contains('active'));
    return active>=0?active+1:1;
  };

  const overlay=document.createElement('div');
  overlay.className='rai-lesson-overlay';
  overlay.innerHTML=`
    <div class="rai-lesson-card" role="dialog" aria-modal="true" aria-labelledby="raiLessonTitle">
      <div class="rai-lesson-head">
        <img src="rai-icon.svg?v=rai3" alt="R.A.I.">
        <div><h3 id="raiLessonTitle">🎓 Aula da R.A.I.</h3><small id="raiLessonSub">Matemática e lógica da missão</small></div>
        <button type="button" class="rai-lesson-close" aria-label="Fechar">×</button>
      </div>
      <div class="rai-lesson-body">
        <div class="rai-lesson-topic" id="raiLessonTopic"></div>
        <div class="rai-lesson-block"><span>💡 Ideia</span><p id="raiLessonConcept"></p></div>
        <div class="rai-lesson-formula" id="raiLessonFormula"></div>
        <div class="rai-lesson-block"><span>🌍 Onde isso aparece?</span><p id="raiLessonUse"></p></div>
        <div class="rai-lesson-challenge">
          <span>🧠 Desafio rápido</span>
          <p id="raiLessonChallenge"></p>
          <button type="button" id="raiLessonAnswer">Ver resposta</button>
          <p class="rai-lesson-answer" id="raiLessonAnswerText"></p>
        </div>
        <div class="rai-lesson-actions">
          <button type="button" class="primary" id="raiLessonSpeak">🔊 Ouvir a aula</button>
          <button type="button" id="raiLessonTry">🎯 Testar no Tangram</button>
          <button type="button" id="raiLessonClose">Continuar jogando</button>
        </div>
        <p class="rai-lesson-note">Frases curtas e pequenas pausas ajudam a acompanhar a explicação com calma.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  let mission=1;
  const els={
    sub:overlay.querySelector('#raiLessonSub'),
    topic:overlay.querySelector('#raiLessonTopic'),
    concept:overlay.querySelector('#raiLessonConcept'),
    formula:overlay.querySelector('#raiLessonFormula'),
    use:overlay.querySelector('#raiLessonUse'),
    challenge:overlay.querySelector('#raiLessonChallenge'),
    answer:overlay.querySelector('#raiLessonAnswerText'),
    answerBtn:overlay.querySelector('#raiLessonAnswer')
  };

  const render=()=>{
    mission=currentMission();
    const l=lessons[mission-1]||lessons[0];
    els.sub.textContent='Missão '+mission+' • Matemática e lógica';
    els.topic.textContent=l.topic;
    els.concept.textContent=l.concept;
    els.formula.textContent=l.formula;
    els.use.textContent=l.use;
    els.challenge.textContent=l.challenge;
    els.answer.textContent=l.answer;
    els.answer.classList.remove('show');
    els.answerBtn.textContent='Ver resposta';
  };

  const close=()=>{
    overlay.classList.remove('show');
    try{if(window.__raiStopSpeak)window.__raiStopSpeak()}catch(e){}
  };

  const lessonSpeech=()=>{
    const l=lessons[mission-1]||lessons[0];
    return[
      'Oi! Vamos olhar a matemática desta missão.',
      l.concept,
      'Agora, uma ideia importante.',
      l.formula.replace(/•/g,'.'),
      l.use,
      'E aqui vai um desafio.',
      l.challenge
    ];
  };

  launch.addEventListener('click',()=>{
    render();
    overlay.classList.add('show');
  });
  overlay.querySelector('.rai-lesson-close').addEventListener('click',close);
  overlay.querySelector('#raiLessonClose').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});

  els.answerBtn.addEventListener('click',()=>{
    const show=!els.answer.classList.contains('show');
    els.answer.classList.toggle('show',show);
    els.answerBtn.textContent=show?'Ocultar resposta':'Ver resposta';
  });

  overlay.querySelector('#raiLessonSpeak').addEventListener('click',()=>{
    if(window.__raiSpeak)window.__raiSpeak(lessonSpeech(),{force:true,pause:360});
  });

  overlay.querySelector('#raiLessonTry').addEventListener('click',()=>{
    const l=lessons[mission-1]||lessons[0];
    overlay.classList.remove('show');
    const bubble=document.querySelector('.rai-tutor-bubble');
    if(bubble){
      bubble.innerHTML='<b>🤖 R.A.I. • Vamos testar</b><br>'+l.challenge;
      bubble.classList.add('show');
      clearTimeout(bubble._t);
      bubble._t=setTimeout(()=>bubble.classList.remove('show'),7200);
    }
    const stage=root.querySelector('.tl-stage');
    if(stage){stage.classList.add('rai-lesson-stage-pulse');setTimeout(()=>stage.classList.remove('rai-lesson-stage-pulse'),1400)}
    try{if(window.__raiSpeak)window.__raiSpeak([l.challenge],{force:true,pause:320})}catch(e){}
  });
})();