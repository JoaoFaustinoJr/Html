(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RANKS=[[0,'Novato Maker'],[100,'Codificador'],[200,'Construtor de Robôs'],[300,'Engenheiro Maker'],[400,'Mestre STEAM'],[500,'Lenda Tech']];
const MISSIONS=[
 {id:'code',icon:'🧩',name:'Code Arena',sub:'A mesma lógica em blocos, pseudocódigo e Python',xp:0,badge:null},
 {id:'var',icon:'📦',name:'Variáveis',sub:'Variable Vault: guarde e transforme valores',xp:40,badge:'📦 Mestre das Variáveis'},
 {id:'robot',icon:'🤖',name:'Robótica',sub:'Sensor + condicional = decisão',xp:50,badge:'🤖 Piloto de Robô'},
 {id:'algo',icon:'🧭',name:'Algoritmos',sub:'Programe o robô com F, D e E',xp:70,badge:'🧭 Mestre dos Algoritmos'},
 {id:'agro',icon:'🌱',name:'Agro Quest',sub:'Irrigação inteligente e sustentabilidade',xp:50,badge:'🌱 Guardião da Horta'},
 {id:'data',icon:'📊',name:'Data Lab',sub:'Telemetria e interpretação de dados',xp:50,badge:'📊 Analista de Dados'},
 {id:'cyber',icon:'🛡️',name:'Cyber Shield',sub:'Segurança e cidadania digital',xp:40,badge:'🛡️ Cyber Guardião'},
 {id:'boss',icon:'👾',name:'Boss Battle',sub:'BOSS FINAL — acerte 5 ou 6',xp:100,badge:'👾 Boss Defeated'}
];
const CONCEITOS={
 'Algoritmo':['Uma sequência organizada de passos para resolver um problema.','Receita: separar ingredientes → misturar → assar.','INÍCIO → ler dado → processar → mostrar resultado → FIM'],
 'Variável':['Um espaço de memória que guarda um valor que pode mudar.','Placar de jogo: 0 → 10 → 20 pontos.','pontos = 10'],
 'Condicional':['Uma estrutura que escolhe caminhos conforme uma condição.','Se estiver chovendo, levar guarda-chuva.','if distancia < 20:\n    virar_direita()'],
 'Repetição':['Executa uma ação várias vezes.','Dar 5 voltas na quadra.','for i in range(5):\n    avancar()'],
 'Sensor':['Transforma uma característica do ambiente em dado.','Ultrassônico mede distância; umidade mede o solo.','distancia = ler_sensor()'],
 'Entrada → Processamento → Saída':['Modelo básico de muitos sistemas computacionais.','Botão → regra → LED.','ler → decidir → agir']
};
const CENARIOS={
 'Robô encontra obstáculo':{
  blocos:'🟢 INICIAR → 📡 LER distância → ❓ SE distância < 20 → ↪️ VIRAR DIREITA → SENÃO → ⬆️ AVANÇAR',
  pseudo:'INÍCIO\n  leia distancia\n  SE distancia < 20 ENTÃO\n    vire à direita\n  SENÃO\n    avance\n  FIMSE\nFIM',
  python:'distancia = ler_sensor()\n\nif distancia < 20:\n    virar_direita()\nelse:\n    avancar()'},
 'Placar do jogo':{
  blocos:'🟢 INICIAR → 📦 pontos = 0 → ⭐ ACERTOU → ➕ pontos = pontos + 10 → 🖥️ MOSTRAR pontos',
  pseudo:'INÍCIO\n  pontos <- 0\n  SE acertou ENTÃO\n    pontos <- pontos + 10\n  FIMSE\n  mostre pontos\nFIM',
  python:'pontos = 0\n\nif acertou:\n    pontos += 10\n\nprint(pontos)'},
 'Irrigação inteligente':{
  blocos:'🟢 INICIAR → 🌱 LER umidade → 🌧️ LER chuva → ❓ SE umidade < 35 E não chove → 💧 IRRIGAR',
  pseudo:'INÍCIO\n  leia umidade\n  leia chuva\n  SE umidade < 35 E chuva = falso ENTÃO\n    ligue irrigação\n  SENÃO\n    desligue irrigação\n  FIMSE\nFIM',
  python:'umidade = ler_umidade()\nchuva = ler_chuva()\n\nif umidade < 35 and not chuva:\n    irrigar()\nelse:\n    desligar_irrigacao()'}
};
const CYBER={
 'Você recebe um link dizendo que ganhou um prêmio e precisa informar a senha.':['Não clicar e verificar a origem da mensagem.','Compartilhar rapidamente para não perder o prêmio.','Não clicar e verificar a origem da mensagem.'],
 'Um colega pede seu código de verificação recebido por SMS.':['Não compartilhar o código.','Enviar o código apenas para amigos.','Não compartilhar o código.'],
 'Um vídeo mostra uma autoridade dizendo algo muito estranho.':['Verificar outras fontes e considerar manipulação/deepfake.','Acreditar porque está em vídeo.','Verificar outras fontes e considerar manipulação/deepfake.']
};
const BOSS=[
 ['Uma variável serve principalmente para:',['Guardar um valor','Desenhar um robô','Ligar a internet','Apagar o programa'],'Guardar um valor'],
 ['Qual estrutura toma decisões?',['Condicional','Comentário','Cor','Fonte'],'Condicional'],
 ["Se distância = 12 e a regra é 'se distância < 20, vire', o robô deve:",['Virar','Parar para sempre','Ignorar o sensor','Apagar a variável'],'Virar'],
 ['Qual representa repetição?',['for','if','print','input'],'for'],
 ['Um sensor ultrassônico fornece principalmente:',['Distância','Cor da tela','Senha','Nome do usuário'],'Distância'],
 ['Em um sistema de irrigação, uma variável útil é:',['Umidade do solo','Cor do teclado','Tamanho da fonte','Nome do arquivo apenas'],'Umidade do solo']
];
const DEFAULT_PROFILE={titulo:'Maker Quest — Jornada STEAM',escola:'Colégio Estadual Júlia Wanderley',turma:'Programação e Robótica',professor:'Prof. João Faustino Junior'};
let state=JSON.parse(localStorage.getItem('makerQuestStandaloneV1')||'null')||{xp:0,badges:[],done:[],sound:true,comfort:false,profile:{...DEFAULT_PROFILE}};
state.profile={...DEFAULT_PROFILE,...(state.profile||{})};
let current=null, selected=null, seq=[], deferredPrompt=null;
const save=()=>localStorage.setItem('makerQuestStandaloneV1',JSON.stringify(state));
const rank=x=>{let r=RANKS[0][1];RANKS.forEach(([t,n])=>{if(x>=t)r=n});return r};
const level=x=>Math.floor(x/100)+1;
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)}
function speak(t){if(!state.sound)return toast('Som está desligado.');if(!('speechSynthesis'in window))return toast('Leitura em voz alta indisponível.');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[\n*_#]/g,' '));u.lang='pt-BR';u.rate=.96;speechSynthesis.speak(u)}
function award(badge,amount){if(!badge||state.badges.includes(badge))return false;state.badges.push(badge);state.xp+=amount;save();return true}
function markDone(id){if(!state.done.includes(id)){state.done.push(id);save()}}
function updateHeader(){
 $('#xp').textContent=state.xp;$('#rank').textContent=rank(state.xp);$('#level').textContent='LV '+String(level(state.xp)).padStart(2,'0');
 $('#xpBar').style.width=(state.xp%100)+'%';$('#doneCount').textContent=state.done.length+'/8 missões';
 $('#brandTitle').textContent=state.profile.titulo.replace(' — Jornada STEAM','');$('#brandSub').textContent=state.profile.turma+' • '+state.profile.professor;
 document.body.classList.toggle('mq-comfort',!!state.comfort);$('#comfortApp').classList.toggle('on',!!state.comfort);
}
function showView(id){$$('.mq-view').forEach(v=>v.classList.remove('active'));$(id).classList.add('active');scrollTo({top:0,behavior:'smooth'})}
function renderHome(){
 updateHeader();const g=$('#missionGrid');g.innerHTML='';
 MISSIONS.forEach((m,i)=>{const b=document.createElement('button'),done=state.done.includes(m.id),got=m.badge&&state.badges.includes(m.badge);b.className='mq-mission';
  b.innerHTML='<span class="check">'+(done?'✅':'')+'</span><span class="icon">'+m.icon+'</span><b>'+(i+1)+'. '+m.name+'</b><small>'+m.sub+'</small><span class="xp">'+(m.xp?'+'+m.xp+' XP':'Exploração')+'</span><span class="badgeDot">'+(got?'🏅':'')+'</span>';
  b.onclick=()=>openMission(m.id);g.appendChild(b)});
 const n=state.done.length;$('#raiHomeText').textContent=n===0?'Olá, Explorador! Comece pela Code Arena ou escolha uma missão para experimentar.':n===8?'Campanha concluída! Você pode repetir qualquer missão para praticar sem perder seu progresso.':'Muito bem! Você concluiu '+n+' de 8 missões. Continue experimentando.';
}
function renderBadges(){
 const cards=MISSIONS.filter(m=>m.badge).map(m=>'<div class="mq-badge '+(state.badges.includes(m.badge)?'':'off')+'"><div class="ico">'+m.icon+'</div><b>'+m.badge.replace(/^.\s/,'')+'</b><small>'+(state.badges.includes(m.badge)?'Conquistada':'Ainda não conquistada')+'</small></div>').join('');
 $('#badgesGrid').innerHTML=cards;showView('#badgesView')
}
function missionMeta(id){return {
 code:['Code Arena','A mesma lógica representada em blocos, pseudocódigo e Python.'],
 var:['Variáveis — Variable Vault','Experimente nomes, tipos, valores e transformações.'],
 robot:['Robótica','Use dados de sensores e condicionais para prever uma ação.'],
 algo:['Algoritmos','F avança, D gira à direita e E gira à esquerda. Leve o robô até a estrela.'],
 agro:['Agro Quest','Combine umidade do solo e chuva para controlar a irrigação.'],
 data:['Data Lab','Analise telemetria e transforme leituras em alertas.'],
 cyber:['Cyber Shield','Tome decisões seguras diante de situações digitais.'],
 boss:['Boss Battle','Acerte pelo menos 5 das 6 questões para derrotar o Boss.']
}[id]}
function raiIntro(id){return {
 code:'Compare as três representações. A lógica é a mesma; o que muda é a forma de escrever.',
 var:'Uma variável é como uma caixa com nome. Você pode mudar o conteúdo sem perder a identificação.',
 robot:'Leia os sensores primeiro. Depois percorra as condições na ordem em que aparecem.',
 algo:'Planeje antes de executar. Um bom algoritmo é uma sequência clara de passos.',
 agro:'A irrigação só liga quando o solo está seco e não está chovendo.',
 data:'Não olhe só um número. Compare média, amplitude, umidade e bateria.',
 cyber:'Pare, verifique a origem e proteja seus dados antes de agir.',
 boss:'Use tudo o que treinou. Para vencer, você precisa de 5 ou 6 acertos.'
}[id]}
function openMission(id){
 current=id;selected=null;const i=MISSIONS.findIndex(m=>m.id===id),meta=missionMeta(id);$('#missionNumber').textContent='MISSÃO '+(i+1);$('#missionTitle').textContent=MISSIONS[i].icon+' '+meta[0];$('#missionIntro').textContent=meta[1];$('#raiMissionText').textContent=raiIntro(id);renderMission(id);showView('#missionView')
}
function setRai(t,voice=false){$('#raiMissionText').textContent=t;if(voice)speak(t)}
function result(html,kind=''){let e=$('#missionContent .mq-result');if(!e){e=document.createElement('div');e.className='mq-result';$('#missionContent').appendChild(e)}e.className='mq-result '+kind;e.innerHTML=html}
function choiceButtons(box,opts){box.innerHTML='';opts.forEach(o=>{const b=document.createElement('button');b.className='mq-choice';b.textContent=o;b.onclick=()=>{selected=o;[...box.children].forEach(x=>x.classList.toggle('selected',x===b))};box.appendChild(b)})}
function renderMission(id){selected=null;if(id==='code')renderCode();if(id==='var')renderVar();if(id==='robot')renderRobot();if(id==='algo')renderAlgo();if(id==='agro')renderAgro();if(id==='data')renderData();if(id==='cyber')renderCyber();if(id==='boss')renderBoss()}
function renderCode(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Escolha um cenário e observe como a mesma lógica aparece em três linguagens.</div><div class="mq-field"><label>Cenário</label><select id="codeScenario">'+Object.keys(CENARIOS).map(x=>'<option>'+x+'</option>').join('')+'</select></div><div id="codeCards" class="mq-code-grid" style="margin-top:10px"></div><div class="mq-actions"><button id="codeDone" class="mq-primary">✓ Marcar como explorada</button></div>';
 const draw=()=>{const x=CENARIOS[$('#codeScenario').value];$('#codeCards').innerHTML='<div class="mq-code-card blocks"><h4>🧩 Blocos</h4>'+x.blocos+'</div><div class="mq-code-card"><h4>📋 Pseudocódigo</h4><pre>'+x.pseudo+'</pre></div><div class="mq-code-card"><h4>🐍 Python</h4><pre>'+x.python+'</pre></div>'};$('#codeScenario').onchange=draw;draw();$('#codeDone').onclick=()=>{markDone('code');result('✅ <b>Code Arena explorada.</b><br>A mesma lógica pode ser representada de formas diferentes.','good');setRai('Excelente. Você percebeu que blocos, pseudocódigo e Python podem descrever o mesmo algoritmo.',true);renderHome()}
}
function renderVar(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Crie uma variável e aplique uma transformação.</div><div class="mq-field-grid"><div class="mq-field"><label>Nome</label><input id="vName" value="pontos"></div><div class="mq-field"><label>Tipo</label><select id="vType"><option>Número</option><option>Texto</option><option>Lógico</option></select></div><div class="mq-field"><label>Valor</label><input id="vValue" value="10"></div><div class="mq-field"><label>Operação</label><select id="vOp"></select></div></div><div class="mq-actions"><button id="vRun" class="mq-primary">▶ EXECUTAR</button></div>';
 const ops=()=>{const t=$('#vType').value,arr=t==='Número'?['+1','-1','×2']:t==='Texto'?['MAIÚSCULAS','Adicionar !']:['INVERTER'];$('#vOp').innerHTML=arr.map(x=>'<option>'+x+'</option>').join('')};$('#vType').onchange=ops;ops();
 $('#vRun').onclick=()=>{let n=($('#vName').value||'valor').trim().replace(/\s+/g,'_'),t=$('#vType').value,v=$('#vValue').value,o=$('#vOp').value,detail='',code='';if(t==='Número'){let num=Number(v);if(!Number.isFinite(num))return result('⚠️ Digite um número válido.','bad');let before=num;if(o==='+1')num++;else if(o==='-1')num--;else num*=2;detail=before+' → '+num;code=n+' = '+num}else if(t==='Texto'){let nv=o==='MAIÚSCULAS'?String(v).toUpperCase():String(v)+'!';detail='"'+v+'" → "'+nv+'"';code=n+' = "'+nv+'"'}else{let bv=['true','verdadeiro','1','sim','yes'].includes(String(v).toLowerCase());if(o==='INVERTER')bv=!bv;detail='valor lógico = '+bv;code=n+' = '+bv}const won=award('📦 Mestre das Variáveis',40);markDone('var');result('<b>📦 Caixa de memória</b><br>Nome: <code>'+n+'</code><br>Tipo: '+t+'<br>Transformação: '+detail+'<pre>'+code+'</pre>'+(won?'🏅 +40 XP — conquista desbloqueada!':'✅ Missão já concluída.'),'good');setRai('Você mudou o valor guardado mantendo o nome da variável. Isso é a essência da variável.',true);renderHome()}
}
function renderRobot(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Regra: se distância &lt; 20 → VIRAR À DIREITA; senão, se luz &lt; 30 → ACENDER LED; senão → AVANÇAR.</div><div class="mq-field-grid"><div class="mq-field"><label>Distância: <b id="dVal">30</b> cm</label><input id="distance" type="range" min="0" max="100" value="30"></div><div class="mq-field"><label>Luminosidade: <b id="lVal">70</b>%</label><input id="light" type="range" min="0" max="100" value="70"></div></div><div id="robotChoices" class="mq-choice-grid"></div><div class="mq-actions"><button id="robotTest" class="mq-primary">🤖 TESTAR</button></div>';
 $('#distance').oninput=e=>$('#dVal').textContent=e.target.value;$('#light').oninput=e=>$('#lVal').textContent=e.target.value;choiceButtons($('#robotChoices'),['VIRAR À DIREITA','ACENDER LED','AVANÇAR']);$('#robotTest').onclick=()=>{if(!selected)return result('Escolha o que o robô fará.','bad');const d=+$('#distance').value,l=+$('#light').value,correct=d<20?'VIRAR À DIREITA':l<30?'ACENDER LED':'AVANÇAR';if(selected===correct){const won=award('🤖 Piloto de Robô',50);markDone('robot');result('✅ <b>Decisão correta: '+correct+'</b><br><code>distância &lt; 20 → '+(d<20)+'</code><br><code>luz &lt; 30 → '+(l<30)+'</code><br>'+(won?'🏅 +50 XP!':'✅ Conquista já registrada.'),'good');setRai('Correto. Você leu o sensor e percorreu a condicional na ordem certa.',true);renderHome()}else{result('❌ A ação correta seria <b>'+correct+'</b>.','bad');setRai('Quase. Lembre que a primeira condição verdadeira encerra a decisão.',true)}}
}
function renderAlgo(){
 seq=[];const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Leve o robô de S até ⭐. Ele começa olhando para cima.</div><div id="grid5" class="mq-grid5"></div><div id="seqBox" class="mq-sequence">Sequência: —</div><div class="mq-command-row"><button data-c="F">⬆️<br>F</button><button data-c="E">↺<br>E</button><button data-c="D">↻<br>D</button><button id="undo">⌫<br>Apagar</button></div><div class="mq-actions" style="justify-content:center"><button id="runAlgo" class="mq-primary">▶ EXECUTAR ALGORITMO</button></div>';drawGrid(4,0,0,[]);$$('[data-c]').forEach(b=>b.onclick=()=>{if(seq.length<30)seq.push(b.dataset.c);$('#seqBox').textContent='Sequência: '+seq.join(', ')});$('#undo').onclick=()=>{seq.pop();$('#seqBox').textContent='Sequência: '+(seq.join(', ')||'—')};$('#runAlgo').onclick=()=>{if(!seq.length)return result('⚠️ Adicione comandos F, D ou E.','bad');let r=4,col=0,d=0,path=[[r,col]],dirs=[[-1,0],[0,1],[1,0],[0,-1]];for(const t of seq.slice(0,30)){if(t==='D')d=(d+1)%4;else if(t==='E')d=(d+3)%4;else{let nr=r+dirs[d][0],nc=col+dirs[d][1];if(nr>=0&&nr<5&&nc>=0&&nc<5){r=nr;col=nc;path.push([r,col])}}}drawGrid(r,col,d,path);if(r===0&&col===4){const won=award('🧭 Mestre dos Algoritmos',70);markDone('algo');result('🏆 <b>MISSÃO CONCLUÍDA!</b> '+(won?'+70 XP':'Conquista já registrada.'),'good');setRai('Seu algoritmo levou o robô até a estrela. Muito bem!',true);renderHome()}else{result('🧩 O robô ainda não chegou à estrela. Ajuste a sequência.','bad');setRai('Dica: a solução padrão tem quatro F, depois D, e mais quatro F.',true)}}
}
function drawGrid(r,c,d,path){const g=$('#grid5'),ar=['↑','→','↓','←'];g.innerHTML='';for(let i=0;i<5;i++)for(let j=0;j<5;j++){const e=document.createElement('div');e.className='mq-cell';if(i===r&&j===c){e.classList.add('robot');e.textContent='🤖'+ar[d]}else if(i===0&&j===4){e.classList.add('goal');e.textContent='⭐'}else if(i===4&&j===0)e.textContent='S';else if(path.some(p=>p[0]===i&&p[1]===j)){e.classList.add('path');e.textContent='•'}g.appendChild(e)}}
function renderAgro(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Regra: umidade &lt; 35% E não chovendo → LIGAR IRRIGAÇÃO; caso contrário → MANTER DESLIGADA.</div><div class="mq-field-grid"><div class="mq-field"><label>Umidade do solo: <b id="uVal">28</b>%</label><input id="humid" type="range" min="0" max="100" value="28"></div><div class="mq-field"><label>Está chovendo?</label><select id="rain"><option value="false">Não</option><option value="true">Sim</option></select></div></div><div id="agroChoices" class="mq-choice-grid"></div><div class="mq-actions"><button id="agroRun" class="mq-primary">💧 PROCESSAR</button></div>';$('#humid').oninput=e=>$('#uVal').textContent=e.target.value;choiceButtons($('#agroChoices'),['LIGAR IRRIGAÇÃO','MANTER DESLIGADA']);$('#agroRun').onclick=()=>{if(!selected)return result('Escolha uma decisão.','bad');const u=+$('#humid').value,r=$('#rain').value==='true',correct=u<35&&!r?'LIGAR IRRIGAÇÃO':'MANTER DESLIGADA';if(selected===correct){const won=award('🌱 Guardião da Horta',50);markDone('agro');result('✅ <b>Decisão correta: '+correct+'</b><br>Umidade: '+u+'% • Chovendo: '+(r?'Sim':'Não')+'<br>'+(won?'🏅 +50 XP!':'✅ Conquista já registrada.'),'good');setRai('Você combinou duas condições para usar água de forma consciente.',true);renderHome()}else{result('❌ A decisão correta seria <b>'+correct+'</b>.','bad');setRai('As duas condições precisam ser verdadeiras: solo abaixo de 35% e ausência de chuva.',true)}}
}
function renderData(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Analise telemetria e identifique alertas pelas regras definidas.</div><div class="mq-field-grid"><div class="mq-field"><label>Temp. 1</label><input id="t1" type="number" value="25"></div><div class="mq-field"><label>Temp. 2</label><input id="t2" type="number" value="26"></div><div class="mq-field"><label>Temp. 3</label><input id="t3" type="number" value="35"></div><div class="mq-field"><label>Umidade: <b id="duVal">25</b>%</label><input id="du" type="range" min="0" max="100" value="25"></div><div class="mq-field"><label>Bateria: <b id="batVal">65</b>%</label><input id="bat" type="range" min="0" max="100" value="65"></div></div><div class="mq-actions"><button id="dataRun" class="mq-primary">📡 ANALISAR</button></div>';$('#du').oninput=e=>$('#duVal').textContent=e.target.value;$('#bat').oninput=e=>$('#batVal').textContent=e.target.value;$('#dataRun').onclick=()=>{const temps=[+$('#t1').value,+$('#t2').value,+$('#t3').value];if(temps.some(x=>!Number.isFinite(x)))return result('⚠️ Informe três temperaturas válidas.','bad');const media=temps.reduce((a,b)=>a+b,0)/3,amp=Math.max(...temps)-Math.min(...temps),u=+$('#du').value,b=+$('#bat').value,alerts=[];if(amp>8)alerts.push('⚠️ Grande variação entre leituras de temperatura.');if(u<30)alerts.push('🌱 Solo seco: avaliar irrigação.');if(b<20)alerts.push('🔋 Bateria crítica.');if(!alerts.length)alerts.push('✅ Leituras dentro das regras definidas.');const won=award('📊 Analista de Dados',50);markDone('data');result('<b>📊 Data Lab</b><br>Temperaturas: '+temps.map(x=>x.toFixed(1)+' °C').join(' • ')+'<br>Média: '+media.toFixed(1)+' °C • Amplitude: '+amp.toFixed(1)+' °C<br>Umidade: '+u+'% • Bateria: '+b+'%<hr>'+alerts.join('<br>')+'<p class="mq-note">Aqui usamos regras sobre dados, não uma IA real. Isso ajuda a diferenciar automação, análise de dados e aprendizado de máquina.</p>'+(won?'🏅 +50 XP!':'✅ Missão já concluída.'),'good');setRai('Você transformou leituras em informação. Interpretar dados é procurar padrões e alertas.',true);renderHome()}
}
function renderCyber(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">Escolha uma situação e tome a decisão mais segura.</div><div class="mq-field"><label>Situação</label><select id="cyScenario">'+Object.keys(CYBER).map(x=>'<option>'+x+'</option>').join('')+'</select></div><div id="cyChoices" class="mq-choice-grid"></div><div class="mq-actions"><button id="cyRun" class="mq-primary">🛡️ VALIDAR</button></div>';const draw=()=>{selected=null;const d=CYBER[$('#cyScenario').value];choiceButtons($('#cyChoices'),[d[0],d[1]])};$('#cyScenario').onchange=draw;draw();$('#cyRun').onclick=()=>{if(!selected)return result('Escolha uma decisão.','bad');const correct=CYBER[$('#cyScenario').value][2];if(selected===correct){const won=award('🛡️ Cyber Guardião',40);markDone('cyber');result('✅ <b>Boa decisão.</b> '+correct+'<br>'+(won?'🏅 +40 XP!':'✅ Conquista já registrada.'),'good');setRai('Muito bem. Segurança digital começa por verificar antes de confiar.',true);renderHome()}else{result('❌ A resposta mais segura seria: <b>'+correct+'</b>','bad');setRai('Na dúvida, não forneça dados, códigos ou senhas. Verifique por outro canal.',true)}}
}
function renderBoss(){
 const c=$('#missionContent');c.innerHTML='<div class="mq-prompt">👾 BOSS FINAL — acerte 5 ou 6.</div><div id="bossQuestions"></div><div class="mq-actions"><button id="bossRun" class="mq-primary">⚔️ ENFRENTAR BOSS</button></div>';const qbox=$('#bossQuestions');BOSS.forEach((q,i)=>{const d=document.createElement('div');d.className='mq-boss-q';d.innerHTML='<b>'+(i+1)+'. '+q[0]+'</b><div class="mq-choice-grid"></div>';q[1].forEach(o=>{const b=document.createElement('button');b.className='mq-choice';b.textContent=o;b.onclick=()=>{d.dataset.answer=o;[...d.querySelectorAll('.mq-choice')].forEach(x=>x.classList.toggle('selected',x===b))};d.querySelector('.mq-choice-grid').appendChild(b)});qbox.appendChild(d)});$('#bossRun').onclick=()=>{const boxes=$$('.mq-boss-q');if(boxes.some(x=>!x.dataset.answer))return result('Responda às seis questões antes de enfrentar o Boss.','bad');let score=0,details=[];boxes.forEach((b,i)=>{const ok=b.dataset.answer===BOSS[i][2];if(ok)score++;details.push((ok?'✅':'❌')+' Questão '+(i+1)+': '+BOSS[i][2])});if(score>=5){const won=award('👾 Boss Defeated',100);markDone('boss');result('<h3>👾 BOSS BATTLE — '+score+'/6</h3>🏆 <b>BOSS DERROTADO!</b> '+(won?'+100 XP':'Boss já derrotado.')+'<br><br>'+details.join('<br>'),'good');setRai('Boss derrotado! Você conectou os conceitos da jornada STEAM.',true);renderHome()}else{result('<h3>👾 BOSS BATTLE — '+score+'/6</h3>⚔️ Acerte pelo menos 5 para derrotar o Boss.<br><br>'+details.join('<br>'),'bad');setRai('Você chegou a '+score+' acertos. Revise as questões marcadas e tente novamente.',true)}}
}
function tipFor(id){return {
 code:'Procure a condição SE. Ela aparece em blocos, pseudocódigo e Python com a mesma função.',
 var:'Para números, experimente +1 ou ×2. Para texto, tente MAIÚSCULAS. Para lógico, use INVERTER.',
 robot:'A primeira condição é distância < 20. Só teste a luz se ela for falsa.',
 algo:'Solução padrão: F,F,F,F,D,F,F,F,F.',
 agro:'Irrigue somente quando umidade < 35 e chuva = falso.',
 data:'Amplitude = maior temperatura − menor temperatura. Acima de 8 °C gera alerta.',
 cyber:'Nunca compartilhe senha ou código de verificação. Conteúdo estranho deve ser checado em outras fontes.',
 boss:'As respostas estão nos conceitos praticados: variável, condicional, sensor, repetição e irrigação.'
}[id]}
function exampleFor(id){return {
 code:'Exemplo: “SE distância < 20, vire; SENÃO, avance” pode ser escrito em blocos ou Python.',
 var:'pontos = 10; depois pontos = pontos + 1; resultado: 11.',
 robot:'distância = 12 cm ativa VIRAR À DIREITA antes de analisar a luz.',
 algo:'F,F,F,F,D,F,F,F,F leva o robô até a estrela.',
 agro:'umidade = 28% e sem chuva → LIGAR IRRIGAÇÃO.',
 data:'24, 25 e 38 °C têm grande amplitude e merecem atenção.',
 cyber:'Se uma mensagem pedir senha para liberar um prêmio, não clique e verifique a origem.',
 boss:'Faça primeiro as questões que você reconhece com segurança e depois revise as restantes.'
}[id]}
function openConceptsModal(){
 $('#modalCard').innerHTML='<h2>🧠 Laboratório de conceitos</h2>'+Object.entries(CONCEITOS).map(([k,v])=>'<div class="mq-concept"><h3>'+k+'</h3><p><b>Conceito:</b> '+v[0]+'</p><p><b>No cotidiano:</b> '+v[1]+'</p><pre>'+v[2]+'</pre></div>').join('')+'<button id="modalClose" class="mq-primary" style="width:100%">Fechar</button>';openModal()
}
function profileModal(){
 const p=state.profile;$('#modalCard').innerHTML='<h2>⚙️ Personalizar missão</h2><div class="mq-field"><label>Título</label><input id="pTitle" value="'+p.titulo+'"></div><div class="mq-field"><label>Escola</label><input id="pSchool" value="'+p.escola+'"></div><div class="mq-field"><label>Turma / componente</label><input id="pClass" value="'+p.turma+'"></div><div class="mq-field"><label>Professor</label><input id="pTeacher" value="'+p.professor+'"></div><div class="mq-actions"><button id="profileSave" class="mq-primary">Salvar</button><button id="profileReset" class="mq-soft">Restaurar padrão</button></div>';openModal();$('#profileSave').onclick=()=>{state.profile={titulo:$('#pTitle').value||DEFAULT_PROFILE.titulo,escola:$('#pSchool').value||DEFAULT_PROFILE.escola,turma:$('#pClass').value||DEFAULT_PROFILE.turma,professor:$('#pTeacher').value||DEFAULT_PROFILE.professor};save();updateHeader();closeModal();toast('Personalização salva')};$('#profileReset').onclick=()=>{state.profile={...DEFAULT_PROFILE};save();updateHeader();closeModal();toast('Padrão restaurado')}
}
function aboutModal(){
 $('#modalCard').innerHTML='<div style="text-align:center"><img src="rai-icon.svg" style="width:130px;border-radius:22px"><h2>Maker Quest</h2></div><p>Aplicativo educativo derivado da experiência original <b>Maker Quest — Jornada STEAM</b>, criada em Google Colab.</p><p>A R.A.I. funciona como tutora: explica, oferece dicas, lê orientações em voz alta e incentiva novas tentativas.</p><p><b>Campanha:</b> Code Arena → Variáveis → Robótica → Algoritmos → AgroTech → Dados → Cyber → Boss.</p><p class="mq-note">Projeto pedagógico: Prof. João Faustino Junior.</p><button id="modalClose" class="mq-primary" style="width:100%">Fechar</button>';openModal()
}
function raiModal(){
 $('#modalCard').innerHTML='<div style="text-align:center"><img src="rai-icon.svg" style="width:150px;border-radius:22px"><h2>🤖 R.A.I.</h2></div><p>Sou a assistente do Maker Quest. Minha função é ajudar você a pensar, não entregar tudo pronto.</p><div class="mq-actions"><button id="raiSpeakAll" class="mq-primary">🔊 Ouvir a R.A.I.</button><button id="modalClose" class="mq-soft">Fechar</button></div>';openModal();$('#raiSpeakAll').onclick=()=>speak('Olá! Eu sou a R.A.I. No Maker Quest, vamos explorar programação, robótica, algoritmos, dados e segurança digital aprendendo por experimentação.')
}
function openModal(){$('#modal').classList.add('show');setTimeout(()=>{const c=$('#modalClose');if(c)c.onclick=closeModal},0)}
function closeModal(){$('#modal').classList.remove('show')}
$('#backHome').onclick=()=>{renderHome();showView('#homeView')};$('#openConcepts').onclick=openConceptsModal;$('#profileBtn').onclick=profileModal;$('#aboutApp').onclick=aboutModal;
$('#raiHomeSpeak').onclick=()=>speak($('#raiHomeText').textContent);$('#raiHomeTip').onclick=()=>{const t='Use a campanha na ordem sugerida, mas você pode abrir qualquer missão conforme a aula.';$('#raiHomeText').textContent=t;speak(t)};
$('#tipBtn').onclick=()=>{const t=tipFor(current);setRai(t,true)};$('#exampleBtn').onclick=()=>{const t=exampleFor(current);setRai(t,true)};$('#speakBtn').onclick=()=>speak($('#raiMissionText').textContent);$('#resetMission').onclick=()=>renderMission(current);
$('#soundApp').onclick=()=>{state.sound=!state.sound;save();$('#soundApp').innerHTML=(state.sound?'🔊':'🔇')+' <span>Som</span>';toast(state.sound?'Som ligado':'Som desligado')};
$('#comfortApp').onclick=()=>{state.comfort=!state.comfort;save();updateHeader();toast(state.comfort?'Modo conforto ligado':'Modo conforto desligado')};
$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
$$('.mq-nav button').forEach(b=>b.onclick=()=>{$$('.mq-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const n=b.dataset.nav;if(n==='home'||n==='missions'){renderHome();showView('#homeView');if(n==='missions')setTimeout(()=>$('#missionGrid').scrollIntoView({behavior:'smooth'}),100)}if(n==='badges')renderBadges();if(n==='rai')raiModal()});
function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true}
function installHelp(){
 const ua=navigator.userAgent||'',ios=/iPad|iPhone|iPod/.test(ua),android=/Android/.test(ua),chrome=/Chrome\//.test(ua)||/CriOS\//.test(ua);
 let steps='';
 if(ios){
   steps='<p><b>No iPhone/iPad:</b></p><ol><li>Toque no botão <b>Compartilhar</b> do Safari.</li><li>Escolha <b>Adicionar à Tela de Início</b>.</li><li>Confirme em <b>Adicionar</b>.</li></ol>';
 }else if(android){
   steps='<p><b>No Android:</b></p><ol><li>Abra o Maker Quest no <b>Chrome</b>.</li><li>Aguarde alguns segundos na página.</li><li>Toque em <b>Instalar</b> no topo do Maker Quest ou em <b>⋮ → Instalar app</b>.</li><li>Confirme a instalação.</li></ol><p class="mq-note"><b>Importante:</b> se aparecer apenas “Adicionar à tela inicial” e o ícone vier com o símbolo do Chrome, isso é um atalho. Atualize a página e procure por <b>Instalar app</b>.</p>';
 }else{
   steps='<p>Abra o menu do navegador e procure por <b>Instalar app</b>, <b>Apps</b> ou <b>Adicionar à tela inicial</b>.</p>';
 }
 $('#modalCard').innerHTML='<div style="text-align:center"><img src="icon-mq-192-v6.png" style="width:96px;border-radius:22px"><h2>📲 Instalar Maker Quest</h2></div>'+steps+'<p class="mq-note">Depois de instalado, o Maker Quest abre como aplicativo e pode funcionar offline após o primeiro carregamento.</p><button id="modalClose" class="mq-primary" style="width:100%">Entendi</button>';
 openModal();
}
function refreshInstallButton(){
 const installed=isStandalone();
 document.body.classList.toggle('pwa-standalone',installed);
 const b=$('#installApp');
 if(b){
   b.style.display='inline-flex';
   if(installed){b.innerHTML='✓ <span>Instalado</span>';b.classList.remove('install');}
   else b.innerHTML='⬇ <span>Instalar</span>';
 }
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;refreshInstallButton()});
async function requestInstall(){
 if(isStandalone())return toast('O Maker Quest já está instalado neste aparelho.');
 if(deferredPrompt){
   deferredPrompt.prompt();
   const choice=await deferredPrompt.userChoice;
   if(choice&&choice.outcome==='accepted')toast('Instalação iniciada!');
   deferredPrompt=null;
   refreshInstallButton();
   return;
 }
 installHelp();
}
$('#installApp').onclick=requestInstall;
window.addEventListener('appinstalled',()=>{toast('Maker Quest instalado!');refreshInstallButton()});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(()=>{}));
$('#soundApp').innerHTML=(state.sound?'🔊':'🔇')+' <span>Som</span>';refreshInstallButton();renderHome();
})();