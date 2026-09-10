(()=>{
'use strict';
const V='59';
const params=new URLSearchParams(location.search);
const key=params.get('route')||params.get('open');
if(!key)return;

const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const app=q('#app');

function activate(id){
 const target=q('#screen-'+id);
 if(!target)return false;
 qa('.screen').forEach(s=>s.classList.remove('active'));
 target.classList.add('active');
 if(app){
  app.classList.toggle('road-setup-mode',id==='roadsetup');
  app.classList.toggle('bee-setup-mode',id==='beesetup');
  app.classList.toggle('target-setup-mode',id==='targetsetup');
  app.classList.toggle('hands-setup-mode',id==='handssetup');
  app.classList.toggle('light-setup-mode',id==='lightsetup');
 }
 qa('#bottomNav button').forEach(b=>b.classList.remove('active'));
 window.scrollTo({top:0,left:0,behavior:'auto'});
 document.documentElement.dataset.tiaTatiRoute=key;
 return true;
}

const map={
 road:'roadsetup',bee:'beesetup',target:'targetsetup',hands:'handssetup',
 react:'lightsetup',memory:'lightsetup',beat:'lightsetup',
 sensory:'sensorysetup',pulse:'sensorysetup',
 breathe:'breathesetup',restart:'breathesetup',
 movequest:'physicalsetup',
 circuit:'circuit',voice:'voice',reports:'reports',fisio:'fisio',interventions:'interventions'
};

function applyVariant(){
 try{
  if(['react','memory','beat'].includes(key)){
   const b=q(`[data-light-mode="${key}"]`); if(b) b.click();
  }
  if(key==='pulse') q('[data-sensory-profile="pulse"]')?.click();
  if(key==='restart') q('[data-breathe-mode="reset"]')?.click();
  if(key==='movequest') q('[data-physical-profile="quest"]')?.click();
 }catch(_){ }
}

let done=false;
function route(){
 if(done)return true;
 const id=map[key];
 if(!id)return false;
 if(!activate(id))return false;
 done=true;
 setTimeout(applyVariant,0);
 return true;
}

// Todos os módulos foram carregados antes deste arquivo pelo app.js.
// Ainda assim, repete por um curto período para acomodar telas criadas dinamicamente.
if(!route()){
 let n=0;
 const timer=setInterval(()=>{
  n++;
  if(route()||n>40)clearInterval(timer);
 },50);
}

// Na navegação direta, o botão voltar/início deve retornar para a home nova.
document.addEventListener('click',e=>{
 const h=e.target.closest('[data-home],#homeBrand,[data-nav="home"],.sensory-v40-home,.v41-breathe-home,.v41-physical-home');
 if(!h)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 location.href='./?v='+V+'&t='+Date.now();
},true);
})();
