(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_MUSIC_V1__)return;
window.__TIA_TATI_JOVEM_MUSIC_V1__=true;

const PREF='tiaTatiJovemMusic';
let enabled=localStorage.getItem(PREF)!=='0';
let ctx=null, musicBus=null, master=null, timer=null, nextStepTime=0, step=0, started=false, duckUntil=0;
const BPM=118;
const STEP=60/BPM/4;

function ensureAudio(){
  if(!enabled)return null;
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return null;
  if(!ctx){
    ctx=new AC();
    master=ctx.createGain();
    musicBus=ctx.createGain();
    master.gain.value=.58;
    musicBus.gain.value=.26;
    musicBus.connect(master);
    master.connect(ctx.destination);
  }
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  return ctx;
}
function env(at,dur,peak=.05){const g=ctx.createGain();g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),at+.012);g.gain.exponentialRampToValueAtTime(.0001,at+dur);g.connect(musicBus);return g;}
function osc(freq,at,dur,type='sine',vol=.035,end=freq){const o=ctx.createOscillator(),g=env(at,dur,vol);o.type=type;o.frequency.setValueAtTime(freq,at);if(end!==freq)o.frequency.exponentialRampToValueAtTime(Math.max(25,end),at+dur);o.connect(g);o.start(at);o.stop(at+dur+.03);}
function noise(at,dur=.05,vol=.025,highpass=5000){const len=Math.max(1,Math.floor(ctx.sampleRate*dur)),b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const src=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=env(at,dur,vol);f.type='highpass';f.frequency.value=highpass;src.buffer=b;src.connect(f);f.connect(g);src.start(at);}
function kick(at){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(118,at);o.frequency.exponentialRampToValueAtTime(43,at+.16);g.gain.setValueAtTime(.09,at);g.gain.exponentialRampToValueAtTime(.0001,at+.18);o.connect(g);g.connect(musicBus);o.start(at);o.stop(at+.2);}
function snare(at){noise(at,.11,.036,1700);osc(190,at,.08,'triangle',.018,120);}
function hat(at,accent=false){noise(at,.035,accent ? .022 : .012,6200);}
const bass=[55,55,65.41,55,73.42,65.41,49,55];
const arp=[220,261.63,329.63,392,329.63,261.63,246.94,329.63];
function scheduleStep(s,at){const pos=s%16;if(pos===0||pos===8)kick(at);if(pos===4||pos===12)snare(at);if(pos%2===0)hat(at,pos%4===0);if(pos%2===0){const n=bass[(Math.floor(s/2))%bass.length];osc(n,at,.21,'sawtooth',.027,n*.98);}if(pos%2===1){const n=arp[Math.floor(s/2)%arp.length];osc(n,at,.11,'triangle',.018,n*1.002);}if(pos===14){osc(659.25,at,.09,'sine',.022);osc(783.99,at+.07,.12,'sine',.018);}}
function scheduler(){if(!ctx||!started)return;while(nextStepTime<ctx.currentTime+.12){scheduleStep(step,nextStepTime);step++;nextStepTime+=STEP;}const ducked=performance.now()<duckUntil;const target=ducked ? .075 : .26;musicBus.gain.cancelScheduledValues(ctx.currentTime);musicBus.gain.setTargetAtTime(enabled ? target : .0001,ctx.currentTime,.08);}
function start(){if(!enabled||started)return;if(!ensureAudio())return;started=true;step=0;nextStepTime=ctx.currentTime+.04;timer=setInterval(scheduler,35);updateBtn();}
function stop(){started=false;if(timer){clearInterval(timer);timer=null;}if(musicBus&&ctx)musicBus.gain.setTargetAtTime(.0001,ctx.currentTime,.06);updateBtn();}
function setEnabled(v){enabled=!!v;localStorage.setItem(PREF,enabled?'1':'0');if(enabled)start(); else stop();updateBtn();}
function duck(ms=2600){duckUntil=Math.max(duckUntil,performance.now()+ms);}
const btn=document.createElement('button');btn.type='button';btn.id='jovemMusicToggle';btn.setAttribute('aria-label','Ligar ou desligar música');btn.style.cssText='position:fixed;z-index:90000;right:max(12px,calc((100vw - 1180px)/2 + 12px));top:max(14px,calc(env(safe-area-inset-top) + 10px));width:44px;height:44px;border-radius:50%;border:1px solid rgba(69,232,255,.45);background:rgba(7,19,47,.88);backdrop-filter:blur(10px);box-shadow:0 8px 24px rgba(0,0,0,.28),0 0 18px rgba(54,220,255,.16);color:#fff;font:700 20px/1 system-ui;display:grid;place-items:center;cursor:pointer';
function updateBtn(){btn.textContent=enabled?'🎵':'🔇';btn.title=enabled?'Desligar música':'Ligar música';btn.style.opacity=enabled?'1':'.72';}
updateBtn();btn.addEventListener('click',e=>{e.stopPropagation();if(!ctx)ensureAudio();setEnabled(!enabled);});document.body.appendChild(btn);
const firstGesture=()=>{if(enabled)start();};document.addEventListener('pointerdown',firstGesture,{capture:true,once:true,passive:true});document.addEventListener('keydown',firstGesture,{capture:true,once:true});
function wrapVoice(){if(typeof window.playVoice==='function'&&!window.playVoice.__musicWrapped){const original=window.playVoice;const wrapped=function(...args){duck(3200);return original.apply(this,args);};wrapped.__musicWrapped=true;window.playVoice=wrapped;}}
wrapVoice();window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(wrapVoice,50));document.addEventListener('play',e=>{if(e.target instanceof HTMLMediaElement)duck(3500);},true);document.addEventListener('visibilitychange',()=>{if(document.hidden&&ctx?.state==='running')ctx.suspend().catch(()=>{});else if(!document.hidden&&enabled&&started)ctx?.resume().catch(()=>{});});
window.TiaTatiJovemMusic={start,stop,setEnabled,isEnabled:()=>enabled,duck};
})();