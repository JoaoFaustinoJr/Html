(()=>{
if(window.__dmHotfix16)return;window.__dmHotfix16=true;
function stopVoice(){try{if(typeof stopSpeech==='function')stopSpeech()}catch(e){}try{speechSynthesis.cancel()}catch(e){}}
function bind(){const a=document.querySelector('.portal-actions');if(!a)return;const buttons=[...a.querySelectorAll('button')];const by=(...terms)=>buttons.find(b=>terms.some(t=>b.textContent.toLowerCase().includes(t)));
 const main=by('iniciar','continuar');if(main)main.onclick=()=>{stopVoice();enterNovena()};
 const prayer=by('orações');if(prayer)prayer.onclick=()=>{stopVoice();enterNovena();setTimeout(openFixed,0)};
 const chap=by('terço');if(chap){chap.innerHTML='🙏 Terço da Misericórdia<span class="dm-quick">Rezar continuamente com narração</span>';chap.onclick=()=>{stopVoice();if(typeof startAutoChaplet==='function')startAutoChaplet();else openChaplet()}};
 const journey=by('minha jornada','9 dias');if(journey){journey.innerHTML='▣ Minha Jornada<span class="dm-quick">Lista dos 9 dias da Novena</span>';journey.onclick=()=>{stopVoice();if(typeof openJourney==='function')openJourney();else{enterNovena();setDay(+(localStorage.dmDay||1))}}}
 const about=by('sobre');if(about)about.onclick=()=>{stopVoice();showAbout()};
 const intent=by('minhas intenções','suas intenções','ouvir');if(intent){intent.innerHTML='♡ Minhas Intenções<span class="dm-quick">Registre o que deseja confiar a Jesus</span>';intent.onclick=()=>{stopVoice();if(typeof openIntent==='function')openIntent()}};
 let music=by('músicas');if(!music&&window.openMusic){music=document.createElement('button');music.innerHTML='♫ Músicas<span class="dm-quick">Cantos sacros de uso aberto</span>';music.onclick=()=>{stopVoice();openMusic()};a.appendChild(music)}else if(music)music.onclick=()=>{stopVoice();openMusic()};
}
function patchJourney(){if(typeof window.openJourney!=='function'||!window.D)return;const original=window.openJourney;window.openJourney=function(){stopVoice();original();setTimeout(()=>{const list=document.getElementById('dmDayList');if(!list)return;list.querySelectorAll('.dm-day').forEach((b,i)=>{b.setAttribute('aria-label',`Abrir dia ${i+1}: ${D[i][0]}`);b.onclick=()=>{document.getElementById('dmJourney')?.classList.remove('open');enterNovena();setDay(i+1)}})},0)}}
function patchBottom(){document.querySelectorAll('#dmBottom button').forEach(b=>{const a=b.dataset.a;if(a==='music')b.onclick=e=>{e.stopPropagation();stopVoice();openMusic()};if(a==='novena')b.onclick=e=>{e.stopPropagation();stopVoice();openJourney()}})}
setTimeout(()=>{bind();patchJourney();patchBottom()},50);setTimeout(()=>{bind();patchBottom()},800);
})();