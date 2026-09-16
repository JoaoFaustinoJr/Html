(()=>{
'use strict';
if(window.__TIA_TATI_MIRROR_FAIRY_V31__)return;
window.__TIA_TATI_MIRROR_FAIRY_V31__=true;
if(!('speechSynthesis' in window))return;
const synth=window.speechSynthesis;
const originalSpeak=synth.speak.bind(synth);
function chooseGentleVoice(){
 const voices=synth.getVoices?.()||[];
 const pt=voices.filter(v=>/^pt-BR/i.test(v.lang)||/^pt/i.test(v.lang));
 const femaleHints=/francisca|fernanda|helena|luciana|maria|mariana|vitoria|victoria|camila|isabela|female|feminina|mulher|bruna|leticia|patricia|joana|sofia|beatriz|carolina|ines|catarina/i;
 return pt.find(v=>femaleHints.test(v.name))||pt.find(v=>/google.*portugu|microsoft.*(francisca|maria)/i.test(v.name))||pt[0]||voices.find(v=>/^pt/i.test(v.lang))||null;
}
function softenText(text){
 return String(text||'')
  .replace(/O velho espelho te escuta/gi,'O espelho encantado te escuta')
  .replace(/o velho espelho/gi,'o espelho encantado')
  .replace(/Antigo, atento/gi,'Encantado, atento')
  .replace(/jovem viajante/gi,'pequeno viajante');
}
try{
 synth.speak=function(u){
  try{
   if(u){
    const softened=softenText(u.text);
    if(softened!==u.text)u.text=softened;
    const voice=chooseGentleVoice();
    if(voice)u.voice=voice;
    u.lang='pt-BR';
    u.rate=.92;
    u.pitch=1.28;
    u.volume=1;
   }
  }catch(_){ }
  return originalSpeak(u);
 };
}catch(_){ }
const toast=document.getElementById('feedbackToast');
if(toast){
 const adjust=()=>{const t=softenText(toast.textContent);if(t!==toast.textContent)toast.textContent=t};
 new MutationObserver(adjust).observe(toast,{childList:true,subtree:true,characterData:true});
}
})();