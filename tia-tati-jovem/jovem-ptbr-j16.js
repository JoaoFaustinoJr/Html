(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_PTBR_J16__)return;
window.__TIA_TATI_JOVEM_PTBR_J16__=true;

const EXACT=new Map([
 ['NICE ⚡','LEGAL ⚡'],
 ['Nice ⚡','Legal ⚡'],
 ['BEAT & MOVE','RITMO E MOVIMENTO'],
 ['Beat & Move','Ritmo e Movimento'],
 ['ON BEAT ⚡','NO RITMO ⚡'],
 ['BEAT','RITMO'],
 ['FLOW','FLUXO'],
 ['Flow','Fluxo'],
 ['PULSE','PULSO'],
 ['Pulse','Pulso'],
 ['BOOST','IMPULSO'],
 ['Boost','Impulso'],
 ['PULSE LAB','LABORATÓRIO DO PULSO'],
 ['Pulse Lab','Laboratório do Pulso'],
 ['MOVE QUEST','MISSÃO MOVIMENTO'],
 ['Move Quest','Missão Movimento'],
 ['START','INÍCIO'],
 ['CHECKPOINT','ETAPA'],
 ['CHECKPOINTS','ETAPAS'],
 ['Checkpoint','Etapa'],
 ['Checkpoints','Etapas'],
 ['Focus','Foco'],
 ['FOCUS','FOCO'],
 ['Reset','Recomeço'],
 ['RESET','RECOMEÇO']
]);

function translateTextNode(node){
 if(node.nodeType!==Node.TEXT_NODE)return;
 const raw=node.nodeValue;
 if(!raw||!raw.trim())return;
 const lead=raw.match(/^\s*/)?.[0]||'';
 const tail=raw.match(/\s*$/)?.[0]||'';
 const core=raw.trim();
 const next=EXACT.get(core);
 if(next&&next!==core)node.nodeValue=lead+next+tail;
}

function walk(root){
 if(!root)return;
 if(root.nodeType===Node.TEXT_NODE){translateTextNode(root);return;}
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let n;while((n=walker.nextNode()))translateTextNode(n);
}

function apply(){walk(document.body);}

const start=()=>{
 apply();
 const obs=new MutationObserver(muts=>{
  muts.forEach(m=>{
   if(m.type==='characterData')translateTextNode(m.target);
   m.addedNodes.forEach(walk);
  });
 });
 obs.observe(document.body,{subtree:true,childList:true,characterData:true});
 [100,350,900,1800].forEach(ms=>setTimeout(apply,ms));
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();