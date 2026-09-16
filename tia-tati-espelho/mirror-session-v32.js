(()=>{
'use strict';
if(window.__TIA_TATI_MIRROR_SESSION_V32__)return;
window.__TIA_TATI_MIRROR_SESSION_V32__=true;

const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[?!.,;:…]/g,' ').replace(/\s+/g,' ').trim();
const pick=a=>a[Math.floor(Math.random()*a.length)];
const HESITATION=/^(?:h+m+|hu+m+|u+m+|ahn+|ah+|er+|eh+)$/;
const END=/^(?:nao|nao tenho|nao tenho mais duvidas|nenhuma|acabou|e so|so isso|era so isso|obrigado|obrigada|muito obrigado|muito obrigada|tchau|ate mais|ate logo|pode encerrar|fim)$/;
const farewell=()=>pick([
 'Tudo bem! Adorei conversar com você. Até a próxima! ✨',
 'Combinado! O Espelho Encantado vai descansar um pouquinho. Até logo! 💗',
 'Está bem. Quando surgir outra dúvida, estarei por aqui. Até a próxima! ✨'
]);

const roomAnswer=q=>{
 if(HESITATION.test(q)) return pick(['Pode pensar um pouquinho. Estou ouvindo. ✨','Hmm... sem pressa. Pense um pouquinho; eu estou ouvindo.','Tudo bem pensar antes de perguntar. Estou aqui. 💗']);
 if(END.test(q)) return farewell();
 if(/onde.*sol.*nasce|sol.*nasce|nascente.*sol/.test(q)) return 'O Sol nasce no Leste. Por isso o Leste também é chamado de nascente.';
 if(/contrario.*leste|oposto.*leste|qual.*oeste/.test(q)) return 'O ponto cardeal oposto ao Leste é o Oeste.';
 if(/contrario.*norte|oposto.*norte/.test(q)) return 'O ponto cardeal oposto ao Norte é o Sul.';
 if(/pontos cardeais|quais.*cardeais/.test(q)) return 'Os quatro pontos cardeais são Norte, Sul, Leste e Oeste. Eles nos ajudam a localizar lugares e direções.';
 if(/o que e norte|onde fica o norte/.test(q)) return 'Norte é um dos quatro pontos cardeais. Em mapas convencionais, ele costuma aparecer na parte de cima.';
 if(/o que e sul|onde fica o sul/.test(q)) return 'Sul é o ponto cardeal oposto ao Norte. Em mapas convencionais, costuma aparecer na parte de baixo.';
 if(/o que e leste|onde fica o leste/.test(q)) return 'Leste é o ponto cardeal associado à direção em que o Sol nasce.';
 if(/o que e oeste|onde fica o oeste/.test(q)) return 'Oeste é o ponto cardeal oposto ao Leste e está associado à direção em que o Sol se põe.';
 if(/margem esquerda.*rio|qual.*margem esquerda/.test(q)) return 'Olhando no sentido em que a água corre, da nascente para a foz, a margem esquerda fica à sua esquerda.';
 if(/margem direita.*rio|qual.*margem direita/.test(q)) return 'Olhando no sentido em que a água corre, da nascente para a foz, a margem direita fica à sua direita.';
 if(/o que e nascente|nascente.*rio/.test(q)) return 'A nascente é o lugar onde um rio começa.';
 if(/o que e foz|foz.*rio/.test(q)) return 'A foz é o lugar onde o rio termina, desaguando em outro rio, lago, mar ou oceano.';
 if(/montante/.test(q)) return 'Montante é a direção para a nascente do rio, ou seja, contra o sentido em que a água corre.';
 if(/jusante/.test(q)) return 'Jusante é a direção para a foz, acompanhando o sentido em que a água corre.';
 if(/que horas.*relogio|como.*ler.*relogio|ponteiro.*hora/.test(q)) return 'No relógio de ponteiros, o ponteiro pequeno indica as horas e o ponteiro grande indica os minutos.';
 if(/meia hora/.test(q)) return 'Meia hora tem 30 minutos. No relógio de ponteiros, o ponteiro dos minutos aponta para o número 6.';
 if(/um quarto de hora|quarto de hora/.test(q)) return 'Um quarto de hora corresponde a 15 minutos.';
 if(/notas musicais|quais.*notas|nome.*notas/.test(q)) return 'As sete notas musicais são Dó, Ré, Mi, Fá, Sol, Lá e Si. Depois a sequência pode recomeçar em outro Dó.';
 if(/o que e xilofone|xilofone/.test(q)) return 'O xilofone é um instrumento de percussão com lâminas de diferentes alturas sonoras. Cada lâmina produz uma nota quando é tocada.';
 if(/semaforo|sinal de transito/.test(q)) return 'No semáforo, vermelho significa parar, amarelo pede atenção e verde permite seguir quando o caminho está seguro.';
 if(/faixa de pedestre|atravessar.*rua/.test(q)) return 'Para atravessar, procure a faixa de pedestres, pare, observe os dois lados e só atravesse quando estiver seguro.';
 if(/direita.*esquerda|esquerda.*direita|lateralidade/.test(q)) return 'Direita e esquerda ajudam na lateralidade e na orientação do corpo. Uma dica é observar qual mão você costuma usar para escrever ou desenhar e partir dessa referência.';
 return null;
};

function installKnowledge(){
 const kb=window.TiaTatiMirrorKnowledge;
 if(!kb||kb.__sessionV32)return false;
 const original=typeof kb.answer==='function'?kb.answer.bind(kb):()=>null;
 kb.answer=function(raw){
   const q=norm(raw);
   const local=roomAnswer(q);
   return local!==null?local:original(q);
 };
 kb.__sessionV32=true;
 return true;
}

function shouldFollow(text){
 const q=norm(text);
 if(!q)return false;
 if(END.test(q)||HESITATION.test(q))return false;
 if(/tem mais alguma duvida/.test(q))return false;
 if(/ate a proxima|ate logo|vai descansar|estarei por aqui/.test(q))return false;
 return true;
}

function installSpeech(){
 if(!('speechSynthesis' in window)||window.speechSynthesis.__sessionV32)return false;
 const synth=window.speechSynthesis;
 const previous=synth.speak.bind(synth);
 synth.speak=function(u){
   try{
     if(u&&shouldFollow(u.text)) u.text=String(u.text).replace(/\s+$/,'')+' Tem mais alguma dúvida?';
   }catch(_){ }
   return previous(u);
 };
 synth.__sessionV32=true;
 return true;
}

function installToast(){
 const toast=document.getElementById('feedbackToast');
 if(!toast||toast.__sessionV32)return;
 toast.__sessionV32=true;
 let busy=false;
 new MutationObserver(()=>{
   if(busy)return;
   const text=toast.textContent||'';
   if(!text||/^Ouvi:/.test(text)||!shouldFollow(text))return;
   if(/Tem mais alguma dúvida\?/.test(text))return;
   busy=true;toast.textContent=text.replace(/\s+$/,'')+' Tem mais alguma dúvida?';busy=false;
 }).observe(toast,{childList:true,subtree:true,characterData:true});
}

function install(){installKnowledge();installSpeech();installToast();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,100);setTimeout(install,600);
})();