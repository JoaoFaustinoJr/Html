(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_EXPORT_V3__)return;
window.__TIA_TATI_KIDS_CARDS_EXPORT_V3__=true;
const notice=t=>{if(window.TiaTatiCardsNotice)window.TiaTatiCardsNotice(t);};
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
async function stickerBlob(card){
 const img=await loadImage(card.sprite+'?v=4');
 const half=img.naturalWidth/2, sx=card.side?half:0, sy=0, sw=half, sh=img.naturalHeight;
 const scale=3, canvas=document.createElement('canvas');canvas.width=Math.round(sw*scale);canvas.height=Math.round(sh*scale);
 const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,sx,sy,sw,sh,0,0,canvas.width,canvas.height);
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('blob')),'image/png',1));
}
async function downloadSticker(card){
 try{
  const blob=await stickerBlob(card),url=URL.createObjectURL(blob),name='figurinha-tia-tati-'+card.id+'.png';
  const a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),5000);notice('Figurinha enviada para Downloads 💗');
 }catch(err){
  try{
   const blob=await stickerBlob(card),file=new File([blob],'figurinha-tia-tati-'+card.id+'.png',{type:'image/png'});
   if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:card.title,files:[file]});return;}
  }catch(_){}
  notice('Não foi possível baixar agora. Tente novamente.');
 }
}
window.TiaTatiCardExport={downloadSticker};
})();