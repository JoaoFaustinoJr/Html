(()=>{
'use strict';
if(window.__TIA_TATI_MOSAIC_GAME__)return;
window.__TIA_TATI_MOSAIC_GAME__=true;

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';

const shapes=[
 {id:'square',name:'Quadrado',symbol:'■',color:'#55c76f'},
 {id:'triangle',name:'Triângulo',symbol:'▲',color:'#ffb92f'},
 {id:'diamond',name:'Losango',symbol:'◆',color:'#8c67e8'},
 {id:'circle',name:'Círculo',symbol:'●',color:'#ff5d96'}
];
const colors=['#ff5d96','#ffb92f','#55c76f','#4daaf7','#8c67e8','#ff7a45'];
const challenges=[
 {id:'free',label:'Livre',emoji:'✨',text:'Preencha o quadro do seu jeito.'},
 {id:'colors',label:'Todas as cores',emoji:'🌈',text:'Use todas as cores pelo menos uma vez.'},
 {id:'mirror',label:'Espelho',emoji:'🪞',text:'Crie lados parecidos, como em um espelho.'},
 {id:'border',label:'Moldura',emoji:'🖼️',text:'Faça uma moldura colorida nas bordas.'}
];

const css=`
.tt-mosaic-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-mosaic-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-mosaic-overlay,.tt-mosaic-overlay *{box-sizing:border-box}
.tt-mosaic-overlay{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-mosaic-overlay.open{display:block}
.tt-mosaic-shell{width:min(100%,680px);margin:auto;min-height:100dvh;padding:4px}
.tt-mosaic-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.97);border:1px solid #deebf0;border-radius:16px;padding:7px 9px;box-shadow:0 7px 20px #173d7112}
.tt-mosaic-brand strong{display:block;color:#0c4384;font-size:1rem}.tt-mosaic-brand small{display:block;color:#71889a;font-size:.61rem}
.tt-mosaic-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.tt-mosaic-hero{margin:5px 0;padding:7px;border-radius:17px;background:#fff;border:1px solid #e3edf2;box-shadow:0 6px 18px #173d7110}
.tt-mosaic-hero h1{margin:0;color:#0b4382;font-size:1.15rem}.tt-mosaic-hero p{margin:2px 0 0;color:#6e8293;font-size:.68rem}
.tt-mosaic-panel{background:#fff;border:1px solid #e0ecf1;border-radius:18px;padding:8px;box-shadow:0 7px 20px #173d7112}
.tt-mosaic-challenges{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px}
.tt-mosaic-challenge{border:0;border-radius:999px;padding:6px 8px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.63rem}
.tt-mosaic-challenge.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.tt-mosaic-hint{padding:7px;border-radius:12px;background:#f5fbff;color:#53758e;font-size:.66rem;text-align:center;margin-bottom:7px}
.tt-mosaic-board{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;width:min(92vw,430px);aspect-ratio:1;margin:0 auto;padding:5px;border:2px solid #cae4ef;border-radius:18px;background:#eaf6fb}
.tt-mosaic-cell{position:relative;border:0;border-radius:8px;background:#fff;display:grid;place-items:center;min-width:0;min-height:0;box-shadow:inset 0 0 0 1px #dfeef4;overflow:hidden;padding:0}
.tt-mosaic-cell span{font-size:clamp(20px,7vw,38px);line-height:1;transform:scale(.95)}
.tt-mosaic-toolbar{display:grid;grid-template-columns:1fr;gap:7px;margin-top:8px}
.tt-shape-palette,.tt-color-palette{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}
.tt-shape-btn{border:0;border-radius:14px;background:#f4f8fb;color:#214f7d;padding:7px 9px;font-weight:900;font-size:.65rem;min-width:68px}
.tt-shape-btn b{display:block;font-size:1.1rem}.tt-shape-btn.active{outline:3px solid #9bd9ff;background:#e9f7ff}
.tt-color-btn{width:34px;height:34px;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #c9dbe5}.tt-color-btn.active{box-shadow:0 0 0 3px #258dd0}
.tt-mosaic-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}
.tt-mosaic-actions button{border:0;border-radius:13px;padding:9px 5px;font-weight:900;font-size:.66rem}
.tt-mosaic-clear{background:#fff0f5;color:#a83a68}.tt-mosaic-random{background:#eef6fa;color:#315c7a}.tt-mosaic-check{background:#ffd34d;color:#6b5200}
.tt-mosaic-status{text-align:center;margin-top:7px;min-height:22px;color:#54758d;font-size:.68rem;font-weight:800}
@media(max-width:600px){
 .tt-mosaic-shell{padding:2px}.tt-mosaic-top{padding:6px 7px;border-radius:13px}
 .tt-mosaic-hero{padding:6px;border-radius:14px}.tt-mosaic-hero h1{font-size:1.05rem}.tt-mosaic-hero p{font-size:.62rem}
 .tt-mosaic-panel{padding:6px;border-radius:14px}
 .tt-mosaic-board{width:min(94vw,360px);gap:3px;padding:4px;border-radius:14px}
 .tt-mosaic-cell{border-radius:6px}.tt-mosaic-cell span{font-size:clamp(18px,8vw,32px)}
 .tt-shape-btn{min-width:62px;padding:6px;font-size:.59rem}.tt-color-btn{width:31px;height:31px}
 .tt-mosaic-actions button{padding:8px 4px;font-size:.61rem}
}
`;

function addStyle(){if($('#ttMosaicStyle'))return;const s=document.createElement('style');s.id='ttMosaicStyle';s.textContent=css;document.head.appendChild(s)}
function speak(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.9;u.pitch=1.08;speechSynthesis.speak(u)}catch(_){}}

let overlay=null,currentChallenge='free',currentShape=shapes[0],currentColor=colors[0],cells=[];
function addCard(){
 const g=$('.home-v22-missions');if(!g)return false;
 let b=g.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');
 if(!b){b=document.createElement('button');b.type='button';b.className='home-v22-mission tt-new-game-card tt-mosaic-card';g.appendChild(b)}
 b.dataset.newGame='mosaic';b.classList.add('tt-mosaic-card');
 b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Mosaico da Tia Tati" decoding="async"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔶</span><span><strong>Mosaico da Tia Tati</strong><small>Formas • cores • percepção visual</small><span class="tt-level-strip"><span>⭐ Criar</span><span>⭐⭐ Desafios</span></span></span></span><em>Nova missão</em>';
 b.onclick=open;return true;
}

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-mosaic-overlay';
 overlay.innerHTML='<div class="tt-mosaic-shell"><div class="tt-mosaic-top"><div class="tt-mosaic-brand"><strong>Mosaico da Tia Tati</strong><small>Formas • cores • percepção visual</small></div><button class="tt-mosaic-close">×</button></div><section class="tt-mosaic-hero"><h1>Monte seu mosaico</h1><p>Escolha uma forma e uma cor. Depois toque nos quadrinhos para preencher. Existem muitas soluções possíveis.</p></section><section class="tt-mosaic-panel"><div class="tt-mosaic-challenges"></div><div class="tt-mosaic-hint"></div><div class="tt-mosaic-board" aria-label="Quadro de mosaico"></div><div class="tt-mosaic-toolbar"><div class="tt-shape-palette"></div><div class="tt-color-palette"></div></div><div class="tt-mosaic-actions"><button class="tt-mosaic-clear">↺ Limpar</button><button class="tt-mosaic-random">🎲 Ideia</button><button class="tt-mosaic-check">⭐ Terminei</button></div><div class="tt-mosaic-status">Toque em uma forma para ouvir o nome.</div></section></div>';
 document.body.appendChild(overlay);
 $('.tt-mosaic-close',overlay).onclick=close;
 $('.tt-mosaic-clear',overlay).onclick=clearBoard;
 $('.tt-mosaic-random',overlay).onclick=randomIdea;
 $('.tt-mosaic-check',overlay).onclick=checkBoard;
 buildChallenges();buildShapes();buildColors();buildBoard();
}

function buildChallenges(){
 const box=$('.tt-mosaic-challenges',overlay);box.innerHTML='';
 challenges.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='tt-mosaic-challenge'+(c.id===currentChallenge?' active':'');b.textContent=c.emoji+' '+c.label;b.onclick=()=>{currentChallenge=c.id;$$('.tt-mosaic-challenge',overlay).forEach(x=>x.classList.toggle('active',x===b));$('.tt-mosaic-hint',overlay).textContent=c.text;speak(c.text)};box.appendChild(b)});
 $('.tt-mosaic-hint',overlay).textContent=challenges[0].text;
}

function buildShapes(){
 const box=$('.tt-shape-palette',overlay);box.innerHTML='';
 shapes.forEach((sh,i)=>{const b=document.createElement('button');b.type='button';b.className='tt-shape-btn'+(i===0?' active':'');b.innerHTML='<b>'+sh.symbol+'</b>'+sh.name;b.onclick=()=>{currentShape=sh;$$('.tt-shape-btn',overlay).forEach(x=>x.classList.toggle('active',x===b));$('.tt-mosaic-status',overlay).textContent=sh.name+' selecionado.';speak(sh.name)};box.appendChild(b)});
}
function buildColors(){
 const box=$('.tt-color-palette',overlay);box.innerHTML='';
 colors.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.className='tt-color-btn'+(i===0?' active':'');b.style.background=c;b.setAttribute('aria-label','Escolher cor');b.onclick=()=>{currentColor=c;$$('.tt-color-btn',overlay).forEach(x=>x.classList.toggle('active',x===b))};box.appendChild(b)});
}
function buildBoard(){
 const board=$('.tt-mosaic-board',overlay);board.innerHTML='';cells=[];
 for(let i=0;i<36;i++){const b=document.createElement('button');b.type='button';b.className='tt-mosaic-cell';b.dataset.index=i;b.onclick=()=>paintCell(b);b.oncontextmenu=e=>{e.preventDefault();eraseCell(b)};board.appendChild(b);cells.push(b)}
}
function paintCell(cell){
 cell.dataset.shape=currentShape.id;cell.dataset.color=currentColor;cell.innerHTML='<span style="color:'+currentColor+'">'+currentShape.symbol+'</span>';
 cell.style.background='#fff';
}
function eraseCell(cell){cell.dataset.shape='';cell.dataset.color='';cell.innerHTML=''}
function clearBoard(){cells.forEach(eraseCell);$('.tt-mosaic-status',overlay).textContent='Quadro limpo. Vamos criar outra vez!'}
function randomIdea(){
 cells.forEach((c,i)=>{if(Math.random()<.72){const sh=shapes[(i+Math.floor(Math.random()*shapes.length))%shapes.length],col=colors[(i+Math.floor(Math.random()*colors.length))%colors.length];c.dataset.shape=sh.id;c.dataset.color=col;c.innerHTML='<span style="color:'+col+'">'+sh.symbol+'</span>'}else eraseCell(c)});
 $('.tt-mosaic-status',overlay).textContent='Uma ideia apareceu. Você pode mudar tudo!';speak('Uma ideia apareceu. Agora mude do seu jeito.')
}
function checkBoard(){
 const filled=cells.filter(c=>c.dataset.shape).length;
 if(filled===36){$('.tt-mosaic-status',overlay).textContent='🌟 Quadro completo! Seu mosaico ficou pronto.';speak('Muito bem! Você completou o mosaico!');return}
 $('.tt-mosaic-status',overlay).textContent='Faltam '+(36-filled)+' espaços. Continue preenchendo.';speak('Ainda faltam alguns espaços.')
}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden';speak('Vamos montar um mosaico. Escolha uma forma e uma cor.')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');if(!b)return false;b.dataset.newGame='mosaic';b.onclick=open;return true}

addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();