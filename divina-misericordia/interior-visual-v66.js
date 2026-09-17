/* v66 — linguagem visual interna inspirada no mockup; preserva navegação, hotspots e conteúdo. */
(function(){'use strict';
const $=s=>document.querySelector(s);
function css(){if($('#dm66css'))return;let s=document.createElement('style');s.id='dm66css';s.textContent=`
.dm66-portrait{position:relative;overflow:hidden;margin:18px 0 22px;border-radius:22px;min-height:245px;border:1px solid rgba(190,145,79,.45);background:#0a0c0e center/cover no-repeat;box-shadow:0 18px 45px rgba(0,0,0,.32)}
.dm66-portrait:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,8,.08),rgba(5,7,8,.25) 45%,rgba(5,7,8,.92) 100%)}
.dm66-copy{position:absolute;z-index:2;left:20px;right:20px;bottom:18px;color:#f3e7d8}.dm66-k{font:11px Georgia;letter-spacing:.19em;color:#d3a65e;text-transform:uppercase}.dm66-copy h3{font:28px/1.06 Georgia;margin:7px 0}.dm66-copy p{font:italic 15px/1.4 Georgia;margin:5px 0;color:#ddd0bf}
.dm66-faustina{background-image:linear-gradient(90deg,rgba(6,8,9,.1),rgba(6,8,9,.22)),url('https://www.vatican.va/news_services/liturgy/saints/img/20000430_faustina.jpg')}
.dm66-jp2{background-image:radial-gradient(circle at 70% 20%,rgba(141,28,37,.20),transparent 45%),linear-gradient(135deg,#1d1719,#080a0b)}
.dm66-shrine{background-image:radial-gradient(circle at 70% 15%,rgba(224,225,216,.12),transparent 34%),linear-gradient(145deg,#17191b,#090b0c)}
.dm66-jp2:before,.dm66-shrine:before{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(221,187,126,.22);font:72px Georgia}.dm66-jp2:before{content:'✝'}.dm66-shrine:before{content:'Ł'}
#content section{border-color:rgba(161,122,68,.42)!important}#content h3{font-family:Georgia,serif}.dm66-source{font:11px/1.4 Georgia;color:#8d7a66;margin-top:8px;text-align:right}
`;document.head.appendChild(s)}
function card(kind,k,title,sub){let d=document.createElement('div');d.className='dm66-portrait dm66-'+kind;d.innerHTML='<div class="dm66-copy"><div class="dm66-k">'+k+'</div><h3>'+title+'</h3><p>'+sub+'</p></div>';return d}
function decorate(){let c=$('#content');if(!c||c.dataset.dm66)return;c.dataset.dm66='1';let secs=[...c.querySelectorAll('section')];let f=secs.find(x=>/Santa Faustina|Com Santa Faustina/i.test(x.textContent||''));if(f&&!f.querySelector('.dm66-portrait')){let d=card('faustina','SANTA FAUSTINA KOWALSKA','A mensageira da Misericórdia','Confiança em Deus e misericórdia para com o próximo.');f.prepend(d)}let j=secs.find(x=>/João Paulo II|São João Paulo/i.test(x.textContent||''));if(j&&!j.querySelector('.dm66-portrait')){let d=card('jp2','SÃO JOÃO PAULO II','Testemunha da Misericórdia','De Cracóvia para a Igreja e para o mundo.');j.prepend(d)}let l=secs.find(x=>/Polônia|Cracóvia|Łagiewniki|Lagiewniki/i.test(x.textContent||''));if(l&&!l.querySelector('.dm66-portrait')){let d=card('shrine','KRAKÓW · ŁAGIEWNIKI','O Santuário da Divina Misericórdia','Um lugar ligado à missão de Santa Faustina e à peregrinação de São João Paulo II.');l.prepend(d)}}
function init(){css();decorate();document.addEventListener('click',e=>{if(e.target.closest('.daytab,.prev,.next'))setTimeout(()=>{let c=$('#content');if(c)delete c.dataset.dm66;decorate()},90)},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900));else setTimeout(init,900);
})();