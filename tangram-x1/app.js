(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const views=$$('.view');
const show=id=>{views.forEach(v=>v.classList.toggle('show',v.id===id));scrollTo({top:0,behavior:'smooth'})};
const code=()=> 'RAI-'+Math.floor(1000+Math.random()*9000);
const PACKS={pp9:'Prova Paraná • Matemática • 9º ano',prog8:'Programação • 8º ano',logic7:'Pensamento Computacional • 7º ano',geo6:'Matemática & Geometria • 6º ano'};
let room={code:'',teacher:true,pack:'pp9',nickname:'Você'},startedAt=0,tick=null;

$$('[data-home]').forEach(b=>b.addEventListener('click',()=>show('home')));
$('#createRoom').addEventListener('click',()=>show('teacherSetup'));
$('#joinRoom').addEventListener('click',()=>show('join'));
$('#demoStart').addEventListener('click',()=>{room={code:code(),teacher:true,pack:'pp9',nickname:'Você'};openLobby()});

function openLobby(){
 $('#roomCode').textContent=room.code;
 $('#lobbyPack').textContent=PACKS[room.pack]||PACKS.pp9;
 const names=room.teacher?['Você • Professor','Marina','Lucas','Bia']:['Professor','Marina','Lucas',room.nickname||'Você'];
 $('#players').innerHTML=names.map((n,i)=>'<div class="player"><b>'+n+'</b><small>'+(i===0&&room.teacher?'Anfitrião':'Pronto ✓')+'</small></div>').join('');
 $('#lobbyCount').textContent=names.length+' jogadores prontos';
 $('#startMatch').style.display=room.teacher?'block':'none';
 show('lobby');
}
$('#createDemoRoom').addEventListener('click',()=>{room.code=code();room.teacher=true;room.pack=$('#contentPack').value;room.nickname='Você';openLobby()});
$('#copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(room.code);$('#copyCode').textContent='Copiado ✓';setTimeout(()=>$('#copyCode').textContent='Copiar código',1300)}catch(e){}});
$('#joinOnline').addEventListener('click',()=>{
 const c=$('#roomCodeInput').value.trim().toUpperCase(),n=$('#nickname').value.trim();
 if(!c||!n){$('#joinStatus').textContent='Digite o código da sala e um apelido.';return}
 $('#joinStatus').innerHTML='A interface está pronta. Para entrar em uma sala de outro aparelho, falta conectar o serviço em tempo real. Você já pode testar o fluxo local pela demonstração.';
});
$('#startMatch').addEventListener('click',countdown);
function countdown(){
 show('countdown');let n=3;$('#countNum').textContent=n;
 const t=setInterval(()=>{n--;if(n>0){$('#countNum').textContent=n}else{clearInterval(t);$('#countNum').textContent='VALENDO!';setTimeout(()=>show('lesson'),650)}},700);
}
$('#lessonDone').addEventListener('click',()=>show('quiz'));
$$('[data-answer]').forEach(b=>b.addEventListener('click',()=>{
 const ok=b.dataset.answer==='2';$$('[data-answer]').forEach(x=>x.classList.remove('correct','wrong'));b.classList.add(ok?'correct':'wrong');
 $('#quizFeedback').textContent=ok?'✓ Isso! O fator 2 dobra a medida. Arena liberada.':'Ainda não. Pense: fator 2 significa multiplicar a medida original por 2.';
 if(ok)setTimeout(startArena,900);
}));
function startArena(){
 show('arena');startedAt=performance.now();clearInterval(tick);tick=setInterval(()=>{
  const s=(performance.now()-startedAt)/1000,m=Math.floor(s/60),sec=s-m*60;
  $('#timer').textContent=String(m).padStart(2,'0')+':'+sec.toFixed(1).padStart(4,'0');
 },100);
}
$('#simulateFinish').addEventListener('click',()=>{clearInterval(tick);const elapsed=(performance.now()-startedAt)/1000;$('#winnerTime').textContent=(elapsed<60?'00:':'01:')+(elapsed<60?elapsed:(elapsed-60)).toFixed(1).padStart(4,'0');$('#winnerName').textContent=room.nickname||'Você';$('#totalTime').textContent='02:'+Math.min(59,Math.round(elapsed)).toString().padStart(2,'0')+'.0';$('#raceFeed').innerHTML='<span>🏁 Você concluiu a montagem corretamente!</span>';setTimeout(()=>show('results'),650)});
$('#rematch').addEventListener('click',countdown);
show('home');
})();