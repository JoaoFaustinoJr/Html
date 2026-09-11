# Tia Tati — versões ativas

Atualizado em 11/09/2026 após auditoria, consolidação e aplicação das novas identidades visuais.

## Portal
- Entrada: `tia-tati/index.html`
- Service worker ativo: `tia-tati/sw.js` — cache `tia-tati-portal-pwa-v9`
- Kids: `tia-tati/launch-kids.html`
- Jovem: `tia-tati/launch-jovem.html`

## Modo Jovem
- Entrada principal: `tia-tati-jovem/entry-j20.html`
- Runtime funcional: `tia-tati-jovem/jovem-v20.js`
- Ponte de artes: `tia-tati-jovem/jovem-assets-j20.js`
- Identidade ilustrada ativa: `tia-tati-jovem/jovem-illustrated-v23.js`
- Tema visual ativo: `tia-tati-jovem/jovem-theme-v23.css`
- Tradução: `tia-tati-jovem/jovem-ptbr-j16.js`
- Música: `tia-tati-jovem/jovem-music-v1.js`
- Manual: `tia-tati-jovem/manual-jovem.html`
- Service worker: `tia-tati-jovem/sw.js` — cache `tia-tati-jovem-pwa-v23`
- Assets principais estáveis: `reflexo-neon.webp`, `memorize.webp`, `beat-move.webp`, `welcome.webp`, `relax.webp`, `guide.webp` e `pulse-lab.svg`.

As entradas antigas permanecem apenas por compatibilidade. `entry-j12.html`, usada por links legados do Portal, redireciona para a experiência visual v23.

## Área Kids
- Entrada: `tia-tati-kids/index.html`
- Motor: `tia-tati-kids/app.js`
- Camadas ativas: `kids-audio-v1.js`, `kids-music-v1.js`, `voice-export-v1.js`, `final-avatar-v1.js`
- CSS ativo: `styles.css`, que importa `styles-core-v39.css`, `kids-shell-v1.css` e `kids-theme-v2.css`.
- Tema visual ativo: `kids-theme-v2.css`, baseado na identidade clara, ilustrada e acolhedora aprovada.
- Service worker: `tia-tati-kids/sw.js` — layout `kids-layout-v5`.

## Direção visual oficial
- Kids: interface clara, suave, ilustrada, com rosa, azul e cartões acolhedores.
- Jovem: interface azul-marinho/neon, ilustrada, com ciano, magenta e roxo, mantendo linguagem madura e de desafio.
- As duas experiências compartilham a personagem Tia Tati, mas com linguagens visuais adequadas ao público.

## Regra de manutenção
Não reativar arquivos `final-v44`, `identity-v45`, entradas Jovem anteriores ou card-fixes antigos sem uma necessidade específica. Novas correções devem ser feitas sobre as entradas ativas acima, evitando novas camadas paralelas.

## Recuperação
Antes da atualização visual foi criado o branch `backup/tia-tati-before-visual-v23`. Em caso de regressão, usar esse branch como referência em vez de reintroduzir hotfixes antigos no `main`.
