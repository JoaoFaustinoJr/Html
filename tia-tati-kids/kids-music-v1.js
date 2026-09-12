(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_MUSIC_V1__)return;
window.__TIA_TATI_KIDS_MUSIC_V1__=true;
const PREF='tiaTatiKidsMusic';
let enabled=localStorage.getItem(PREF)!=='0';
let ctx=null,bus=null,master=null,timer=null,next=0,step=0,started=false,duckUntil=0;
const BPM=94,STEP=60/BPM/4;
const MUSIC_LEVEL=.24;
const DUCK_LEVEL=.065;
function ensure(){if(!enabled)return null;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;if(!ctx){ctx=new AC();master=ctx.createGain();bus=ctx.createGain();master.gain.value=.68;bus.gain.value=MUSIC_LEVEL;bus.connect(master);master.connect(ctx.destination);}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx;}
function env(at,dur,peak=.025){const g=ctx.createGain();g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),at+.012);g.gain.exponentialRampToValueAtTime(.0001,at+dur);g.connect(bus);return g;}
function tone(freq,at,dur,type='sine',vol=.025){const o=ctx.createOscillator(),g=env(at,dur,vol);o.type=type;o.frequency.setValueAtTime(freq,at);o.connect(g);o.start(at);o.stop(at+dur+.03);}
function softNoise(at,dur=.05,vol=.009){const len=Math.max(1,Math.floor(ctx.sampleRate*dur)),b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=env(at,dur,vol);f.type='highpass';f.frequency.value=4300;s.buffer=b;s.connect(f);f.connect(g);s.start(at);}
function kick(at){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(92,at);o.frequency.exponentialRampToValueAtTime(48,at+.12);g.gain.setValueAtTime(.035,at);g.gain.exponentialRampToValueAtTime(.0001,at+.14);o.connect(g);g.connect(bus);o.start(at);o.stop(at+.16);}
const chords=[[261.63,329.63,392],[196,246.94,293.66],[220,261.63,329.63],[174.61,220,261.63]];
const roots=[130.81,98,110,87.31];
const melody=[523.25,587.33,659.25,587.33,523.25,493.88,440,493.88,523.25,659.25,698.46,659.25,587.33,523.25,493.88,440];
function schedule(s,at){const pos=s%16,bar=Math.floor(s/16)%4;if(pos===0||pos===8)kick(at);if(pos===4||pos===12)softNoise(at,.08,.014);if(pos%2===0)softNoise(at,.025,.006);if(pos===0||pos===8){tone(roots[bar],at,.34,'triangle',.024);tone(roots[bar]*2,at+.02,.2,'sine',.012);}if(pos%4===0){const c=chords[bar];tone(c[0],at,.34,'triangle',.013);tone(c[1],at+.015,.32,'triangle',.011);tone(c[2],at+.03,.30,'sine',.010);}if(pos%2===1){const n=melody[pos];tone(n,at,.12,'sine',.015);tone(n*2,at+.012,.07,'triangle',.005);}}
function scheduler(){if(!ctx||!started)return;while(next<ctx.currentTime+.12){schedule(step,next);step++;next+=STEP;}const target=(performance.now()<duckUntil)?DUCK_LEVEL:MUSIC_LEVEL;bus.gain.cancelScheduledValues(ctx.currentTime);bus.gain.setTargetAtTime(enabled?target:.0001,ctx.currentTime,.09);}
function start(){if(!enabled||started)return;if(!ensure())return;started=true;step=0;next=ctx.currentTime+.04;timer=setInterval(scheduler,35);updateBtn();}
function stop(){started=false;if(timer){clearInterval(timer);timer=null;}if(bus&&ctx)bus.gain.setTargetAtTime(.0001,ctx.currentTime,.06);updateBtn();}
function setEnabled(v){enabled=!!v;localStorage.setItem(PREF,enabled?'1':'0');enabled?start():stop();updateBtn();}
function duck(ms=2800){duckUntil=Math.max(duckUntil,performance.now()+ms);}
const btn=document.createElement('button');btn.type='button';btn.id='kidsMusicToggle';btn.setAttribute('aria-label','Ligar ou desligar música');btn.style.cssText='position:fixed;z-index:90000;right:max(12px,calc((100vw - 1120px)/2 + 12px));top:max(14px,calc(env(safe-area-inset-top) + 10px));width:44px;height:44px;border-radius:50%;border:1px solid rgba(242,71,154,.28);background:rgba(255,255,255,.94);box-shadow:0 8px 24px rgba(30,69,93,.18);color:#17457b;font:700 20px/1 system-ui;display:grid;place-items:center;cursor:pointer';
function updateBtn(){btn.textContent=enabled?'🎵':'🔇';btn.title=enabled?'Desligar música':'Ligar música';btn.style.opacity=enabled?'1':'.72';}
updateBtn();btn.addEventListener('click',e=>{e.stopPropagation();if(!ctx)ensure();setEnabled(!enabled);});document.body.appendChild(btn);
const firstGesture=()=>{if(enabled)start();};document.addEventListener('pointerdown',firstGesture,{capture:true,once:true,passive:true});document.addEventListener('keydown',firstGesture,{capture:true,once:true});
function wrapVoice(){if(typeof window.playVoice==='function'&&!window.playVoice.__kidsMusicWrapped){const original=window.playVoice;const wrapped=function(...args){duck(3400);return original.apply(this,args);};wrapped.__kidsMusicWrapped=true;window.playVoice=wrapped;}}
wrapVoice();setTimeout(wrapVoice,500);document.addEventListener('play',e=>{if(e.target instanceof HTMLMediaElement)duck(3800);},true);document.addEventListener('visibilitychange',()=>{if(document.hidden&&ctx?.state==='running')ctx.suspend().catch(()=>{});else if(!document.hidden&&enabled&&started)ctx?.resume().catch(()=>{});});
window.TiaTatiKidsMusic={start,stop,setEnabled,isEnabled:()=>enabled,duck};
})();