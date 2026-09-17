/* v48 — share message with a real clickable URL */
(function(){
 const URL='https://joaofaustinojr.github.io/Html/divina-misericordia/';
 const TEXT='🙏 *Novena da Divina Misericórdia*\n\n“Jesus, eu confio em Vós.”\n\nReze conosco esta Novena. São nove dias de oração, meditação, Terço da Divina Misericórdia e reflexão.\n\nAcesse a Novena pelo link abaixo:\n'+URL;
 async function share(){
   if(navigator.share){
     try{await navigator.share({title:'Novena da Divina Misericórdia',text:TEXT});return}catch(e){if(e&&e.name==='AbortError')return}
   }
   location.href='https://wa.me/?text='+encodeURIComponent(TEXT);
 }
 function bind(){
   const b=document.querySelector('.dm-share');
   if(!b||b.dataset.share48)return;
   b.dataset.share48='1';
   b.onclick=function(e){e.preventDefault();e.stopPropagation();share()};
 }
 document.addEventListener('click',function(e){if(e.target.closest('.dm-share')){e.preventDefault();e.stopImmediatePropagation();share()}},true);
 new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();