/* v47 — cross-link to the Santa Hildegarda novena in About */
(function(){
 const H='https://joaofaustinojr.github.io/Faustino/medieval/';
 function addLink(){
   const root=document.querySelector('.dm-about45 .dm-about-content');
   if(!root||root.querySelector('.dm-hildegarda-link'))return;
   const title=root.querySelector('h2');
   if(!title||title.textContent.trim()!=='Sobre o aplicativo')return;
   const box=document.createElement('p');
   box.className='dm-hildegarda-link';
   box.innerHTML='Conheça também a <a href="'+H+'" target="_blank" rel="noopener">Novena de Santa Hildegarda</a>, experiência devocional digital que serviu como referência de organização e navegação para este projeto.';
   root.appendChild(box);
 }
 document.addEventListener('click',function(e){
   if(e.target.closest('.dm-about-list button,.dm-about-back'))setTimeout(addLink,30);
 },true);
 new MutationObserver(addLink).observe(document.documentElement,{childList:true,subtree:true});
})();