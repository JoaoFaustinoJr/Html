(()=>{
'use strict';
if(window.__TIA_JOVEM_RENDER40__)return;window.__TIA_JOVEM_RENDER40__=true;
const q=(s,r=document)=>r.querySelector(s);
const css=`
#screen-home .youth-card-art.j40-art{position:relative!important;display:block!important;width:100%!important;aspect-ratio:2.88/1!important;overflow:hidden!important;background:linear-gradient(145deg,#06152f,#25105c)!important}
#screen-home .youth-card-art.j40-art>div{display:block!important}
#screen-home .j40-bg{position:absolute!important;inset:0!important;background:radial-gradient(circle at 18% 18%,rgba(38,228,255,.24),transparent 28%),radial-gradient(circle at 82% 78%,rgba(255,75,180,.25),transparent 32%),linear-gradient(135deg,#071538,#172465 56%,#45145f)!important}
#screen-home .j40-title{position:absolute!important;z-index:8!important;left:10px!important;top:8px!important;color:#fff!important;font:900 .56rem/1.1 system-ui!important;letter-spacing:.08em!important;text-shadow:0 2px 8px #000!important}
#screen-home .j40-ping-table{position:absolute!important;z-index:3!important;left:13%!important;right:13%!important;top:23%!important;bottom:16%!important;border:2px solid #53edff!important;border-radius:12px!important;box-shadow:0 0 18px rgba(58,230,255,.5),inset 0 0 22px rgba(53,213,255,.12)!important;background:rgba(4,15,41,.55)!important;transform:perspective(260px) rotateX(8deg)!important}
#screen-home .j40-ping-table:before{content:""!important;display:block!important;position:absolute!important;left:50%!important;top:0!important;bottom:0!important;border-left:2px dashed rgba(255,255,255,.55)!important}
#screen-home .j40-ping-table:after{content:""!important;display:block!important;position:absolute!important;left:0!important;right:0!important;top:50%!important;border-top:1px solid rgba(255,255,255,.18)!important}
#screen-home .j40-paddle{position:absolute!important;z-index:5!important;top:35%!important;width:8px!important;height:34%!important;border-radius:9px!important}
#screen-home .j40-paddle.left{left:16%!important;background:#42ebff!important;box-shadow:0 0 14px #42ebff!important}
#screen-home .j40-paddle.right{right:16%!important;background:#ff4ba8!important;box-shadow:0 0 14px #ff4ba8!important}
#screen-home .j40-ball{position:absolute!important;z-index:6!important;width:12px!important;height:12px!important;border-radius:50%!important;background:#fff!important;left:57%!important;top:43%!important;box-shadow:0 0 14px #fff!important}
#screen-home .j40-keyboard{position:absolute!important;z-index:3!important;left:10%!important;right:10%!important;top:25%!important;bottom:15%!important;display:grid!important;grid-template-columns:repeat(8,1fr)!important;padding:6px!important;background:#071126!important;border:2px solid rgba(73,229,255,.55)!important;border-radius:11px!important;box-shadow:0 0 20px rgba(48,221,255,.28)!important}
#screen-home .j40-key{display:block!important;position:relative!important;background:linear-gradient(#fff,#dce8f4)!important;border:1px solid #9aa9ba!important;border-radius:0 0 5px 5px!important}
#screen-home .j40-black{position:absolute!important;z-index:5!important;top:6px!important;width:8.5%!important;height:53%!important;background:linear-gradient(#080c16,#26304a)!important;border-radius:0 0 4px 4px!important;box-shadow:0 3px 7px #0008!important}
#screen-home .j40-b1{left:19%!important}#screen-home .j40-b2{left:31.5%!important}#screen-home .j40-b3{left:56.5%!important}#screen-home .j40-b4{left:69%!important}#screen-home .j40-b5{left:81.5%!important}
#screen-home .j40-note{position:absolute!important;z-index:7!important;right:7%!important;top:8%!important;font:900 2rem/1 system-ui!important;color:#ff59b8!important;text-shadow:0 0 15px #ff4ba8!important;transform:rotate(8deg)!important}
`;
function style(){if(q('#j40RenderStyle'))return;const s=document.createElement('style');s.id='j40RenderStyle';s.textContent=css;document.head.appendChild(s)}
function art(card,type){if(!card)return false;let box=q('.youth-card-art',card);if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box)}box.className='youth-card-art j40-art';if(type==='ping')box.innerHTML='<div class="j40-bg"></div><div class="j40-title">PING PONG FOCUS</div><div class="j40-ping-table"></div><div class="j40-paddle left"></div><div class="j40-paddle right"></div><div class="j40-ball"></div>';else box.innerHTML='<div class="j40-bg"></div><div class="j40-title">PIANO LAB</div><div class="j40-keyboard"><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-key"></div><div class="j40-black j40-b1"></div><div class="j40-black j40-b2"></div><div class="j40-black j40-b3"></div><div class="j40-black j40-b4"></div><div class="j40-black j40-b5"></div></div><div class="j40-note">♪</div>';return true}
function render(){style();const a=art(q('[data-jlab="ping-focus"]'),'ping');const b=art(q('[data-jlab="piano-lab"]'),'piano');return a&&b}
render();[250,650,950,1400,2200].forEach(t=>setTimeout(render,t));
const mo=new MutationObserver(()=>render());mo.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>mo.disconnect(),5000);
})();