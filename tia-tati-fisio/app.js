(()=>{
  const app=document.getElementById('app');
  const $=(s,root=app)=>root.querySelector(s);
  const $$=(s,root=app)=>[...root.querySelectorAll(s)];

  const CARD_META={
    welcome:{label:'Boas-vindas',text:'Olá! Eu sou a Tia Tati. Vamos juntos?',img:'assets/welcome.webp'},
    guide:{label:'Orientação',text:'Olhe aqui… agora é a sua vez!',img:'assets/guide.webp'},
    success:{label:'Incentivo',text:'Muito bem! Você conseguiu!',img:'assets/success.webp'},
    retry:{label:'Motivação',text:'Mais uma vez? Você consegue!',img:'assets/retry.webp'},
    relax:{label:'Relaxamento',text:'Respira comigo… isso, muito bem!',img:'assets/relax.webp'},
    celebrate:{label:'Comemoração',text:'Que esforço lindo! Parabéns!',img:'assets/celebrate.webp'}
  };

  const ACTIVITIES={
    stars:{name:'Toque nas estrelas',icon:'⭐',desc:'Coordenação olho-mão e alcance.',guide:'Vamos encontrar cinco estrelas. Toque em cada uma quando aparecer.',hint:'Procure a estrela brilhante na tela.',phrase:'guide_stars'},
    reach:{name:'Alcance terapêutico',icon:'🎯',desc:'Alcance dirigido por regiões.',guide:'Vamos alcançar os alvos. Procure o círculo e toque nele.',hint:'Olhe com calma para a região indicada e procure o alvo redondo.',phrase:'guide_reach'},
    hands:{name:'Duas mãos',icon:'🤲',desc:'Coordenação bilateral.',guide:'Agora vamos usar as duas mãos. Toque nos dois lados.',hint:'Uma mão em cada lado. Vamos juntos.',phrase:'guide_hands'},
    sequence:{name:'Sequência motora',icon:'🔢',desc:'Atenção e planejamento motor.',guide:'Toque nos números na ordem: um, dois, três e quatro.',hint:'Comece pelo número um.',phrase:'guide_sequence'},
    colors:{name:'Luzes e cores',icon:'🌈',desc:'Percepção visual e resposta ao estímulo.',guide:'Observe a cor e toque no círculo.',hint:'Observe o desenho e a cor no centro.',phrase:'guide_colors'},
    follow:{name:'Siga a luz',icon:'✨',desc:'Rastreamento visual e precisão.',guide:'Acompanhe a luz e toque nela quando conseguir.',hint:'Acompanhe primeiro com os olhos e depois toque.',phrase:'guide_follow'},
    sensory:{name:'Causa e efeito',icon:'🫧',desc:'Exploração sensorial por toque.',guide:'Toque na tela e veja o que acontece.',hint:'Experimente tocar em diferentes lugares.',phrase:'guide_sensory'},
    breathe:{name:'Respiração guiada',icon:'🌿',desc:'Pausa e autorregulação.',guide:'Agora vamos fazer uma pausa. Respira comigo, devagar.',hint:'Inspire quando o círculo crescer e solte o ar quando ele diminuir.',phrase:'guide_breathe'},
    physical:{name:'Estação física',icon:'👣',desc:'Integra o app ao circuito real.',guide:'Agora é hora da estação física preparada pela fisioterapeuta.',hint:'Siga a orientação da fisioterapeuta e depois toque em Concluído.',phrase:'guide_physical'}
  };

  const PRESETS={
    motor:['stars','reach','hands','sequence','breathe'],
    sensorial:['colors','follow','sensory','breathe'],
    coordenacao:['stars','reach','hands','sequence'],
    relaxamento:['sensory','follow','breathe']
  };

  const PHRASES=[
    {id:'welcome',label:'Boas-vindas',text:CARD_META.welcome.text,group:'Cards'},
    {id:'guide',label:'Orientação geral',text:CARD_META.guide.text,group:'Cards'},
    {id:'success',label:'Incentivo',text:CARD_META.success.text,group:'Cards'},
    {id:'retry',label:'Motivação',text:CARD_META.retry.text,group:'Cards'},
    {id:'relax',label:'Relaxamento',text:CARD_META.relax.text,group:'Cards'},
    {id:'celebrate',label:'Comemoração',text:CARD_META.celebrate.text,group:'Cards'},
    ...Object.entries(ACTIVITIES).map(([id,a])=>({id:a.phrase,label:a.name,text:a.guide,group:'Estações'})),
    {id:'inhale',label:'Respiração — inspire',text:'Inspire devagar.',group:'Respiração'},
    {id:'exhale',label:'Respiração — solte',text:'Agora solte o ar devagar.',group:'Respiração'}
  ];

  const state={
    currentScreen:'home',
    circuit:PRESETS.motor.slice(),
    step:0,
    interactions:0,
    assists:0,
    startedAt:0,
    lastCircuit:PRESETS.motor.slice(),
    targetSize:88,
    reachBias:'all',
    easyTouch:true,
    reducedMotion:false,
    projectionMode:false,
    autoVoice:true,
    soundEnabled:true,
    hapticEnabled:true,
    context:'APAE',
    systemVoice:null,
    ptVoices:[],
    currentPhraseId:'guide',
    currentSpeech:CARD_META.guide.text,
    activeCleanup:null,
    toastTimer:null
  };

  function savePrefs(){
    try{
      localStorage.setItem('tiaTatiPrefs',JSON.stringify({
        targetSize:state.targetSize,reachBias:state.reachBias,easyTouch:state.easyTouch,
        reducedMotion:state.reducedMotion,projectionMode:state.projectionMode,autoVoice:state.autoVoice,
        soundEnabled:state.soundEnabled,hapticEnabled:state.hapticEnabled,context:state.context,
        systemVoiceName:state.systemVoice?.name||''
      }));
    }catch(e){}
  }
  function loadPrefs(){
    try{
      const p=JSON.parse(localStorage.getItem('tiaTatiPrefs')||'{}');
      Object.keys(p).forEach(k=>{if(k in state&&k!=='systemVoiceName')state[k]=p[k]});
      state._preferredVoiceName=p.systemVoiceName||'';
    }catch(e){}
  }
  loadPrefs();

  function showScreen(name){
    if(state.activeCleanup){state.activeCleanup();state.activeCleanup=null;}
    $$('.screen').forEach(s=>s.classList.remove('active'));
    const target=$(`#screen-${name}`);
    if(target)target.classList.add('active');
    state.currentScreen=name;
    app.dataset.screen=name;
    if(name!=='game') stopSystemVoice();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function toast(message){
    const el=$('#toast');
    el.textContent=message;el.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer=setTimeout(()=>el.classList.remove('show'),2400);
  }

  function haptic(pattern=25){
    if(!state.hapticEnabled)return;
    if(navigator.vibrate)navigator.vibrate(pattern);
  }

  function stopSystemVoice(){
    if('speechSynthesis' in window){try{speechSynthesis.cancel()}catch(e){}}
  }

  function loadVoices(){
    if(!('speechSynthesis' in window)){
      state.ptVoices=[];renderSystemVoiceStatus();return;
    }
    const voices=speechSynthesis.getVoices();
    state.ptVoices=voices.filter(v=>(v.lang||'').toLowerCase()==='pt-br');
    if(!state.systemVoice&&state.ptVoices.length){
      state.systemVoice=state.ptVoices.find(v=>v.name===state._preferredVoiceName)||state.ptVoices.find(v=>/maria|camila|francisca|fernanda|luciana|female|google/i.test(v.name))||state.ptVoices[0];
    }
    renderSystemVoiceSelect();
    renderSystemVoiceStatus();
    updateVoiceBanner();
  }

  function renderSystemVoiceSelect(){
    const sel=$('#systemVoiceSelect');if(!sel)return;
    sel.innerHTML='';
    if(!state.ptVoices.length){
      const o=document.createElement('option');o.value='';o.textContent='Nenhuma voz pt-BR disponível';sel.appendChild(o);sel.disabled=true;return;
    }
    sel.disabled=false;
    state.ptVoices.forEach((v,i)=>{
      const o=document.createElement('option');o.value=String(i);o.textContent=`${v.name} (${v.lang})`;
      if(state.systemVoice?.name===v.name)o.selected=true;
      sel.appendChild(o);
    });
  }

  function renderSystemVoiceStatus(){
    const el=$('#systemVoiceStatus');if(!el)return;
    if(!('speechSynthesis' in window)){
      el.className='inline-message error';el.textContent='Este navegador não oferece voz do sistema. As gravações locais continuam disponíveis.';return;
    }
    if(!state.ptVoices.length){
      el.className='inline-message error';el.textContent='Nenhuma voz pt-BR foi encontrada. O app não usará voz estrangeira; grave a voz da Tatiana abaixo.';return;
    }
    el.className='inline-message success';el.textContent=`Voz pt-BR selecionada: ${state.systemVoice?.name||state.ptVoices[0].name}.`;
  }

  function systemSpeak(text){
    if(!state.soundEnabled||!state.systemVoice||!('speechSynthesis' in window))return false;
    try{
      stopSystemVoice();
      const u=new SpeechSynthesis.SpeechSynthesisUtterance(text);u.voice=state.systemVoice;u.lang='pt-BR';u.rate=.93;u.pitch=1;u.volume=1;speechSynthesis.speak(u);return true;
    }catch(e){return false;}
  }

  // IndexedDB voice recordings
  const VoiceDB={
    db:null,
    async open(){
      if(this.db)return this.db;
      return new Promise((resolve,reject)=>{
        const req=indexedDB.open('tiaTatiVoiceDB',1);
        req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('clips'))db.createObjectStore('clips',{keyPath:'id'})};
        req.onsuccess=()=>{this.db=req.result;resolve(this.db)};req.onerror=()=>reject(req.error);
      });
    },
    async get(id){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('clips','readonly');const r=tx.objectStore('clips').get(id);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)});},
    async put(id,blob){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('clips','readwrite');tx.objectStore('clips').put({id,blob,updatedAt:Date.now()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})},
    async del(id){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('clips','readwrite');tx.objectStore('clips').delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
  };

  let currentAudio=null;
  async function playRecorded(id){
    if(!state.soundEnabled)return false;
    try{
      const rec=await VoiceD.get(id);if(!rec?.blob)return false;
      if(currentAudio){currentAudio.pause();URL.revokeObjectURL(currentAudio.src);currentAudio=null;}
      stopSystemVoice();
      const url=URL.createObjectURL(rec.blob);const a=new Audio(url);currentAudio=a;
      a.onended=()=>{URL.revokeObjectURL(url);if(currentAudio===a)currentAudio=null};a.onerror=()=>{URL.revokeObjectURL(url);if(currentAudio===a)currentAudio=null};
      await a.play();return true;
    }catch(e){return false}
  }

  async function speakPhrase(id,text){
    if(!state.soundEnabled)return;
    const played=await playRecorded(id);
    if(!played)systemSpeak(text);
  }

  function updateVoiceBanner(){
    const title=$('#voiceBannerTitle'),text=$('#voiceBannerText');if(!title||!text)return;
    title.textContent='Voz da Tia Tati';
    if(state.systemVoice)text.textContent=`App em pt-BR. Voz selecionada: ${state.systemVoice.name}. A voz gravada da Tatiana temá prioridade.`;
    else text.textContent='Nenhuma voz pt-BR foi encontrada. O app não usa voz estrangeira; grave a voz da Tatiana no Estúdio de Voz.';
  }

  function buildHome(){
    $('#contextChip').textContent=state.context==='APAE'?'APAE e outros':state.context;
    $('#targetSize').value=String(state.targetSize);$('#reachBias').value=state.reachBias;$('#easyTouch').checked=state.easyTouch;$('#reducedMotion').checked=state.reducedMotion;$('#projectionMode').checked=state.projectionMode;$('#autoVoice').checked=state.autoVoice;
    $('#contextSelect').value=state.context;$('#soundEnabled').checked=state.soundEnabled;$('#hapticEnabled').checked=state.hapticEnabled;
    $('#physicalConfig').hidden=!$('.station-check[value="physical"]').checked;
    updateVoiceBanner();
  }

  function buildStationPicker(){
    const root=$('#stationPicker');root.innerHTML='';
    Object.entries(ACTIVITIES).forEach(([id,a],i=>{
      const label=document.createElement('label');label.className='station-option';
      const check=document.createElement('input');check.type='checkbox';check.className='station-check';check.value=id;check.checked=['ustars','reach','breathe'].includes(id);
      check.addEventListener('change',()=>{if(id==='physical'))
