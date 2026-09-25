(()=>{
'use strict';

const SUPABASE_URL='https://hfryzntefzjlqitpxbxw.supabase.co';
const SUPABASE_KEY='sb_publishable_WmUv7bOqiavIoXYdtKBZKg__hpnqaZq';
const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY,{realtime:{params:{eventsPerSecond:10}}});

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const views=$$('.view');
const PACKS_PT={pp9:'Prova Paraná • Matemática • 9º ano',prog8:'Programação • 8º ano',logic7:'Pensamento Computacional • 7º ano',geo6:'Matemática & Geometria • 6º ano'};
const PACKS_EN={pp9:'Prova Paraná • Mathematics • Grade 9',prog8:'Programming • Grade 8',logic7:'Computational Thinking • Grade 7',geo6:'Mathematics & Geometry • Grade 6'};
const CHALLENGES_PT={0:'Desafio 1',1:'Desafio 2',2:'Desafio 3',3:'Desafio 4',4:'Desafio 5',5:'6. Gato Angular',6:'7. Corredor',7:'8. Cisne',8:'9. Foguete',9:'10. Dragão R.A.I.',10:'11. Gato Espelhado 🎯',11:'12. Corredor Invertido 🎯',12:'13. Cisne Reflexo 🎯',13:'14. Foguete Reverso 🎯'};
const CHALLENGES_EN={0:'Challenge 1',1:'Challenge 2',2:'Challenge 3',3:'Challenge 4',4:'Challenge 5',5:'6. Angular Cat',6:'7. Runner',7:'8. Swan',8:'9. Rocket',9:'10. R.A.I. Dragon',10:'11. Mirrored Cat 🎯',11:'12. Reversed Runner 🎯',12:'13. Reflected Swan 🎯',13:'14. Reverse Rocket 🎯'};
let lang=localStorage.getItem('tangramX1Lang')==='en'?'en':'pt';
let teacherPassword='';
let room={id:'',code:'',teacher:false,pack:'pp9',mode:'pedagogico',nickname:'Você',hostToken:'',playerId:'',playerToken:'',status:'lobby'};
let roomChannel=null,playerChannel=null,startedAt=0,tick=null,countdownBusy=false,quizWrong=0,arenaObserver=null,arenaFinished=false,arenaLoadToken=0;

const show=id=>{views.forEach(v=>v.classList.toggle('show',v.id===id));document.body.classList.toggle('x1-arena-full',id==='arena'&&!room.teacher);try{scrollTo({top:0,behavior:'smooth'})}catch(e){}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const setJoinStatus=(t,bad=false)=>{const el=$('#joinStatus');if(el){el.textContent=t;el.style.color=bad?'#ff9cab':''}};
const fmtDurationMs=ms=>{if(!Number.isFinite(ms)||ms<0)return'—';const s=ms/1000,m=Math.floor(s/60),sec=s-m*60;return String(m).padStart(2,'0')+':'+sec.toFixed(1).padStart(4,'0')};
const elapsedFromArenaStart=t=>{if(!t||!room.startedAt)return'—';return fmtDurationMs(new Date(t).getTime()-new Date(room.startedAt).getTime())};
const tx=(pt,en)=>lang==='en'?en:pt;
const packLabel=k=>(lang==='en'?PACKS_EN:PACKS_PT)[k]||k;
const challengeLabelByIndex=i=>(lang==='en'?CHALLENGES_EN:CHALLENGES_PT)[i]||tx('Desafio '+(i+1),'Challenge '+(i+1));
const setText=(sel,value)=>{const el=$(sel);if(el)el.textContent=value};
function applyLanguage(){
 document.documentElement.lang=lang==='en'?'en':'pt-BR';
 const t=$('#langToggle');if(t){t.textContent=lang==='en'?'PT':'EN';t.title=lang==='en'?'Mudar para Português':'Switch to English'}
 document.title=tx('Tangram X1 — Arena','Tangram X1 — Arena');
 setText('.back',tx('← Tangram','← Tangram'));
 setText('.brand p',tx('Aprenda. Responda. Monte. Vença.','Learn. Answer. Build. Win.'));
 setText('.x1-new',tx('NOVO • TEMPO REAL','NEW • REAL TIME'));
 setText('.x1-hero-tag',tx('Aprenda. Responda. Monte. Vença.','Learn. Answer. Build. Win.'));
 const heroP=$('.x1-hero-copy>p:not(.x1-hero-tag)');if(heroP)heroP.textContent=tx('Crie salas, jogue em tempo real e dispute com seus colegas usando o mesmo desafio.','Create rooms, play in real time and compete with classmates on the same challenge.');
 const chips=$('.x1-hero-chips span');if(chips[0])chips[0].textContent=tx('⚡ Gamer livre','⚡ Open Gamer');if(chips[1])chips[1].textContent=tx('🎓 Pedagógico com senha','🎓 Password-protected Learning');if(chips[2])chips[2].textContent=tx('🏆 Ranking ao vivo','🏆 Live ranking');
 setText('.x1-rai-bubble',tx('Vamos para o X1?','Ready for X1?'));
 const g=$('#createGamerRoom');if(g){g.querySelector('b').textContent=tx('Criar sala Gamer','Create Gamer room');g.querySelector('small').textContent=tx('Qualquer jogador pode criar uma sala, convidar amigos e competir.','Any player can create a room, invite friends and compete.')}
 const j=$('#joinRoom');if(j){j.querySelector('b').textContent=tx('Entrar com código','Join with code');j.querySelector('small').textContent=tx('Entre em uma sala Gamer ou Pedagógica usando o código.','Join a Gamer or Learning room using its code.')}
 const p=$('#createRoom');if(p){p.querySelector('b').textContent=tx('Modo Pedagógico','Learning Mode');p.querySelector('small').textContent=tx('Área do professor • aula, questões, Tangram e acompanhamento.','Teacher area • lesson, questions, Tangram and monitoring.')}
 setText('.portal-note',tx('⚡ Gamer é livre para os alunos. 🎓 Pedagógico exige senha do professor.','⚡ Gamer is open to students. 🎓 Learning Mode requires the teacher password.'));
 setText('#pilotHomeLink',tx('📝 Participou do piloto? Avalie o X1','📝 Joined the pilot? Rate X1'));
 const gs=$('#gamerSetup');if(gs){setText('#gamerSetup .section-head span',tx('MODO GAMER','GAMER MODE'));setText('#gamerSetup .section-head h2',tx('Criar sala','Create room'));setText('#gamerSetup h3',tx('Sua Arena','Your Arena'));const pp=$('#gamerSetup .gamer-setup>p');if(pp)pp.textContent=tx('Crie a sala, compartilhe o código e jogue junto com seus colegas. Quem cria também participa.','Create the room, share the code and play with your classmates. The host also plays.')}
 const gl=$('#gamerSetup label');if(gl[0])gl[0].childNodes[0].nodeValue=tx('Seu apelido','Nickname');if(gl[1])gl[1].childNodes[0].nodeValue=tx('Desafio','Challenge');if(gl[2])gl[2].childNodes[0].nodeValue=tx('Rodadas','Rounds');
 setText('#createGamerOnline',tx('Criar sala Gamer','Create Gamer room'));setText('#gamerCreateStatus',tx('Não é necessária senha.','No password required.'));
 const gate=$('#teacherGate');if(gate){setText('#teacherGate .section-head span',tx('ÁREA RESTRITA','RESTRICTED AREA'));setText('#teacherGate .section-head h2',tx('Modo professor','Teacher mode'));setText('#teacherGate h3',tx('Acesso do professor','Teacher access'));const gp=$('#teacherGate .teacher-gate>p');if(gp)gp.textContent=tx('Digite a senha para acessar as atividades pedagógicas e o controle do professor.','Enter the password to access learning activities and teacher controls.');const lbl=$('#teacherPassword')?.closest('label');if(lbl)lbl.childNodes[0].nodeValue=tx('Senha do professor','Teacher password');setText('#unlockTeacher',tx('Entrar no modo professor','Enter teacher mode'))}
 setText('#teacherSetup .section-head span',tx('PROFESSOR','TEACHER'));setText('#teacherSetup .section-head h2',tx('Criar Arena','Create Arena'));const cls=$('#className')?.closest('label');if(cls)cls.childNodes[0].nodeValue=tx('Nome da turma','Class name');setText('.pedagogical-badge b',tx('Modo Pedagógico','Learning Mode'));setText('.pedagogical-badge small',tx('Aula → questões → Tangram → ranking','Lesson → questions → Tangram → ranking'));
 const cp=$('#contentPack')?.closest('label');if(cp)cp.childNodes[0].nodeValue=tx('Conteúdo','Content');const tc=$('#teacherChallenge')?.closest('label');if(tc)tc.childNodes[0].nodeValue=tx('Desafio Tangram','Tangram challenge');
 setText('#createDemoRoom',tx('Criar sala','Create room'));
 setText('#join .section-head span',tx('ALUNO','PLAYER'));setText('#join .section-head h2',tx('Entrar na Arena','Join the Arena'));const rc=$('#roomCodeInput')?.closest('label');if(rc)rc.childNodes[0].nodeValue=tx('Código da sala','Room code');const nn=$('#nickname')?.closest('label');if(nn)nn.childNodes[0].nodeValue=tx('Seu apelido','Nickname');setText('#joinOnline',tx('Entrar','Join'));
 setText('#copyCode',tx('Copiar código','Copy code'));setText('#startMatch',tx('Começar partida','Start match'));
 setText('#countdown .eyebrow',tx('R.A.I. • ÁRBITRA','R.A.I. • REFEREE'));setText('#countdown h2',tx('Todo mundo pronto?','Everyone ready?'));setText('#countdown p',tx('O mesmo desafio começa para todos.','The same challenge starts for everyone.'));
 setText('#lesson .progress small',tx('Aula','Lesson'));setText('#lesson .kicker',tx('MATEMÁTICA • 9º ANO','MATHEMATICS • GRADE 9'));setText('#lesson h2',tx('Semelhança e proporcionalidade','Similarity and proportionality'));const rs=$('#lesson .rai-says p');if(rs)rs.innerHTML=tx('<b>Vamos por partes.</b> Figuras semelhantes mantêm a mesma forma, mesmo quando mudam de tamanho. O segredo é comparar ângulos correspondentes e a proporção entre os lados.','<b>Let’s go step by step.</b> Similar figures keep the same shape even when their size changes. The key is to compare corresponding angles and the proportion between sides.');const ex=$('#lesson .example');if(ex)ex.innerHTML=tx('<b>Exemplo</b><p>Se um lado de 3 cm passa a medir 6 cm, o fator de ampliação é 2. Os demais lados correspondentes também devem dobrar.</p>','<b>Example</b><p>If a 3 cm side becomes 6 cm, the scale factor is 2. The other corresponding sides must also double.</p>');setText('#lessonDone',tx('Entendi • ir para as questões','Got it • go to questions'));
 setText('#quiz .progress small',tx('Questões','Questions'));setText('#quiz .kicker',tx('QUESTÃO 1 DE 3','QUESTION 1 OF 3'));setText('#quiz h2',tx('Uma figura foi ampliada com fator 2. Um lado que media 4 cm passará a medir:','A figure was enlarged by a factor of 2. A side that measured 4 cm will measure:'));
 setText('#arena .progress small',tx('Arena','Arena'));setText('#results .section-head span',tx('RESULTADO','RESULT'));setText('#results .section-head h2',tx('Pódio da rodada','Round podium'));setText('#openPilotForm',tx('📝 Avaliar o piloto X1','📝 Rate the X1 pilot'));setText('#results [data-home]',tx('Voltar ao portal','Back to portal'));
 setText('#pilotForm .section-head span',tx('PILOTO X1 — ARENA TANGRAM','X1 PILOT — TANGRAM ARENA'));setText('#pilotForm .section-head h2',tx('Conte como foi a experiência','Tell us about your experience'));setText('.pilot-intro b',tx('Sua opinião ajuda a evoluir o projeto.','Your feedback helps improve the project.'));const pip=$('.pilot-intro p');if(pip)pip.textContent=tx('O formulário é curto e registra dados do piloto para aperfeiçoar o X1 e documentar seu impacto pedagógico.','This short form records pilot feedback to improve X1 and document its educational impact.');setText('#submitPilotForm',tx('Enviar avaliação','Submit feedback'));
 updateSelectLabels();
 if(room.id&&$('#lobby').classList.contains('show'))openLobby();
}
function updateSelectLabels(){
 const go=$('#gamerChallenge'),to=$('#teacherChallenge');
 const labels=lang==='en'?['🎲 Random • surprise each round','6. Angular Cat','7. Runner','8. Swan','9. Rocket','10. R.A.I. Dragon','11. Mirrored Cat 🎯','12. Reversed Runner 🎯','13. Reflected Swan 🎯','14. Reverse Rocket 🎯']:['🎲 Aleatório • surpresa a cada rodada','6. Gato Angular','7. Corredor','8. Cisne','9. Foguete','10. Dragão R.A.I.','11. Gato Espelhado 🎯','12. Corredor Invertido 🎯','13. Cisne Reflexo 🎯','14. Foguete Reverso 🎯'];
 [go,to].forEach(sel=>{if(!sel)return;[...sel.options].forEach((o,i)=>{if(labels[i])o.textContent=labels[i]})});
 if(to?.options[0])to.options[0].textContent=tx('🤖 Recomendado pela R.A.I. • surpresa','🤖 R.A.I. recommended • surprise');
 const po=$('#contentPack');if(po){[...po.options].forEach(o=>o.textContent=packLabel(o.value))}
}


$('#langToggle')?.addEventListener('click',()=>{lang=lang==='pt'?'en':'pt';localStorage.setItem('tangramX1Lang',lang);applyLanguage()});
$('[data-home]').forEach(b=>b.addEventListener('click',()=>{disconnectRoom();show('home')}));
$('#createGamerRoom').addEventListener('click',()=>show('gamerSetup'));
$('#createRoom').addEventListener('click',()=>{teacherPassword='';$('#teacherPassword').value='';$('#teacherGateStatus').textContent='';show('teacherGate')});
$('#unlockTeacher').addEventListener('click',async()=>{
 const pw=$('#teacherPassword').value;
 const btn=$('#unlockTeacher');const status=$('#teacherGateStatus');
 if(!pw){status.textContent=tx('Digite a senha do professor.','Enter the teacher password.');status.style.color='#ff9cab';return}
 btn.disabled=true;btn.textContent=tx('Verificando…','Checking…');status.textContent='';
 try{
  const {data,error}=await sb.rpc('x1_verify_teacher_password',{p_password:pw});
  if(error)throw error;
  if(!data){status.textContent=tx('Senha incorreta.','Incorrect password.');status.style.color='#ff9cab';return}
  teacherPassword=pw;$('#teacherPassword').value='';status.textContent='';show('teacherSetup');
 }catch(e){status.textContent=tx('Não foi possível validar a senha.','Could not validate the password.');status.style.color='#ff9cab'}
 finally{btn.disabled=false;btn.textContent=tx('Entrar no modo professor','Enter teacher mode')}
});
$('#teacherPassword').addEventListener('keydown',e=>{if(e.key==='Enter')$('#unlockTeacher').click()});
$('#joinRoom').addEventListener('click',()=>show('join'));

async function createRoom(){
 if(!sb)return alert(tx('Realtime indisponível neste navegador.','Realtime is unavailable in this browser.'));
 const btn=$('#createDemoRoom');btn.disabled=true;btn.textContent=tx('Criando sala…','Creating room…');
 try{
  if(!teacherPassword){alert(tx('Acesso do professor expirou. Digite a senha novamente.','Teacher access expired. Enter the password again.'));show('teacherGate');return}
  const args={
   p_teacher_password:teacherPassword,
   p_class_name:$('#className').value.trim()||tx('Turma X1','X1 Class'),
   p_mode:'pedagogico',
   p_content_pack:$('#contentPack').value,
   p_question_count:Number($('#questionCount').value)||3,
   p_round_count:Number($('#roundCount').value)||1,
   p_penalty_enabled:!!$('#penalty').checked,
   p_challenge:$('#teacherChallenge').value
  };
  const {data,error}=await sb.rpc('x1_create_room_secure',args);
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error(tx('Sala não criada.','Room was not created.'));
  room={id:x.room_id,code:x.code,teacher:true,isHost:true,pack:args.p_content_pack,mode:'pedagogico',nickname:'Professor',hostToken:x.host_token,playerId:'',playerToken:'',status:'lobby'};
  sessionStorage.setItem('tangramX1Host',JSON.stringify(room));
  await subscribeRoom();
  await fetchRoom();
  await openLobby();
 }catch(e){alert(tx('Não foi possível criar a sala: ','Could not create the room: ')+(e.message||e))}
 finally{btn.disabled=false;btn.textContent=tx('Criar sala','Create room')}
}
async function createGamerRoom(){
 if(!sb)return;
 const nickname=$('#gamerNickname').value.trim();
 const rounds=Number($('#gamerRounds').value)||1;
 const challenge=$('#gamerChallenge').value||'random';
 const status=$('#gamerCreateStatus'),btn=$('#createGamerOnline');
 if(!nickname){status.textContent=tx('Informe um apelido.','Enter a nickname.');status.style.color='#ff9cab';return}
 btn.disabled=true;btn.textContent=tx('Criando sala…','Creating room…');status.textContent=tx('Conectando à Arena…','Connecting to the Arena…');status.style.color='';
 try{
  const {data,error}=await sb.rpc('x1_create_gamer_room',{p_nickname:nickname,p_round_count:rounds,p_challenge:challenge});
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error('Sala não criada.');
  room={id:x.room_id,code:x.code,teacher:false,isHost:true,pack:'gamer',mode:'gamer',nickname,hostToken:x.host_token,playerId:x.player_id,playerToken:x.player_token,status:'lobby'};
  sessionStorage.setItem('tangramX1Player',JSON.stringify(room));
  sessionStorage.removeItem('tangramX1Host');
  await subscribeRoom();await fetchRoom();await openLobby();
 }catch(e){status.textContent=tx('Não foi possível criar a sala: ','Could not create the room: ')+(e.message||e);status.style.color='#ff9cab'}
 finally{btn.disabled=false;btn.textContent=tx('Criar sala Gamer','Create Gamer room')}
}
$('#createGamerOnline').addEventListener('click',createGamerRoom);
$('#gamerNickname').addEventListener('keydown',e=>{if(e.key==='Enter')createGamerRoom()});

$('#createDemoRoom').addEventListener('click',createRoom);

async function joinRoom(){
 if(!sb)return setJoinStatus(tx('Realtime indisponível neste navegador.','Realtime is unavailable in this browser.'),true);
 const code=$('#roomCodeInput').value.trim().toUpperCase(),nickname=$('#nickname').value.trim();
 if(!/^RAI-\d{4}$/.test(code)||!nickname)return setJoinStatus(tx('Digite um código no formato RAI-1234 e um apelido.','Enter a code in the RAI-1234 format and a nickname.'),true);
 const btn=$('#joinOnline');btn.disabled=true;btn.textContent=tx('Entrando…','Joining…');setJoinStatus(tx('Conectando à sala…','Connecting to room…'));
 try{
  const {data,error}=await sb.rpc('x1_join_room',{p_code:code,p_nickname:nickname});
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error(tx('Sala não encontrada ou encerrada.','Room not found or already closed.'));
  room={id:x.room_id,code,teacher:false,isHost:false,pack:x.content_pack,mode:x.room_mode,nickname,hostToken:'',playerId:x.player_id,playerToken:x.player_token,status:x.room_status};
  sessionStorage.setItem('tangramX1Player',JSON.stringify(room));
  await subscribeRoom();
  await fetchRoom();
  await openLobby();
  applyRoomState(room.status);
 }catch(e){setJoinStatus(tx('Não foi possível entrar: ','Could not join: ')+(e.message||e),true)}
 finally{btn.disabled=false;btn.textContent=tx('Entrar','Join')}
}
$('#joinOnline').addEventListener('click',joinRoom);

async function fetchRoom(){
 if(!sb||!room.id)return null;
 const {data,error}=await sb.from('x1_rooms').select('id,code,mode,status,class_name,content_pack,question_count,round_count,challenge,current_round,started_at,expires_at').eq('id',room.id).maybeSingle();
 if(error)throw error;
 if(data){room.mode=data.mode;room.pack=data.content_pack;room.status=data.status;room.currentRound=data.current_round||1;room.challenge=data.challenge||'casa';room.startedAt=data.started_at||null}
 return data;
}
async function fetchPlayers(){
 if(!sb||!room.id)return[];
 const {data,error}=await sb.from('x1_players').select('id,nickname,role,ready,quiz_correct,quiz_wrong,quiz_finished_at,tangram_finished_at,total_finished_at,joined_at').eq('room_id',room.id).order('joined_at',{ascending:true});
 if(error)throw error;
 return data||[];
}
async function renderPlayers(){
 let players=[];try{players=await fetchPlayers()}catch(e){}
 const items=[];
 if(room.teacher)items.push({nickname:tx('Professor','Teacher'),role:'teacher',id:'host'});
 for(const p of players)items.push(p);
 $('#players').innerHTML=items.map(p=>'<div class="player '+(p.role==='teacher'?'teacher ':'')+(p.id===room.playerId?'me':'')+'"><b>'+esc(p.nickname)+(p.id===room.playerId?' • você':'')+'</b><small>'+(p.role==='teacher'?'Professor • anfitrião':(p.id===room.playerId&&room.isHost)?'Anfitrião • pronto ✓':p.tangram_finished_at?'Concluiu 🏁':p.quiz_finished_at?'Etapa pedagógica ✓':'Pronto ✓')+'</small></div>').join('');
 $('#lobbyCount').textContent=items.length+' '+(items.length===1?tx('participante','participant'):tx('participantes','participants'))+tx(' na sala',' in the room');
}
async function openLobby(){
 $('#roomCode').textContent=room.code;
 const pedagogico=room.mode==='pedagogico';
 $('#lobbyModeLabel').textContent=pedagogico?tx('MODO PEDAGÓGICO','LEARNING MODE'):tx('MODO GAMER','GAMER MODE');
 const challengeLabel=room.challenge==='random'?tx('🎲 Desafio surpresa • igual para todos','🎲 Surprise challenge • same for everyone'):(challengeLabelByIndex(Number(room.challenge))||tx('Desafio selecionado','Selected challenge'));
 $('#lobbyPack').textContent=pedagogico?packLabel(room.pack)+' • '+challengeLabel:challengeLabel;
 $('#lobbyModeText').textContent=pedagogico?tx('Aula e questões vêm primeiro. Depois, cada aluno libera o mesmo desafio de Tangram.','Lesson and questions come first. Then every player unlocks the same Tangram challenge.'):tx('Sem etapa didática: contagem regressiva, Tangram e ranking.','No lesson stage: countdown, Tangram and ranking.');
 $('#startMatch').style.display=room.isHost?'block':'none';
 const lobbyNote=document.querySelector('.lobby-title small');if(lobbyNote)lobbyNote.textContent=room.isHost?tx('Você controla o início da partida','You control the match start'):tx('Aguardando o anfitrião iniciar','Waiting for the host to start');
 await renderPlayers();
 show('lobby');
}
async function subscribeRoom(){
 disconnectSubscriptions();
 const roomFilter='id=eq.'+room.id,playerFilter='room_id=eq.'+room.id;
 roomChannel=sb.channel('x1-room-'+room.id)
  .on('postgres_changes',{event:'UPDATE',schema:'public',table:'x1_rooms',filter:roomFilter},payload=>{
    if(payload.new){room.status=payload.new.status;room.mode=payload.new.mode;room.pack=payload.new.content_pack;room.startedAt=payload.new.started_at||null;room.currentRound=payload.new.current_round||room.currentRound||1;applyRoomState(payload.new.status)}
  })
  .subscribe();
 playerChannel=sb.channel('x1-players-'+room.id)
  .on('postgres_changes',{event:'*',schema:'public',table:'x1_players',filter:playerFilter},()=>{renderPlayers();updateRaceFeed();if($('#results').classList.contains('show'))renderResults()})
  .subscribe();
}
function disconnectSubscriptions(){
 try{if(roomChannel)sb?.removeChannel(roomChannel)}catch(e){}try{if(playerChannel)sb?.removeChannel(playerChannel)}catch(e){}
 roomChannel=playerChannel=null;
}
function stopArenaObserver(){try{arenaObserver?.disconnect()}catch(e){}arenaObserver=null}
function resetArenaFrame(){arenaLoadToken++;stopArenaObserver();arenaFinished=false;const f=$('#tangramArenaFrame');if(f){try{f.src='about:blank'}catch(e){}}}
function disconnectRoom(){disconnectSubscriptions();clearInterval(tick);countdownBusy=false;resetArenaFrame()}

$('#copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(room.code);$('#copyCode').textContent=tx('Copiado ✓','Copied ✓');setTimeout(()=>$('#copyCode').textContent=tx('Copiar código','Copy code'),1300)}catch(e){}});

$('#startMatch').addEventListener('click',async()=>{
 if(!room.isHost||!room.hostToken)return;
 const b=$('#startMatch');b.disabled=true;b.textContent=tx('Iniciando…','Starting…');
 try{
  const {data,error}=await sb.rpc('x1_start_room',{p_code:room.code,p_host_token:room.hostToken});
  if(error)throw error;if(!data)throw new Error(tx('A sala não pôde ser iniciada.','The room could not be started.'));
  runCountdown(true);
 }catch(e){alert(e.message||e);b.disabled=false;b.textContent=tx('Começar partida','Start match')}
});

function runCountdown(hostAdvances=false){
 if(countdownBusy)return;countdownBusy=true;show('countdown');
 let n=3;$('#countNum').textContent=n;
 const t=setInterval(async()=>{
  n--;
  if(n>0){$('#countNum').textContent=n;return}
  clearInterval(t);$('#countNum').textContent=tx('VALENDO!','GO!');
  if(hostAdvances&&room.isHost){
   setTimeout(async()=>{
    const next=room.mode==='pedagogico'?'lesson':'playing';
    try{await sb.rpc('x1_set_room_status',{p_code:room.code,p_host_token:room.hostToken,p_status:next})}catch(e){}
    countdownBusy=false;
   },600);
  }else setTimeout(()=>{countdownBusy=false},900);
 },700);
}
function applyRoomState(status){
 room.status=status;
 if(status==='lobby'){openLobby();return}
 if(status==='countdown'){runCountdown(false);return}
 if(status==='lesson'){if(room.mode==='pedagogico')show('lesson');else startArena();return}
 if(status==='quiz'){if(room.mode==='pedagogico')show('quiz');return}
 if(status==='playing'){startArena();return}
 if(status==='results'){renderResults();return}
}
$('#lessonDone').addEventListener('click',()=>show('quiz'));

$$('[data-answer]').forEach(b=>b.addEventListener('click',async()=>{
 const ok=b.dataset.answer==='2';$$('[data-answer]').forEach(x=>x.classList.remove('correct','wrong'));b.classList.add(ok?'correct':'wrong');
 if(!ok){quizWrong++;$('#quizFeedback').textContent=tx('Ainda não. Pense: fator 2 significa multiplicar a medida original por 2.','Not yet. Think: a factor of 2 means multiplying the original measure by 2.');return}
 $('#quizFeedback').textContent=tx('✓ Isso! O fator 2 dobra a medida. Arena liberada.','✓ Correct! A factor of 2 doubles the measure. Arena unlocked.');
 if(room.playerId&&room.playerToken){
  try{await sb.rpc('x1_submit_quiz',{p_player_id:room.playerId,p_player_token:room.playerToken,p_correct:1,p_wrong:quizWrong})}catch(e){}
 }
 setTimeout(startArena,700);
}));

async function updateRaceFeed(){
 const feed=$('#raceFeed');if(!feed||!room.id)return;
 try{
  const players=await fetchPlayers(),done=players.filter(p=>p.tangram_finished_at);
  if(!players.length){feed.innerHTML='<span>'+tx('🏁 Aguardando jogadores.','🏁 Waiting for players.')+'</span>';return}
  if(!done.length){feed.innerHTML='<span>'+tx('🏁 Todos receberam o mesmo desafio.','🏁 Everyone received the same challenge.')+'</span><strong>0/'+players.length+' '+tx('concluíram','finished')+'</strong>';return}
  const last=done.sort((a,b)=>new Date(a.tangram_finished_at)-new Date(b.tangram_finished_at)).at(-1);
  feed.innerHTML='<span>🏁 '+esc(last.nickname)+' '+tx('concluiu.','finished.')+'</span><strong>'+done.length+'/'+players.length+' '+tx('concluíram','finished')+'</strong>';
 }catch(e){}
}

function roomHash(){
 const src=(room.code||room.id||'RAI-X1')+'|'+(room.currentRound||1);
 let h=2166136261;
 for(let i=0;i<src.length;i++){h^=src.charCodeAt(i);h=Math.imul(h,16777619)}
 return Math.abs(h>>>0);
}
function arenaChallengeIndex(){
 const fixed=Number(room.challenge);
 if(room.challenge!=='random'&&Number.isInteger(fixed)&&fixed>=0&&fixed<=13)return fixed;
 return roomHash()%14;
}
function arenaChallengeLabel(){
 const i=arenaChallengeIndex();
 return challengeLabelByIndex(i);
}

function styleArenaDocument(doc){
 if(doc.getElementById('x1ArenaStyle'))return;
 const s=doc.createElement('style');s.id='x1ArenaStyle';
 s.textContent=`
 html,body{background:#06111c!important}
 body{margin:0!important;padding:0!important}
 #tangram-levels{max-width:none!important;margin:0 auto!important}
 #tangram-levels .tl-brand{display:none!important}
 #tangram-levels #levels{display:none!important}
 #tangram-levels .tl-about-overlay{display:none!important}
 #tangram-levels .tl-game{margin-top:0!important}
 `;
 doc.head.appendChild(s);
}

function wireArenaFrame(frame,token){
 let tries=0;
 const attempt=()=>{
  if(token!==arenaLoadToken)return;
  tries++;
  try{
   const win=frame.contentWindow,doc=frame.contentDocument;
   if(!win||!doc)throw new Error('frame');
   const root=doc.getElementById('tangram-levels'),msg=doc.getElementById('msg');
   if(!root||!msg){if(tries<50)setTimeout(attempt,180);return}
   styleArenaDocument(doc);
   try{doc.documentElement.classList.add('x1-embed');doc.body.classList.add('x1-embed')}catch(e){}
   const bridge=win.__raiTangramBonusBridge;
   if(bridge?.open){
    bridge.open(arenaChallengeIndex());
    const enterGamer=()=>{try{const g=win.__raiGamerOfficial;if(g?.enterInstant){g.enterInstant();return true}if(g?.enter){g.enter();return true}}catch(e){}return false};
    if(!enterGamer())setTimeout(enterGamer,220);
    setTimeout(()=>{try{doc.querySelector('#board')?.scrollIntoView({block:'center'})}catch(e){}},220);
   }else if(tries<50){setTimeout(attempt,180);return}
   $('#arenaLoader').hidden=true;
   frame.style.display='block';
   stopArenaObserver();
   arenaObserver=new MutationObserver(()=>{
    const text=(msg.textContent||'').replace(/\s+/g,' ').trim();
    if(/miss[aã]o conclu[ií]da|challenge completed/i.test(text))onTangramComplete(text);
   });
   arenaObserver.observe(msg,{subtree:true,childList:true,characterData:true});
  }catch(e){if(tries<50)setTimeout(attempt,180);else{$('#arenaLoader').innerHTML='<b>'+tx('Não foi possível abrir o motor do Tangram.','Could not open the Tangram engine.')+'</b><small>'+tx('Recarregue a página e tente novamente.','Reload the page and try again.')+'</small>'}}
 };
 attempt();
}

async function prepareTangramArena(){
 const frame=$('#tangramArenaFrame'),loader=$('#arenaLoader'),spectator=$('#spectatorCard'),role=$('#arenaRole');
 stopArenaObserver();arenaFinished=false;
 if(room.teacher){
  frame.style.display='none';loader.hidden=true;spectator.hidden=false;role.textContent=tx('Professor • acompanhamento','Teacher • monitoring');
  await updateRaceFeed();return;
 }
 spectator.hidden=true;loader.hidden=false;frame.style.display='none';role.textContent=(room.nickname||tx('Jogador','Player'))+tx(' • competidor',' • competitor');
 loader.innerHTML='<div class="spinner"></div><b>'+tx('Preparando o mesmo desafio para todos…','Preparing the same challenge for everyone…')+'</b><small>'+tx('Motor oficial do Tangram Educativo.','Official Tangram Educativo engine.')+'</small>';
 const token=++arenaLoadToken;
 frame.onload=()=>wireArenaFrame(frame,token);
 frame.src='../tangram-prof-junior-v12/?x1=1&expanded=1&gamer=1&lang='+lang+'&round='+(room.currentRound||1)+'&t='+(Date.now());
}

async function onTangramComplete(message){
 if(arenaFinished||room.teacher)return;arenaFinished=true;stopArenaObserver();clearInterval(tick);tick=null;
 $('#raceFeed').innerHTML='<span>'+tx('🏁 Encaixe correto! Registrando sua chegada…','🏁 Correct fit! Recording your finish…')+'</span>';
 try{
  if(room.playerId&&room.playerToken){
   const {data,error}=await sb.rpc('x1_finish_tangram',{p_player_id:room.playerId,p_player_token:room.playerToken});
   if(error)throw error;if(!data)throw new Error(tx('Resultado não registrado.','Result was not recorded.'));
  }
  await updateRaceFeed();
  setTimeout(()=>renderResults(),700);
 }catch(e){arenaFinished=false;$('#raceFeed').textContent=tx('Não foi possível registrar o resultado: ','Could not record the result: ')+(e.message||e)}
}

async function startArena(){
 if($('#arena').classList.contains('show')&&tick)return;
 show('arena');
 const base=room.startedAt?new Date(room.startedAt).getTime():Date.now();
 startedAt=performance.now()-Math.max(0,Date.now()-base);
 clearInterval(tick);
 tick=setInterval(()=>{
  const s=(performance.now()-startedAt)/1000,m=Math.floor(s/60),sec=s-m*60;
  $('#timer').textContent=String(m).padStart(2,'0')+':'+sec.toFixed(1).padStart(4,'0');
 },100);
 const h2=document.querySelector('#arena .arena-head h2');if(h2)h2.textContent=tx('Figura: ','Figure: ')+arenaChallengeLabel();
 $('#raceFeed').innerHTML='<span>'+tx('🏁 Todos receberam o mesmo desafio no Modo Gamer.','🏁 Everyone received the same challenge in Gamer Mode.')+'</span>';
 await prepareTangramArena();
}

async function renderResults(){
 clearInterval(tick);tick=null;
 try{await fetchRoom()}catch(e){}
 let players=[];try{players=await fetchPlayers()}catch(e){}
 const ranked=players.filter(p=>p.tangram_finished_at).sort((a,b)=>new Date(a.tangram_finished_at)-new Date(b.tangram_finished_at));
 const top=ranked.slice(0,3);
 const slots=[
  {sel:'.place.first',rank:0,label:'1º'},
  {sel:'.place.second',rank:1,label:'2º'},
  {sel:'.place.third',rank:2,label:'3º'}
 ];
 for(const s of slots){
  const el=$(s.sel),p=top[s.rank];if(!el)continue;
  el.querySelector('b').textContent=s.label;
  el.querySelector('span').textContent=p?p.nickname:'—';
  el.querySelector('small').textContent=p?elapsedFromArenaStart(p.tangram_finished_at):tx('aguardando','waiting');
 }
 const me=room.teacher?null:players.find(p=>p.id===room.playerId);
 const pedagogico=room.mode==='pedagogico';
 $('#metricPrecisionLabel').textContent=pedagogico?tx('Precisão','Accuracy'):tx('Modo','Mode');
 $('#metricErrorsLabel').textContent=pedagogico?tx('Erros pedagógicos','Learning errors'):tx('Posição','Position');
 if(pedagogico){
  const correct=me?.quiz_correct??0,wrong=me?.quiz_wrong??0,total=correct+wrong;
  $('#metricPrecision').textContent=me?(correct+'/'+Math.max(1,total)+' '+tx('respostas','answers')):tx('Visão do professor','Teacher view');
  $('#metricErrors').textContent=me?String(wrong):'—';
 }else{
  $('#metricPrecision').textContent='Gamer';
  const pos=me?ranked.findIndex(p=>p.id===me.id)+1:0;
  $('#metricErrors').textContent=pos>0?(pos+tx('º lugar',' place')):'—';
 }
 $('#totalTime').textContent=me?.tangram_finished_at?elapsedFromArenaStart(me.tangram_finished_at):(ranked[0]?.tangram_finished_at?elapsedFromArenaStart(ranked[0].tangram_finished_at):'—');
 const rematch=$('#rematch');
 if(room.isHost){rematch.disabled=false;rematch.textContent=tx('Revanche • nova rodada','Rematch • new round')}
 else{rematch.disabled=true;rematch.textContent=tx('Aguardando revanche do anfitrião','Waiting for host rematch')}
 show('results');
}
$('#rematch').addEventListener('click',async()=>{
 if(!room.isHost||!room.hostToken)return;
 const b=$('#rematch');b.disabled=true;b.textContent=tx('Preparando nova rodada…','Preparing new round…');
 try{
  const {data,error}=await sb.rpc('x1_reset_room',{p_code:room.code,p_host_token:room.hostToken});
  if(error)throw error;if(!data)throw new Error(tx('Não foi possível reiniciar a sala.','Could not reset the room.'));
  quizWrong=0;resetArenaFrame();await fetchRoom();await openLobby();
 }catch(e){alert(e.message||e)}
 finally{b.disabled=false;b.textContent=tx('Revanche • nova rodada','Rematch • new round')}
});

const pilotRatings={access:5,visual:5,competition:5,learning:5,concentration:5,again:5};
let pilotReturn='home';
function buildPilotScales(){
 $('.pilot-rating').forEach(block=>{
  const field=block.dataset.field,scale=block.querySelector('.scale');if(!field||!scale)return;
  scale.innerHTML='';
  for(let i=1;i<=5;i++){
   const b=document.createElement('button');b.type='button';b.textContent=i;b.dataset.value=String(i);
   if(i===pilotRatings[field])b.classList.add('active');
   b.addEventListener('click',()=>{pilotRatings[field]=i;scale.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b))});
   scale.appendChild(b);
  }
  const labels=document.createElement('div');labels.className='scale-labels';labels.innerHTML='<span>'+tx('1 • pouco','1 • low')+'</span><span>'+tx('5 • muito','5 • high')+'</span>';scale.after(labels);
 });
}
function openPilotForm(){
 pilotReturn=document.querySelector('.view.show')?.id||'home';
 buildPilotScales();
 const score=$('#pilotScore');if(score){score.value='8';$('#pilotScoreValue').textContent='8/10'}
 $('#pilotStatus').textContent='';
 show('pilotForm');
}
$('#openPilotForm')?.addEventListener('click',openPilotForm);
$('#pilotHomeLink')?.addEventListener('click',openPilotForm);
$('#pilotBack')?.addEventListener('click',()=>show(pilotReturn));
$('#pilotScore')?.addEventListener('input',e=>{$('#pilotScoreValue').textContent=e.target.value+'/10'});

$('#submitPilotForm')?.addEventListener('click',async()=>{
 const grade=$('#pilotGrade').value;
 if(!grade){$('#pilotStatus').textContent=tx('Selecione sua turma ou ano.','Select your grade or class.');$('#pilotStatus').style.color='#ff9cab';return}
 const b=$('#submitPilotForm');b.disabled=true;b.textContent=tx('Enviando…','Sending…');
 $('#pilotStatus').textContent='';$('#pilotStatus').style.color='';
 try{
  const future=$('.pilot-future input:checked').map(x=>x.value);
  const args={
   p_room_id:room.id||null,
   p_room_code:room.code||null,
   p_player_id:room.playerId||null,
   p_nickname:room.nickname||null,
   p_mode:room.mode||null,
   p_grade_level:grade,
   p_device_type:$('#pilotDevice').value,
   p_access_ease:pilotRatings.access,
   p_visual_appeal:pilotRatings.visual,
   p_competition_engagement:pilotRatings.competition,
   p_learning_value:pilotRatings.learning,
   p_concentration:pilotRatings.concentration,
   p_would_play_again:pilotRatings.again,
   p_overall_score:Number($('#pilotScore').value)||0,
   p_favorite_part:$('#pilotFavorite').value.trim()||null,
   p_improvement:$('#pilotImprove').value.trim()||null,
   p_future_challenges:future
  };
  const {data,error}=await sb.rpc('x1_submit_pilot_feedback',args);
  if(error)throw error;
  localStorage.setItem('x1PilotFeedbackLast',JSON.stringify({id:data,at:Date.now()}));
  $('#pilotStatus').textContent=tx('✓ Obrigado! Sua avaliação foi registrada no piloto X1 — Arena Tangram.','✓ Thank you! Your feedback was recorded for the X1 — Tangram Arena pilot.');
  $('#pilotStatus').style.color='#79e6ab';
  b.textContent=tx('Avaliação enviada ✓','Feedback sent ✓');
  setTimeout(()=>show(pilotReturn),1600);
 }catch(e){
  $('#pilotStatus').textContent=tx('Não foi possível enviar agora: ','Could not send now: ')+(e.message||e);
  $('#pilotStatus').style.color='#ff9cab';
  b.disabled=false;b.textContent=tx('Enviar avaliação','Submit feedback');
 }
});

$('#demoStart')?.addEventListener('click',()=>{alert('No Gamer, qualquer aluno pode criar uma sala. O modo Pedagógico continua protegido pela senha do professor.')});

applyLanguage();

(async()=>{
 if(!sb){document.body.classList.add('offline');return}
 try{
  const host=JSON.parse(sessionStorage.getItem('tangramX1Host')||'null');
  const player=JSON.parse(sessionStorage.getItem('tangramX1Player')||'null');
  if(host?.id&&host.isHost===undefined){host.isHost=true;host.teacher=true} if(player?.id&&player.isHost===undefined)player.isHost=false; const saved=host?.id?host:player?.id?player:null;
  if(saved){room=saved;await subscribeRoom();const r=await fetchRoom();if(r){await openLobby();applyRoomState(r.status);return}}
 }catch(e){}
 show('home');
})();
})();