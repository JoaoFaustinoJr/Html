(()=>{
'use strict';
const VERSION='50';
const toast=document.getElementById('shellToast');

function showToast(msg){
 if(!toast)return;
 toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);
 showToast.t=setTimeout(()=>toast.classList.remove('show'),1800);
}

function applyApprovedIdentity(){
 const hero=document.querySelector('.hero-tati>img');
 if(hero){hero.src='assets/success.webp';hero.alt='Tia Tati';Object.assign(hero.style,{objectPosition:'center 18%',filter:'none'});}
 const brand=document.querySelector('.shell-brand');
 const avatar=brand&&brand.querySelector('img');
 if(avatar&&!avatar.dataset.v50Crop){
  avatar.dataset.v50Crop='1';avatar.src='assets/success.webp';
  const crop=document.createElement('span');crop.setAttribute('aria-hidden','true');
  Object.assign(crop.style,{width:'50px',height:'50px',borderRadius:'17px',overflow:'hidden',position:'relative',display:'block',flex:'0 0 50px',background:'#fff',border:'3px solid #fff',boxShadow:'0 6px 18px rgba(33,74,105,.12)'});
  avatar.parentNode.insertBefore(crop,avatar);crop.appendChild(avatar);
  Object.assign(avatar.style,{position:'absolute',width:'92px',height:'92px',maxWidth:'none',left:'50%',top:'46%',transform:'translate(-50%,-50%)',objectFit:'cover',objectPosition:'center 18%',border:'0',borderRadius:'0',boxShadow:'none'});
 }
 const youth=[['react','⚡','🧠','#19e7ff','#ff39b8'],['memory','1 2 3 4','✦','#8d5cff','#2eefff'],['beat','♫','♪','#ff35bb','#34e8ff']];
 youth.forEach(([key,main,side,c1,c2])=>{
  const card=document.querySelector(`[data-open="${key}"]`);const art=card&&card.querySelector('.yart');
  if(!art||art.dataset.v50)return;art.dataset.v50='1';
  art.innerHTML=`<span style="position:absolute;inset:0;background:radial-gradient(circle at 28% 35%,${c1}55,transparent 24%),radial-gradient(circle at 76% 62%,${c2}55,transparent 26%),linear-gradient(145deg,#07133e,#10165e)"></span><b style="position:relative;z-index:2;font-size:${key==='memory'?'25px':'52px'};letter-spacing:${key==='memory'?'.12em':'0'};color:#fff;text-shadow:0 0 9px ${c1},0 0 22px ${c2}">${main}</b><i style="position:absolute;right:14px;top:10px;z-index:2;font-style:normal;font-size:22px;color:#fff;text-shadow:0 0 12px ${c2}">${side}</i><span style="position:absolute;left:10%;right:10%;bottom:10px;height:2px;background:linear-gradient(90deg,transparent,${c1},${c2},transparent);box-shadow:0 0 8px ${c1}"></span>`;
  Object.assign(art.style,{background:'#07133e',imageRendering:'auto'});
 });
}

function openActivity(key){
 if(key==='home'){window.scrollTo({top:0,behavior:'smooth'});return;}
 const url=new URL('./activity.html',location.href);
 url.searchParams.set('legacy','1');url.searchParams.set('shell',VERSION);url.searchParams.set('open',key);url.searchParams.set('t',Date.now().toString());
 location.assign(url.href);
}

document.addEventListener('click',e=>{
 const scroll=e.target.closest('[data-scroll]');
 if(scroll){const id=scroll.dataset.scroll;if(id==='top')window.scrollTo({top:0,behavior:'smooth'});else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const open=e.target.closest('[data-open]');
 if(open){e.preventDefault();e.stopPropagation();openActivity(open.dataset.open);return;}
 const card=e.target.closest('[data-card-open]');
 if(card){e.preventDefault();openActivity('interventions');}
},true);

applyApprovedIdentity();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v='+VERSION).catch(()=>{}));
})();
