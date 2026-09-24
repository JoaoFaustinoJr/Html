(()=>{
'use strict';

const SUPABASE_URL='https://hfryzntefzjlqitpxbxw.supabase.co';
const SUPABASE_KEY='sb_publishable_WmUv7bOqiavIoXYdtKBZKg__hpnqaZq';
const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY,{realtime:{params:{eventsPerSecond:10}}});

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const views=$$('.view');
const PACKS={pp9:'Prova Paraná • Matemática • 9º ano',prog8:'Programação • 8º ano',logic7:'Pensamento Computacional • 7º ano',geo6:'Matemática & Geometria • 6º ano'};
let mode='pedagogico';
let room={id:'',code:'',teacher:false,pack:'pp9',mode:'pedagogico',nickname:'Você',hostToken:'',playerId:'',playerToken:'',status:'lobby'};
let roomChannel=null,playerChannel=null,startedAt=0,tick=null,countdownBusy=false,quizWrong=0;

const show=id=>{views.forEach(v=>v.classList.toggle('show',v.id===id));try{scrollTo({top:0,behavior:'smooth'})}catch(e){}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const setJoinStatus=(t,bad=false)=>{const el=$('#joinStatus');if(el){el.textContent=t;el.style.color=bad?'#ff9cab':''}};
const fmt=t=>{if(!t)return'—';const d=new Date(t);return d.toLocaleTimeString('pt-BR',{minute:'2-digit',second:'2-digit'})};

$$('[data-home]').forEach(b=>b.addEventListener('click',()=>{disconnectRoom();show('home')}));
$('#createRoom').addEventListener('click',()=>show('teacherSetup'));
$('#joinRoom').addEventListener('click',()=>show('join'));

$$('.mode-option').forEach(b=>b.addEventListener('click',()=>{
 mode=b.dataset.mode||'pedagogico';
 $$('.mode-option').forEach(x=>x.classList.toggle('active',x===b));
 const pedagogico=mode==='pedagogico';
 $('#contentPackLabel').style.display=pedagogico?'block':'none';
 $('#questionCount').closest('label').style.display=pedagogico?'block':'none';
 $('#penalty').closest('label').style.display=pedagogico?'flex':'none';
}));

async function createRoom(){
 if(!sb)return alert('Realtime indisponível neste navegador.');
 const btn=$('#createDemoRoom');btn.disabled=true;btn.textContent='Criando sala…';
 try{
  const args={
   p_class_name:$('#className').value.trim()||'Turma X1',
   p_mode:mode,
   p_content_pack:$('#contentPack').value,
   p_question_count:Number($('#questionCount').value)||3,
   p_round_count:Number($('#roundCount').value)||1,
   p_penalty_enabled:!!$('#penalty').checked
  };
  const {data,error}=await sb.rpc('x1_create_room',args);
  if(error)throw error;
  const x=Array.isArray(data)?data[0]:data;if(!x)throw new Error('Sala não criada.');
  room={id:x.room_id,code:x.code,teacher:true,pack:args.p_content_pack,mode:args.p_mode,nickname:'Professor',hostToken:x.host_token,playerId:'',playerToken:'',status:'lobby'};
  sessionStorage.setItem('tangramX1Host',JSON.stringify(room));
  await subscribeRoom();
  await openLobby();
 }catch(e){alert('Não foi possível criar a sala: '+(e.message||e))}
 finally{btn.disabled=false;btn.textContent='Criar sala'}
}
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
  room={id:x.room_id,code,teacher:false,pack:x.content_pack,mode:x.room_mode,nickname,hostToken:'',playerId:x.player_id,playerToken:x.player_token,status:x.room_status};
  sessionStorage.setItem('tangramX1Player',JSON.stringify(room));
  await subscribeRoom();
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
 if(data){room.mode=data.mode;room.pack=data.content_pack;room.status=data.status}
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
 $('#players').innerHTML=items.map(p=>'<div class="player '+(p.role==='teacher'?'teacher ':'')+(p.id===room.playerId?'me':'')+'"><b>'+esc(p.nickname)+(p.id===room.playerId?' • você':'')+'</b><small>'+(p.role==='teacher'?'Anfitrião':p.tangram_finished_at?'Concluiu 🏁':p.quiz_finished_at?'Etapa pedagógica ✓':'Pronto ✓')+'</small></div>').join('');
 $('#lobbyCount').textContent=items.length+' '+(items.length===1?'participante':'participantes')+' na sala';
}
async function openLobby(){
 $('#roomCode').textContent=room.code;
 const pedagogico=room.mode==='pedagogico';
 $('#lobbyModeLabel').textContent=pedagogico?'MODO PEDAGÓGICO':'MODO GAMER';
 $('#lobbyPack').textContent=pedagogico?(PACKS[room.pack]||room.pack):'Arena direta • mesmo desafio para todos';
 $('#lobbyModeText').textContent=pedagogico?'Aula e questões vêm primeiro. Depois, cada aluno libera o mesmo desafio de Tangram.':'Sem etapa didática: contagem regressiva, Tangram e ranking.';
 $('#startMatch').style.display=room.teacher?'block':'none';
 await renderPlayers();
 show('lobby');
}
async function subscribeRoom(){
 disconnectSubscriptions();
 const roomFilter='id=eq.'+room.id,playerFilter='room_id=eq.'+room.id;
 roomChannel=sb.channel('x1-room-'+room.id)
  .on('postgres_changes',{event:'UPDATE',schema:'public',table:'x1_rooms',filter:roomFilter},payload=>{
    if(payload.new){room.status=payload.new.status;room.mode=payload.new.mode;room.pack=payload.new.content_pack;applyRoomState(payload.new.status)}
  })
  .subscribe();
 playerChannel=sb.channel('x1-players-'+room.id)
  .on('postgres_changes',{event:'*',schema:'public',table:'x1_players',filter:playerFilter},()=>{renderPlayers();if($('#results').classList.contains('show'))renderResults()})
  .subscribe();
}
function disconnectSubscriptions(){
 try{if(roomChannel)sb?.removeChannel(roomChannel)}catch(e){}try{if(playerChannel)sb?.removeChannel(playerChannel)}catch(e){}
 roomChannel=playerChannel=null;
}
function disconnectRoom(){disconnectSubscriptions();clearInterval(tick);countdownBusy=false}

$('#copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(room.code);$('#copyCode').textContent='Copiado ✓';setTimeout(()=>$('#copyCode').textContent='Copiar código',1300)}catch(e){}});

$('#startMatch').addEventListener('click',async()=>{
 if(!room.teacher||!room.hostToken)return;
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
  if(hostAdvances&&room.teacher){
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

function startArena(){
 if($('#arena').classList.contains('show')&&tick)return;
 show('arena');startedAt=performance.now();clearInterval(tick);
 tick=setInterval(()=>{
  const s=(performance.now()-startedAt)/1000,m=Math.floor(s/60),sec=s-m*60;
  $('#timer').textContent=String(m).padStart(2,'0')+':'+sec.toFixed(1).padStart(4,'0');
 },100);
 $('#raceFeed').innerHTML='<span>🏁 Todos receberam o mesmo desafio.</span>';
}

$('#simulateFinish').addEventListener('click',async()=>{
 clearInterval(tick);tick=null;
 const elapsed=(performance.now()-startedAt)/1000;
 $('#simulateFinish').disabled=true;$('#simulateFinish').textContent='Registrando resultado…';
 try{
  if(room.playerId&&room.playerToken){
   const {error}=await sb.rpc('x1_finish_tangram',{p_player_id:room.playerId,p_player_token:room.playerToken});if(error)throw error;
  }
  $('#raceFeed').innerHTML='<span>🏁 Resultado registrado em tempo real.</span>';
  await renderResults();
 }catch(e){$('#raceFeed').textContent='Não foi possível registrar: '+(e.message||e)}
 finally{$('#simulateFinish').disabled=false;$('#simulateFinish').textContent='✓ Simular encaixe concluído'}
});

async function renderResults(){
 clearInterval(tick);tick=null;
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
  el.querySelector('b').textContent=s.label;el.querySelector('span').textContent=p?p.nickname:'—';el.querySelector('small').textContent=p?fmt(p.tangram_finished_at):'aguardando';
 }
 show('results');
}
$('#rematch').addEventListener('click',async()=>{
 if(room.teacher&&room.hostToken){
  try{await sb.rpc('x1_set_room_status',{p_code:room.code,p_host_token:room.hostToken,p_status:'lobby'});await openLobby()}catch(e){}
 }else show('lobby');
});

$('#demoStart').addEventListener('click',()=>{alert('O Realtime já está ativo. Crie uma sala como professor e use o código em outro aparelho para testar a conexão real.')});

(async()=>{
 if(!sb){document.body.classList.add('offline');return}
 try{
  const host=JSON.parse(sessionStorage.getItem('tangramX1Host')||'null');
  const player=JSON.parse(sessionStorage.getItem('tangramX1Player')||'null');
  const saved=host?.id?host:player?.id?player:null;
  if(saved){room=saved;await subscribeRoom();const r=await fetchRoom();if(r){await openLobby();applyRoomState(r.status);return}}
 }catch(e){}
 show('home');
})();
})();