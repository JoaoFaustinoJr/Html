# Tangram Educativo — runtime ativo

Mapa de produção para evitar duplicidades e exclusões acidentais.

## Produção
- URL: `/Html/tangram-prof-junior-v12/`
- Versão lógica: **15.10.3**
- Cache PWA: **tangram-rai-v12-69**
- Atualização/PWA: `update-manager-v14.js` + `sw.js`
- O `index.html` ainda depende dos cinco `chunk*.txt` de `../tangram-prof-junior/`; não remover enquanto o núcleo não for consolidado.

## JS ativo
`app-v10.js`, `comfort-v11.js`, `performance-v12.js`, `rai-tutor-v13.js`, `rai-aula-v17.js`, `aulas-entry-v1595.js`, `prova-parana-v1.js`, `prova-parana-rewards-v1.js`, `prova-parana-mastery-v1.js`, `prova-parana-welcome-v1.js`, `pp-lp-7-v1.js`, `pp-lp-8-v1.js`, `pp-lp-9-v1.js`, `ios-install-v1.js`, `game-polish-v13.js`, `gamer-official-v1.js`, `update-manager-v14.js`.

## CSS ativo
`v10.css`, `comfort-v11.css`, `focus-v11.css`, `performance-v12.css`, `rai-tutor-v13.css`, `rai-aula-v14.css`, `rai-aula-v16.css`, `rai-aula-v17.css`, `aulas-entry-v1595.css`, `prova-parana-v1.css`, `prova-parana-subjects.css`, `prova-parana-rewards-v1.css`, `prova-parana-welcome-v1.css`, `ios-install-v1.css`, `gamer-official-v1.css`, `shared-ui-v14.css`, `identity-v15.css`, `game-polish-v13.css`.

`rai-aula-v17.css` ainda herda estilos das versões 14 e 16; esses dois arquivos não são redundantes no runtime atual.

## Conteúdo pedagógico
Trilhas permanentes: `rai-fundamentos-v17.json`, `rai-pensamento-v17.json`, `rai-programacao-v17.json`, `rai-matematica-v17.json`, `rai-mundo-digital-v17.json`.

A revisão curricular e conceitual está documentada em `CONTENT-AUDIT.md`. A auditoria de 12/09/2026 usou como referências primárias a BNCC Computação, o Referencial Curricular do Paraná — Volume 2, o CREP/Referencial Curricular do Paraná em Matemática e matrizes/gabaritos oficiais recentes da Prova Paraná.

### Especial Prova Paraná 2026 — Matemática
`prova-parana-6-v1.json`, `prova-parana-7-v1.json`, `prova-parana-8a-v1.json`, `prova-parana-8b-v1.json`, `prova-parana-8c-v1.json`, `prova-parana-8d-v1.json`, `prova-parana-9-v1.json` e `prova-parana-professor-v1.json`.

Na auditoria v15.10.0, as aulas do 8º e 9º anos receberam descritores oficiais pertinentes, três questões autorais por aula e refinamento conceitual de proporcionalidade, equações, semelhança, relações métricas, radicais, área e volume.

### Especial Prova Paraná 2026 — Língua Portuguesa
`prova-parana-portugues-6-v1.json`, `pp-lp-7-v1.js`, `pp-lp-8-v1.js`, `pp-lp-9-v1.js` e `prova-parana-portugues-professor-v1.json`.

Os pacotes `pp-lp-7/8/9-v1.js` carregam dados pedagógicos estáticos codificados. Em futura consolidação, preferir convertê-los para JSON comum.

## Piloto de recompensas — v15.10.1
- `content-v12.json` acrescenta quatro desafios bônus ao conjunto de 10 desafios já existente, totalizando **14 desafios** no runtime: **11. Gato Espelhado**, **12. Corredor Invertido**, **13. Cisne Reflexo** e **14. Foguete Reverso**.
- Os quatro bônus são variações refletidas de desafios avançados existentes e trabalham explicitamente reflexão, rotação e invariantes geométricos.
- `prova-parana-mastery-v1.js` registra domínio da aula separadamente da simples conclusão. O critério é **mínimo de 2/3 das questões corretas**; em aulas de 3 itens, são necessários 2 acertos.
- O armazenamento de domínio usa `raiProvaParanaMasteryV1` e é espelhado em `raiProvaParana2026V2` para compatibilidade com o módulo de recompensas.
- `prova-parana-rewards-v1.js` controla a apresentação dos quatro desafios bônus: 1 aula dominada libera o primeiro, 2 liberam o segundo, 3 o terceiro e 4 o quarto.
- O app mostra antes do teste a mensagem **“Aprenda. Acerte. Desbloqueie.”**, progresso de domínio, tentativa novamente sem penalidade e celebração ao conquistar a recompensa.
- Os 10 desafios originais permanecem independentes do Especial Prova Paraná; a mecânica nova atua somente sobre os quatro bônus.

## Hotfix de acesso aos bônus — v15.10.3
- Causa identificada: o núcleo histórico usa `canAccess(i){ return i===0 || completed.has(i-1) }` e só registra o `click` de uma missão quando ela está liberada por essa sequência. Assim, apenas remover `disabled` dos níveis 11–14 não era suficiente: o botão parecia liberado, mas não tinha o listener interno para abrir o desafio.
- `prova-parana-rewards-v1.js` agora instala uma ponte sobre a função global `canAccess`, preservando a regra original para os níveis 1–10 e usando o domínio das aulas do Especial Prova Paraná para os níveis 11–14.
- Após instalar a ponte, o módulo chama o `renderLevels()` original para que os botões bônus sejam recriados já com os listeners internos corretos.
- Cada novo domínio dispara uma nova renderização segura da lista e libera imediatamente a missão correspondente.
- Botões bloqueados continuam realmente desabilitados; botões liberados usam o próprio fluxo nativo do Tangram para selecionar nível, `reset()` e iniciar a missão.

## Carimbo de abertura — v15.10.2
- `prova-parana-welcome-v1.js` + `prova-parana-welcome-v1.css` criam um aviso central em formato de carimbo sobre o Especial Prova Paraná e o desbloqueio de Missões Bônus.
- O aviso aparece uma vez por sessão da versão e permanece até o aluno escolher **Ir para o Especial**, **Agora não** ou fechar pelo X.
- O botão principal abre diretamente o Especial Prova Paraná.
- O texto é dinâmico conforme o progresso de 0/4 a 4/4 missões bônus.
- Quando uma aula atinge o domínio mínimo e dispara `rai-prova-mastered`, o carimbo reaparece como **“Nova Missão Bônus!”**.
- O aviso respeita `prefers-reduced-motion`.

## Instalação iPhone/iPad
`ios-install-v1.js` e `ios-install-v1.css` são carregados somente em iOS/iPadOS. O assistente intercepta o clique de instalação durante a fase de captura e tem prioridade sobre o instalador universal legado de `app-v10.js`. No Safari, orienta Compartilhar → Adicionar à Tela de Início → Adicionar; em navegadores internos, orienta abrir no Safari e oferece cópia do endereço.

## Auditoria de manutenção — 12/09/2026
- Removido `INSTALL-FIX.txt`: nota histórica sem função no runtime.
- Removido `brand-hero-v14.css`: folha antiga não carregada pelo runtime.
- Assistente iOS deixou de registrar listeners duplicados diretamente nos botões de instalação.
- `update-manager-v14.js` deixou de carregar CSS/JS do assistente iOS em Android, Windows e Linux.
- Estrutura Base64/chunks foi preservada; nenhuma reconstrução do núcleo foi feita nesta limpeza.
- O registro de Service Worker presente no núcleo legado foi mantido como redundância idempotente por segurança.
- O fallback de carregamento do tutor em `performance-v12.js` foi mantido como recuperação.

## Auditoria de conteúdo — 12/09/2026
- Matemática: referências CREP foram confrontadas com o objetivo efetivamente ensinado; associações indevidas foram removidas ou reclassificadas como integração interdisciplinar.
- Programação: revisados tipos de dados, implementação, listas e recursão.
- Mundo/Cultura Digital: corrigida referência de cyberbullying/produção digital e refinadas definições de sistema operacional e criptografia.
- Prova Paraná: mantido o princípio de trabalhar habilidades e recorrências sem afirmar antecipação de itens futuros.
- Narração matemática: ampliada para raiz quadrada, aproximação, graus, porcentagem e relações de igualdade/desigualdade.

## Regras
1. Atualizações offline essenciais exigem nova chave de cache em `sw.js`.
2. A versão visível é controlada por `update-manager-v14.js`.
3. Na narração: `R.A.I.` → **Raí**, seta à direita → **leva a**, `+` → **somado a**, `++` → **mais mais**; frações como `1/2` → **1 sobre 2**; `×` → **vezes**, `÷` → **dividido por**, `=` → **igual a**, `≈` → **aproximadamente**, `√2` → **raiz quadrada de 2**, `²` → **ao quadrado**, `³` → **ao cubo**, `45°` → **45 graus** e `%` → **por cento**. Barras em URLs e datas não devem ser convertidas como frações.
4. O Especial Prova Paraná usa conteúdo autoral e fontes oficiais no botão **Professor**; não deve prometer antecipar itens da avaliação.
5. No iOS, não tentar simular `beforeinstallprompt`; manter o fluxo nativo de Adicionar à Tela de Início e usar o assistente apenas para orientação.
6. Antes de remover qualquer arquivo, conferir `index.html`, `sw.js` e este mapa.
