(()=>{
'use strict';
if(window.__TIA_TATI_XYLO_EXTRAS__)return;window.__TIA_TATI_XYLO_EXTRAS__=true;
const extraSongs={
  fatima:{name:'A Treze de Maio',icon:'🙏',seq:[4,0,0,2,4,4,2,4,4,2,1,1,2,3,3,1,2,2,0,1,1,4,0,0,4,2,1,0,0,1,2,3,1,4,4,3,2,0,1,4,2,0]},
  frog:{name:'O Sapo Não Lava o Pé',icon:'🐸',seq:[4,4,5,4,3,2,2,2,3,2,1,0,0,0,2,4,4,5,4,3,2,2,3,2,1,0]}
};
const freqs=[261.63,293.66,329.63,349.23,392,440,493.88,523.25];
let selectedKey='',practice=false,step=0,playing=false,ctx=null,installed=false,timers=[];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function installHighlight(){if(document.getElementById('ttXyloStrongHighlight'))return;const s=document.createElement('style');s.id='ttXyloStrongHighlight';s.textContent=`
.tt-xylo-key{transition:transform .16s ease,filter .16s ease,opacity .16s ease,box-shadow .16s ease!important}
.tt-xylo-key.lit{z-index:5!important;transform:translateY(4px) scale(1.09)!important;filter:brightness(1.32) saturate(1.22)!important;box-shadow:0 2px 0 #173d7130,0 0 0 6px #fff,0 0 0 11px #ffd54f,0 0 34px 15px #ffb300cc!important;animation:ttXyloPulse .62s ease-in-out infinite alternate!important}
.tt-xylo-key.lit span{background:#fff!important;color:#0b4382!important;font-weight:1000!important;box-shadow:0 0 0 3px #fff,0 4px 13px #173d7140!important;transform:scale(1.12)}
.tt-xylo-bars:has(.tt-xylo-key.lit) .tt-xylo-key:not(.lit){filter:brightness(.72) saturate(.72)!important;opacity:.66}
@keyframes ttXyloPulse{from{transform:translateY(4px) scale(1.055)}to{transform:translateY(4px) scale(1.105)}}
@media(max-width:520px){.tt-xylo-key.lit{box-shadow:0 2px 0 #173d7130,0 0 0 5px #fff,0 0 0 9px #ffd54f,0 0 27px 12px #ffb300cc!important}}
@media(orientation:landscape) and (max-height:620px){
  .tt-xylo-shell{padding:3px max(58px,env(safe-area-inset-right)) 3px 3px!important;gap:2px!important}
  .tt-xylo-top{min-height:0!important;padding:2px 7px!important}
  .tt-xylo-brand img{width:28px!important;height:28px!important;border-radius:9px!important}
  .tt-xylo-close{width:30px!important;height:30px!important;font-size:1rem!important}
  .tt-xylo-hero{padding:2px!important;border-radius:12px!important}
  .tt-xylo-hero h1{font-size:.9rem!important;line-height:1.05!important}
  .tt-xylo-panel{grid-template-columns:minmax(170px,23vw) minmax(0,1fr)!important;gap:3px!important;padding:4px!important}
  .tt-xylo-msg{padding:4px 5px!important;font-size:.62rem!important;line-height:1.05!important;border-radius:10px!important}
  .tt-xylo-modes{gap:3px!important}
  .tt-xylo-mode{padding:4px 2px!important;font-size:.56rem!important;line-height:1.08!important;border-width:1.5px!important;border-radius:11px!important}
  .tt-xylo-songs{padding:3px!important;border-radius:11px!important}
  .tt-xylo-songgrid{gap:3px!important}
  .tt-xylo-song{padding:4px 2px!important;font-size:.55rem!important;line-height:1.08!important;border-width:1.5px!important;border-radius:10px!important}
  .tt-xylo-actions{gap:3px!important;justify-content:flex-start!important}
  .tt-xylo-btn{padding:5px 8px!important;font-size:.6rem!important;line-height:1!important}
  .tt-xylo-bars{min-width:0!important;gap:2px!important;padding:3px 2px 5px!important;max-height:calc(100dvh - 76px)!important}
  .tt-xylo-key{min-width:0!important;border-radius:10px 10px 15px 15px!important}
  .tt-xylo-key span{font-size:.54rem!important;bottom:5px!important;padding:2px 1px!important}
}
`;document.head.appendChild(s)}
installHighlight();
const current=()=>extraSongs[selectedKey]||null;
function audio(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume()}
function tone(i,d=.42){audio();const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freqs[i];g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.32,ctx.currentTime+.012);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+d);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+d+.03)}
function key(i){return $('.tt-xylo-key[data-note="'+i+'"]')}
function flash(i,d=330){const k=key(i);if(!k)return;k.classList.add('lit');setTimeout(()=>k.classList.remove('lit'),d)}
function msg(t){const m=$('#xyMsg');if(m)m.textContent=t}
function clearOwn(){timers.forEach(clearTimeout);timers=[];playing=false;practice=false;step=0}
function play(){const song=current();if(!song||playing)return;clearOwn();playing=true;msg('Ouça “'+song.name+'” e acompanhe as luzes. '+song.icon+'🎵');const gap=430;song.seq.forEach((n,i)=>{timers.push(setTimeout(()=>{tone(n);flash(n,360)},i*gap))});timers.push(setTimeout(()=>{playing=false;practice=true;step=0;msg('Agora é sua vez! Siga as luzes. 💗');flash(song.seq[0],900);const b=$('#xyStart');if(b)b.textContent='🔁 Ouvir novamente'},song.seq.length*gap+250))}
function ownHit(i,e){const song=current();if(!song||!practice||playing)return;e.preventDefault();e.stopImmediatePropagation();tone(i);flash(i);if(i===song.seq[step]){step++;if(step>=song.seq.length){practice=false;msg('🌟 Muito bem! Você tocou “'+song.name+'”! 💗');const w=$('#xyWin');if(w){w.textContent='🌟 Muito bem! Você tocou “'+song.name+'”! 💗';w.classList.add('show');setTimeout(()=>w.classList.remove('show'),4200)}}else{msg('Muito bem! Continue seguindo as luzes. '+song.icon);setTimeout(()=>flash(song.seq[step],800),180)}}else{msg('Quase! Toque na tecla iluminada. 💗');setTimeout(()=>flash(song.seq[step],850),180)}}
function chooseExtra(k,b){clearOwn();selectedKey=k;const song=current();$$('.tt-xylo-song').forEach(x=>{x.classList.toggle('active',x===b);x.style.borderColor=x===b?'#f2479a':''});msg('“'+song.name+'” selecionada. Toque em Ouvir música. '+song.icon);const start=$('#xyStart');if(start)start.textContent='▶ Ouvir música'}
function install(){const grid=$('#xySongs .tt-xylo-songgrid'),start=$('#xyStart');if(!grid||!start||installed)return false;installed=true;
Object.entries(extraSongs).forEach(([k,song])=>{if(grid.querySelector('[data-extra-song="'+k+'"]'))return;const b=document.createElement('button');b.type='button';b.className='tt-xylo-song';b.dataset.extraSong=k;b.textContent=song.icon+' '+song.name;grid.appendChild(b);b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();chooseExtra(k,b)})});
$$('.tt-xylo-song:not([data-extra-song])').forEach(x=>x.addEventListener('click',()=>{selectedKey='';clearOwn()}));
$$('.tt-xylo-mode').forEach(x=>x.addEventListener('click',()=>{if(x.dataset.mode!=='song'){selectedKey='';clearOwn()}}));
start.addEventListener('click',e=>{if(!selectedKey)return;e.preventDefault();e.stopImmediatePropagation();play()},true);
$$('.tt-xylo-key').forEach((k,i)=>k.addEventListener('click',e=>ownHit(i,e),true));return true}
let tries=0,t=setInterval(()=>{if(install()||++tries>120)clearInterval(t)},250);window.addEventListener('load',()=>{installHighlight();install()});
})();