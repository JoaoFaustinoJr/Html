(()=>{
'use strict';
if(window.__TIA_TATI_XYLO_FATIMA__)return;window.__TIA_TATI_XYLO_FATIMA__=true;
const seq=[4,0,0,2,4,4,2,4,4,2,1,1,2,3,3,1,2,2,0,1,1,4,0,0,4,2,1,0,0,1,2,3,1,4,4,3,2,0,1,4,2,0];
const freqs=[261.63,293.66,329.63,349.23,392,440,493.88,523.25];
let selected=false,practice=false,step=0,playing=false,ctx=null,installed=false;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function audio(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume()}
function tone(i,d=.42){audio();const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freqs[i];g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.32,ctx.currentTime+.012);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+d);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+d+.03)}
function key(i){return $('.tt-xylo-key[data-note="'+i+'"]')}
function flash(i,d=330){const k=key(i);if(!k)return;k.classList.add('lit');setTimeout(()=>k.classList.remove('lit'),d)}
function msg(t){const m=$('#xyMsg');if(m)m.textContent=t}
function play(){if(playing)return;playing=true;practice=false;step=0;msg('Ouça “A Treze de Maio” e acompanhe as luzes. 🙏🎵');const gap=430;seq.forEach((n,i)=>setTimeout(()=>{tone(n);flash(n,360)},i*gap));setTimeout(()=>{playing=false;practice=true;step=0;msg('Agora é sua vez! Siga as luzes. 💗');flash(seq[0],750);const b=$('#xyStart');if(b)b.textContent='🔁 Ouvir novamente'},seq.length*gap+250)}
function ownHit(i,e){if(!selected||!practice||playing)return;e.preventDefault();e.stopImmediatePropagation();tone(i);flash(i);if(i===seq[step]){step++;if(step>=seq.length){practice=false;msg('🌟 Muito bem! Você tocou “A Treze de Maio”! 💗');const w=$('#xyWin');if(w){w.textContent='🌟 Muito bem! Você tocou “A Treze de Maio”! 💗';w.classList.add('show');setTimeout(()=>w.classList.remove('show'),4200)}}else{msg('Muito bem! Continue seguindo as luzes. 🙏');setTimeout(()=>flash(seq[step],650),180)}}else{msg('Quase! Toque na tecla iluminada. 💗');setTimeout(()=>flash(seq[step],650),180)}}
function install(){const grid=$('#xySongs .tt-xylo-songgrid'),start=$('#xyStart');if(!grid||!start||installed)return false;installed=true;const b=document.createElement('button');b.type='button';b.className='tt-xylo-song';b.dataset.song='fatima';b.textContent='🙏 A Treze de Maio';grid.appendChild(b);b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();selected=true;practice=false;step=0;$$('.tt-xylo-song').forEach(x=>x.style.borderColor=x===b?'#f2479a':'');msg('“A Treze de Maio” selecionada. Toque em Ouvir música. 🙏');start.textContent='▶ Ouvir música'});
$$('.tt-xylo-song:not([data-song="fatima"])').forEach(x=>x.addEventListener('click',()=>{selected=false;practice=false}));
$$('.tt-xylo-mode').forEach(x=>x.addEventListener('click',()=>{if(x.dataset.mode!=='song'){selected=false;practice=false}}));
start.addEventListener('click',e=>{if(!selected)return;e.preventDefault();e.stopImmediatePropagation();play()},true);
$$('.tt-xylo-key').forEach((k,i)=>k.addEventListener('click',e=>ownHit(i,e),true));return true}
let tries=0,t=setInterval(()=>{if(install()||++tries>120)clearInterval(t)},250);window.addEventListener('load',install);
})();