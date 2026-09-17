/* v47 — related devotional project */
(function(){
 const H='https://joaofaustinojr.github.io/Faustino/medieval/';
 function addLink(){
  const root=document.querySelector('.dm-about45 .dm-about-content');
  if(!root||root.querySelector('.dm-hildegarda-link'))return;
  const title=root.querySelector('h2');
  if(!title||title.textContent.trim()!=='Sobre o aplicativo')return;
  const box=document.createElement('div');box.className='dm-hildegarda-link';
  box.innerHTML='<p><b>Outra experiência devocional</b></p><p>A organização desta novena dialoga com uma experiência digital anterior dedicada a Santa Hildegarda de Bingen, também concebida para unir oração, leitura, jornada devocional e recursos digitais.</p><a href="'+H+'" target="_blank" rel="noopener noreferrer">✦ Conheça a Novena de Santa Hildegarda <span>›</span></a>';
  root.appendChild(box);
 }
 document.addEventListener('click',function(){setTimeout(addLink,30)},true);
 new MutationObserver(addLink).observe(document.documentElement,{childList:true,subtree:true});
})();