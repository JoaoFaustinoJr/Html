(()=>{
'use strict';

const SUPABASE_URL='https://hfryzntefzjlqitpxbxw.supabase.co';
const SUPABASE_KEY='sb_publishable_WmUv7bOqiavIoXYdtKBZKg__hpnqaZq';
const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY,{realtime:{params:{eventsPerSecond:10}}});

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const views=$$('.view');
const PACKS={pp9:'Prova Paraná • Matemática • 9º ano',prog8:'Programação • 8º ano',logic7:'Pensamento Computacional • 7º ano',geo6:'Matemática & Geometria • 6º ano'};
let teacherPassword='';
let room={id:'',code:'',teacher:false,pack:'pp9',mode:'pedagogico',nickname:'Você',hostToken:'',playerId:'',playerToken:'',status:'lobby'};
let roomChannel=null,playerChannel=null,startedAt=0,tick=null,countdownBusy=false,quizWrong=0,arenaObserver=null,arenaFinished=false,arenaLoadToken=0;

const show=id=>{views.forEach(v=>v.classList.toggle('show',v.id===id));try{scrollTo({top:0,behavior:'smooth'})}catch(e){}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const setJoinStatus=(t,bad=false)=>{const el=$('#joinStatus');if(el){el.textContent=t;el.style.color=bad?'#ff9cab':''}};
const fmtDurationMs=ms=>{if(!Number.isFinite(ms)||ms<0)return'—';const s=ms/1000,m=Math.floor(s/60),sec=s-m*60;return String(m).padStart(2,'0')+':'+sec.toFixed(1).padStart(4,'0')};
const elapsedFromArenaStart=t=>{if(!t||!room.startedAt)return'—';return fmtDurationMs(new Date(t).getTime()-new Date(room.startedAt).getTime())};

$$('[data-home]').forEach(b=>b.addEventListener('click',()=>{disconnectRoom();show('home')}));
$('#createGamerRoom').addEventListener('click',()=>show('gamerSetup'));
$('#createRoom').addEventListener('click',()=>{teacherPassword='';$('#teacherPassword').value='';$('#teacherGateStatus').textContent='';show('teacherGate')});
$('#unlockTeacher').addEventListener('click',async()=>{
 const pw=$('#teacherPassword').value;
 const btn=$('#unlockTeacher');const status=$('#teacherGateStatus');
 if(!pw){status.textContent='Digite a senha do professor.';status.style.color='#ff9cab';return}
 btn.disabled=true;btn.textContent='Verificando…';status.textContent='';
 try{
  const {data,error}=await sb.rpc('x1_verify_teacher_password',{p_password:pw});
  if(error)throw error;
  if(!data){status.textContent='Senha incorreta.';status.style.color='#ff9cab';return}
  teacherPassword=pw;$('#teacherPassword').value='';status.textContent='';show('teacherSetup');
 }catch(e){status.textContent='Não foi possível validar a senha.';status.style.color='#ff9cab'}
 finally{btn.disabled=false;btn.textContent='Entrar no modo professor'}
});
$('#teacherPassword').addEventListener('keydown',e=>{if(e.key==='Enter')$('#unlockTeacher').click()});
$('#joinRoom').addEventListener('click',()=>show('join'));

async function createRoom(){
 if(!sb)return alert('Realtime indisponível neste navegador.');
 const btn=$('#createDemoRoom');btn.disabled=true;btn.textContent='Criando sala…';
 try{
  if(!teacherPassword){alert('Acesso do professor expirou. Digite a senha novamente.');show('teacherGate');return}
  const args={
   p_teacher_password:teacherPassword,
   p_class_name:$('#className').value.trim()||'Turma X1',
   p_mode:'pedagogico',
   p_content_pack:$('#contentPack').value,
   p_question_count:Number($('#questionCount').value)||3,
   p_round_count:Number($('#roundCount').value)||1,
   p_penalty_enabled:!!$('#penalty').checked
  };
  const {data,error}=await sb.rpc('x1_create_room_secure',args);
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error('Sala não criada.');
  room={id:x.room_id,code:x.code,teacher:true,isHost:true,pack:args.p_content_pack,mode:'pedagogico',nickname:'Professor',hostToken:x.host_token,playerId:'',playerToken:'',status:'lobby'};
  sessionStorage.setItem('tangramX1Host',JSON.stringify(room));
  await subscribeRoom();
  await fetchRoom();
  await openLobby();
 }catch(e){alert('Não foi possível criar a sala: '+(e.message||e))}
 finally{btn.disabled=false;btn.textContent='Criar sala'}
}
async function createGamerRoom(){
 if(!sb)return;
 const nickname=$('#gamerNickname').value.trim();
 const rounds=Number($('#gamerRounds').value)||1;
 const status=$('#gamerCreateStatus'),btn=$('#createGamerOnline');
 if(!nickname){status.textContent='Informe um apelido.';status.style.color='#ff9cab';return}
 btn.disabled=true;btn.textContent='Criando sala…';status.textContent='Conectando à Arena…';status.style.color='';
 try{
  const {data,error}=await sb.rpc('x1_create_gamer_room',{p_nickname:nickname,p_round_count:rounds});
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error('Sala não criada.');
  room={id:x.room_id,code:x.code,teacher:false,isHost:true,pack:'gamer',mode:'gamer',nickname,hostToken:x.host_token,playerId:x.player_id,playerToken:x.player_token,status:'lobby'};
  sessionStorage.setItem('tangramX1Player',JSON.stringify(room));
  sessionStorage.removeItem('tangramX1Host');
  await subscribeRoom();await fetchRoom();await openLobby();
 }catch(e){status.textContent='Não foi possível criar a sala: '+(e.message||e);status.style.color='#ff9cab'}
 finally{btn.disabled=false;btn.textContent='Criar sala Gamer'}
}
$('#createGamerOnline').addEventListener('click',createGamerRoom);
$('#gamerNickname').addEventListener('keydown',e=>{if(e.key==='Enter')createGamerRoom()});

$('#createDemoRoom').addEventListener('click',createRoom);

async function joinRoom(){
 if(!sb)return setJoinStatus('Realtime indisponível neste navegador.',true);
 const code=$('#roomCodeInput').value.trim().toUpperCase(),nickname=$('#nickname').value.trim();
 if(!/^RAI-\d{4}$/.test(code)||!nickname)return setJoinStatus('Digite um código no formato RAI-1234 e um apelido.',true);
 const btn=$('#joinOnline');btn.disabled=true;btn.textContent='Entrando…';setJoinStatus('Conectando à sala…');
 try{
  const {data,error}=await sb.rpc('x1_join_room',{p_code:code,p_nickname:nickname});
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error('Sala não encontrada ou encerrada.');
  room={id:x.room_id,code,teacher:false,isHost:false,pack:x.content_pack,mode:x.room_mode,nickname,hostToken:'',playerId:x.player_id,playerToken:x.player_token,status:x.room_status};
  sessionStorage.setItem('tangramX1Player',JSON.stringify(room));
  await subscribeRoom();
  await fetchRoom();
  await openLobby();
  applyRoomState(room.status);
 }catch(e){setJoinStatus('Não foi possível entrar: '+(e.message||e),true)}
 finally{btn.disabled=false;btn.textContent='Entrar'}
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
 if(room.teacher)items.push({nickname:'Professor',role:'teacher',id:'host'});
 for(const p of players)items.push(p);
 $('#players').innerHTML=items.map(p=>'<div class="player '+(p.role==='teacher'?'teacher ':'')+(p.id===room.playerId?'me':'')+'"><b>'+esc(p.nickname)+(p.id===room.playerId?' • você':'')+'</b><small>'+(p.role==='teacher'?'Professor • anfitrião':(p.id===room.playerId&&room.isHost)?'Anfitrião • pronto ✓':p.tangram_finished_at?'Concluiu 🏁':p.quiz_finished_at?'Etapa pedagógica ✓':'Pronto ✓')+'</small></div>').join('');
 $('#lobbyCount').textContent=items.length+' '+(items.length===1?'participante':'participantes')+' na sala';
}
async function openLobby(){
 $('#roomCode').textContent=room.code;
 const pedagogico=room.mode==='pedagogico';
 $('#lobbyModeLabel').textContent=pedagogico?'MODO PEDAGÓGICO':'MODO GAMER';
 $('#lobbyPack').textContent=pedagogico?(PACKS[room.pack]||room.pack):'Arena direta • mesmo desafio para todos';
 $('#lobbyModeText').textContent=pedagogico?'Aula e questões vêm primeiro. Depois, cada aluno libera o mesmo desafio de Tangram.':'Sem etapa didática: contagem regressiva, Tangram e ranking.';
 $('#startMatch').style.display=room.isHost?'block':'none';
 const lobbyNote=document.querySelector('.lobby-title small');if(lobbyNote)lobbyNote.textContent=room.isHost?'Você controla o início da partida':'Aguardando o anfitrião iniciar';
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

$('#copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(room.code);$('#copyCode').textContent='Copiado ✓';setTimeout(()=>$('#copyCode').textContent='Copiar código',1300)}catch(e){}});

$('#startMatch').addEventListener('click',async()=>{
 if(!room.isHost||!room.hostToken)return;
 const b=$('#startMatch');b.disabled=true;b.textContent='Iniciando…';
 try{
  const {data,error}=await sb.rpc('x1_start_room',{p_code:room.code,p_host_token:room.hostToken});
  if(error)throw error;if(!data)throw new Error('A sala não pôde ser iniciada.');
  runCountdown(true);
 }catch(e){alert(e.message||e);b.disabled=false;b.textContent='Começar partida'}
});

function runCountdown(hostAdvances=false){
 if(countdownBusy)return;countdownBusy=true;show('countdown');
 let n=3;$('#countNum').textContent=n;
 const t=setInterval(async()=>{
  n--;
  if(n>0){$('#countNum').textContent=n;return}
  clearInterval(t);$('#countNum').textContent='VALENDO!';
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
 if(!ok){quizWrong++;$('#quizFeedback').textContent='Ainda não. Pense: fator 2 significa multiplicar a medida original por 2.';return}
 $('#quizFeedback').textContent='✓ Isso! O fator 2 dobra a medida. Arena liberada.';
 if(room.playerId&&room.playerToken){
  try{await sb.rpc('x1_submit_quiz',{p_player_id:room.playerId,p_player_token:room.playerToken,p_correct:1,p_wrong:quizWrong})}catch(e){}
 }
 setTimeout(startArena,700);
}));

async function updateRaceFeed(){
 const feed=$('#raceFeed');if(!feed||!room.id)return;
 try{
  const players=await fetchPlayers(),done=players.filter(p=>p.tangram_finished_at);
  if(!players.length){feed.innerHTML='<span>🏁 Aguardando jogadores.</span>';return}
  if(!done.length){feed.innerHTML='<span>🏁 Todos receberam o mesmo desafio.</span><strong>0/'+players.length+' concluíram</strong>';return}
  const last=done.sort((a,b)=>new Date(a.tangram_finished_at)-new Date(b.tangram_finished_at)).at(-1);
  feed.innerHTML='<span>🏁 '+esc(last.nickname)+' concluiu.</span><strong>'+done.length+'/'+players.length+' concluíram</strong>';
 }catch(e){}
}

function arenaChallengeIndex(){
 const round=Math.max(1,Number(room.currentRound)||1);
 return (round-1)%5;
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
   const bridge=win.__raiTangramBonusBridge;
   if(bridge?.open){
    bridge.open(arenaChallengeIndex());
    setTimeout(()=>{try{doc.querySelector('#board')?.scrollIntoView({block:'center'})}catch(e){}},220);
   }else if(tries<50){setTimeout(attempt,180);return}
   $('#arenaLoader').hidden=true;
   frame.style.display='block';
   stopArenaObserver();
   arenaObserver=new MutationObserver(()=>{
    const text=(msg.textContent||'').replace(/\s+/g,' ').trim();
    if(/miss[aã]o conclu[ií]da/i.test(text))onTangramComplete(text);
   });
   arenaObserver.observe(msg,{subtree:true,childList:true,characterData:true});
  }catch(e){if(tries<50)setTimeout(attempt,180);else{$('#arenaLoader').innerHTML='<b>Não foi possível abrir o motor do Tangram.</b><small>Recarregue a página e tente novamente.</small>'}}
 };
 attempt();
}

async function prepareTangramArena(){
 const frame=$('#tangramArenaFrame'),loader=$('#arenaLoader'),spectator=$('#spectatorCard'),role=$('#arenaRole');
 stopArenaObserver();arenaFinished=false;
 if(room.teacher){
  frame.style.display='none';loader.hidden=true;spectator.hidden=false;role.textContent='Professor • acompanhamento';
  await updateRaceFeed();return;
 }
 spectator.hidden=true;loader.hidden=false;frame.style.display='none';role.textContent=(room.nickname||'Jogador')+' • competidor';
 loader.innerHTML='<div class="spinner"></div><b>Preparando o mesmo desafio para todos…</b><small>Motor oficial do Tangram Educativo.</small>';
 const token=++arenaLoadToken;
 frame.onload=()=>wireArenaFrame(frame,token);
 frame.src='../tangram-prof-junior-v12/?x1=1&round='+(room.currentRound||1)+'&t='+(Date.now());
}

async function onTangramComplete(message){
 if(arenaFinished||room.teacher)return;arenaFinished=true;stopArenaObserver();clearInterval(tick);tick=null;
 $('#raceFeed').innerHTML='<span>🏁 Encaixe correto! Registrando sua chegada…</span>';
 try{
  if(room.playerId&&room.playerToken){
   const {data,error}=await sb.rpc('x1_finish_tangram',{p_player_id:room.playerId,p_player_token:room.playerToken});
   if(error)throw error;if(!data)throw new Error('Resultado não registrado.');
  }
  await updateRaceFeed();
  setTimeout(()=>renderResults(),700);
 }catch(e){arenaFinished=false;$('#raceFeed').textContent='Não foi possível registrar o resultado: '+(e.message||e)}
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
 $('#raceFeed').innerHTML='<span>🏁 Todos receberam o mesmo desafio.</span>';
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
  el.querySelector('small').textContent=p?elapsedFromArenaStart(p.tangram_finished_at):'aguardando';
 }
 const me=room.teacher?null:players.find(p=>p.id===room.playerId);
 const pedagogico=room.mode==='pedagogico';
 $('#metricPrecisionLabel').textContent=pedagogico?'Precisão':'Modo';
 $('#metricErrorsLabel').textContent=pedagogico?'Erros pedagógicos':'Posição';
 if(pedagogico){
  const correct=me?.quiz_correct??0,wrong=me?.quiz_wrong??0,total=correct+wrong;
  $('#metricPrecision').textContent=me?(correct+'/'+Math.max(1,total)+' respostas'):'Visão do professor';
  $('#metricErrors').textContent=me?String(wrong):'—';
 }else{
  $('#metricPrecision').textContent='Gamer';
  const pos=me?ranked.findIndex(p=>p.id===me.id)+1:0;
  $('#metricErrors').textContent=pos>0?(pos+'º lugar'):'—';
 }
 $('#totalTime').textContent=me?.tangram_finished_at?elapsedFromArenaStart(me.tangram_finished_at):(ranked[0]?.tangram_finished_at?elapsedFromArenaStart(ranked[0].tangram_finished_at):'—');
 const rematch=$('#rematch');
 if(room.isHost){rematch.disabled=false;rematch.textContent='Revanche • nova rodada'}
 else{rematch.disabled=true;rematch.textContent='Aguardando revanche do anfitrião'}
 show('results');
}
$('#rematch').addEventListener('click',async()=>{
 if(!room.isHost||!room.hostToken)return;
 const b=$('#rematch');b.disabled=true;b.textContent='Preparando nova rodada…';
 try{
  const {data,error}=await sb.rpc('x1_reset_room',{p_code:room.code,p_host_token:room.hostToken});
  if(error)throw error;if(!data)throw new Error('Não foi possível reiniciar a sala.');
  quizWrong=0;resetArenaFrame();await fetchRoom();await openLobby();
 }catch(e){alert(e.message||e)}
 finally{b.disabled=false;b.textContent='Revanche • nova rodada'}
});

$('#demoStart').addEventListener('click',()=>{alert('No Gamer, qualquer aluno pode criar uma sala. O modo Pedagógico continua protegido pela senha do professor.')});

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