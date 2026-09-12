# Tangram Educativo — runtime ativo

Mapa de produção para evitar duplicidades e exclusões acidentais.

## Produção
- URL: `/Html/tangram-prof-junior-v12/`
- Versão lógica: **15.9.9**
- Cache PWA: **tangram-rai-v12-62**
- Atualização/PWA: `update-manager-v14.js` + `sw.js`
- O `index.html` ainda depende dos cinco `chunk*.txt` de `../tangram-prof-junior/`; não remover enquanto o núcleo não for consolidado.

## JS ativo
`app-v10.js`, `comfort-v11.js`, `performance-v12.js`, `rai-tutor-v13.js`, `rai-aula-v17.js`, `aulas-entry-v1595.js`, `prova-parana-v1.js`, `pp-lp-7-v1.js`, `pp-lp-8-v1.js`, `pp-lp-9-v1.js`, `ios-install-v1.js`, `game-polish-v13.js`, `gamer-official-v1.js`, `update-manager-v14.js`.

## CSS ativo
`v10.css`, `comfort-v11.css`, `focus-v11.css`, `performance-v12.css`, `rai-tutor-v13.css`, `rai-aula-v14.css`, `rai-aula-v16.css`, `rai-aula-v17.css`, `aulas-entry-v1595.css`, `prova-parana-v1.css`, `prova-parana-subjects.css`, `ios-install-v1.css`, `gamer-official-v1.css`, `shared-ui-v14.css`, `identity-v15.css`, `game-polish-v13.css`.

`rai-aula-v17.css` ainda herda estilos das versões 14 e 16; esses dois arquivos não são redundantes no runtime atual.

## Conteúdo pedagógico
Trilhas permanentes: `rai-fundamentos-v17.json`, `rai-pensamento-v17.json`, `rai-programacao-v17.json`, `rai-matematica-v17.json`, `rai-mundo-digital-v17.json`.

### Especial Prova Paraná 2026 — Matemática
`prova-parana-6-v1.json`, `prova-parana-7-v1.json`, `prova-parana-8a-v1.json`, `prova-parana-8b-v1.json`, `prova-parana-8c-v1.json`, `prova-parana-8d-v1.json`, `prova-parana-9-v1.json` e `prova-parana-professor-v1.json`.

### Especial Prova Paraná 2026 — Língua Portuguesa
`prova-parana-portugues-6-v1.json`, `pp-lp-7-v1.js`, `pp-lp-8-v1.js`, `pp-lp-9-v1.js` e `prova-parana-portugues-professor-v1.json`.

Os pacotes `pp-lp-7/8/9-v1.js` carregam dados codificados para contornar uma limitação de escrita do conector durante esta atualização. São dados pedagógicos estáticos, não executam lógica da aplicação. Em futura consolidação, preferir convertê-los para JSON comum.

## Instalação iPhone/iPad
`ios-install-v1.js` e `ios-install-v1.css` são carregados somente em iOS/iPadOS. O assistente intercepta o clique de instalação no `document` durante a fase de captura, portanto tem prioridade sobre o instalador universal legado de `app-v10.js` sem criar dois fluxos visíveis. No Safari, orienta Compartilhar → Adicionar à Tela de Início → Adicionar; em navegadores internos, orienta abrir no Safari e oferece cópia do endereço.

## Auditoria de manutenção — 12/09/2026
- Removido `INSTALL-FIX.txt`: nota histórica sem função no runtime.
- Removido `brand-hero-v14.css`: folha antiga não carregada por `index.html`, `sw.js` nem pelo mapa ativo.
- Assistente iOS deixou de registrar listeners duplicados diretamente nos botões de instalação.
- `update-manager-v14.js` deixou de carregar CSS/JS do assistente iOS em Android, Windows e Linux.
- Estrutura Base64/chunks foi preservada; nenhuma reconstrução do núcleo foi feita nesta limpeza.
- O registro de Service Worker presente no núcleo legado foi mantido como redundância idempotente por segurança; consolidá-lo exige teste de entrada/PWA em todos os dispositivos.
- O fallback de carregamento do tutor em `performance-v12.js` foi mantido porque serve como recuperação se a entrada principal do tutor falhar.

## Regras
1. Atualizações offline essenciais exigem nova chave de cache em `sw.js`.
2. A versão visível é controlada por `update-manager-v14.js`.
3. Na narração: `R.A.I.` → **Raí**, seta à direita → **leva a**, `+` → **somado a**, `++` → **mais mais**; frações numéricas como `1/2` → **1 sobre 2**; `×` → **vezes**, `÷` → **dividido por**, `=` → **igual a**, `²` → **ao quadrado**, `³` → **ao cubo**. Barras em URLs e datas não devem ser convertidas como frações.
4. O Especial Prova Paraná usa conteúdo autoral e fontes oficiais no botão **Professor**; não deve prometer antecipar itens da avaliação.
5. No iOS, não tentar simular `beforeinstallprompt`; manter o fluxo nativo de Adicionar à Tela de Início e usar o assistente apenas para orientação.
6. Antes de remover qualquer arquivo, conferir `index.html`, `sw.js` e este mapa.
