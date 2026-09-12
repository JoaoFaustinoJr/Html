(()=>{
'use strict';
function notice(t){if(window.TiaTatiCardsNotice)window.TiaTatiCardsNotice(t);}
function downloadSticker(card){
 const a=document.createElement('a');
 a.href=card.img+'?v=3';
 a.download='figurinha-tia-tati-'+card.id+'.webp';
 a.rel='noopener';
 document.body.appendChild(a);
 a.click();
 a.remove();
 notice('Figurinha enviada para Downloads 💗');
}
window.TiaTatiCardExport={downloadSticker};
})();