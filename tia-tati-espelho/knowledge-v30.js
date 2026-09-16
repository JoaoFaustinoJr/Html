(()=>{
'use strict';
if(window.__TIA_TATI_MIRROR_KNOWLEDGE_V30__)return;
window.__TIA_TATI_MIRROR_KNOWLEDGE_V30__=true;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const jokes=[
'Por que o livro de matemática ficou triste? Porque tinha muitos problemas! 😄',
'O que o zero disse para o oito? Belo cinto! 😄',
'Por que o computador foi ao médico? Porque pegou um vírus! 🤭',
'O que a Lua disse ao Sol? Você me deixa sem palavras... só apareço quando você vai embora! 🌙',
'Qual é o animal mais antigo? A zebra, porque ainda é em preto e branco! 😄',
'Por que a vassoura não briga com ninguém? Porque ela sempre varre os problemas para longe! 🧹',
'O que um lápis disse para o outro? Você está com uma ponta ótima hoje! ✏️'
];
const prayers={
 santoAnjo:'Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém.',
 paiNosso:'Pai nosso que estais nos céus, santificado seja o vosso nome. Venha a nós o vosso Reino. Seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
 aveMaria:'Ave Maria, cheia de graça, o Senhor é convosco. Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.'
};
const facts=[
'O Sol é uma estrela. É uma imensa esfera de plasma e sua luz torna possível a vida na Terra.',
'A água pode existir como gelo, líquido e vapor. Três estados da matéria diante de um só elemento tão precioso.',
'As plantas fazem fotossíntese: usam luz, água e gás carbônico para produzir seu alimento e liberam oxigênio.',
'O corpo humano adulto possui 206 ossos. Um verdadeiro castelo sustentado por uma engenhosa estrutura.',
'O coração humano bate, em média, perto de cem mil vezes por dia. Um pequeno tambor trabalhando sem descanso.',
'A luz viaja mais rápido que o som. Por isso vemos o relâmpago antes de ouvirmos o trovão.',
'Os dinossauros viveram na Terra milhões de anos antes dos seres humanos. Muitos deles desapareceram há cerca de 66 milhões de anos.'
];
function answer(q){
 if(/(conte|fala|diga|quero).*(piada)|\bpiada\b/.test(q)){window.__TIA_TATI_LAST_KNOWLEDGE__='joke';return pick(['Escuta esta, jovem viajante... '+pick(jokes),'Das páginas do velho livro de risos... '+pick(jokes)]);}
 if(/conte outra|outra piada|mais uma/.test(q)&&window.__TIA_TATI_LAST_KNOWLEDGE__==='joke')return pick(jokes);
 if(/santo anjo|anjo da guarda/.test(q)){window.__TIA_TATI_LAST_KNOWLEDGE__='prayer';return 'Façamos silêncio por um instante. '+prayers.santoAnjo;}
 if(/pai nosso|rezar.*pai|oracao do senhor/.test(q)){window.__TIA_TATI_LAST_KNOWLEDGE__='prayer';return prayers.paiNosso;}
 if(/ave maria|rezar.*maria/.test(q)){window.__TIA_TATI_LAST_KNOWLEDGE__='prayer';return prayers.aveMaria;}
 if(/quais.*planetas|nome.*planetas|planetas.*sistema solar|quantos.*planetas/.test(q))return 'Oito mundos caminham ao redor do Sol: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.';
 if(/maior planeta/.test(q))return 'Júpiter é o maior planeta do Sistema Solar, um verdadeiro gigante entre os mundos.';
 if(/menor planeta/.test(q))return 'Mercúrio é o menor planeta do Sistema Solar e também o mais próximo do Sol.';
 if(/mais perto.*sol|planeta mais proximo.*sol/.test(q))return 'Mercúrio é o planeta mais próximo do Sol.';
 if(/mais longe.*sol|planeta mais distante.*sol/.test(q))return 'Netuno é o planeta mais distante do Sol entre os oito planetas.';
 if(/planeta vermelho/.test(q))return 'Marte é chamado de planeta vermelho por causa dos óxidos de ferro em seu solo.';
 if(/aneis|anel.*planeta/.test(q))return 'Saturno é famoso por seus belos anéis de gelo e rocha. Outros gigantes também possuem anéis, mas os de Saturno são os mais vistosos.';
 if(/o que e fotossintese|fotossintese/.test(q))return 'Fotossíntese é a magia verdadeira das plantas: elas usam luz, água e gás carbônico para produzir alimento e liberar oxigênio.';
 if(/por que o ceu e azul|ceu azul/.test(q))return 'A luz do Sol se espalha na atmosfera, e o azul se dispersa mais que muitas outras cores. Por isso nossos olhos veem o céu azul.';
 if(/quantos ossos|ossos.*corpo/.test(q))return 'Um adulto possui, em geral, 206 ossos. Um magnífico esqueleto sustentando todo o reino do corpo.';
 if(/coracao.*bate|batimentos.*dia/.test(q))return 'O coração costuma bater perto de cem mil vezes em um dia. Um guardião incansável dentro do peito.';
 if(/velocidade da luz|luz.*som|som.*luz/.test(q))return 'A luz é muito mais veloz que o som. Por isso o relâmpago aparece antes de o trovão chegar aos nossos ouvidos.';
 if(/dinossauro|dinossauros/.test(q))return 'Os dinossauros viveram muitos milhões de anos antes de nós. Os não aviários desapareceram há cerca de 66 milhões de anos.';
 if(/curiosidade|fato de ciencia|fato cientifico|me ensine ciencia|algo de ciencia/.test(q)){window.__TIA_TATI_LAST_KNOWLEDGE__='science';return pick(facts);}
 if(/conte outra|outra curiosidade|mais uma/.test(q)&&window.__TIA_TATI_LAST_KNOWLEDGE__==='science')return pick(facts);
 return null;
}
window.TiaTatiMirrorKnowledge={answer,jokes,prayers,facts};
})();