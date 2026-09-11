# Tia Tati — versões ativas

Atualizado em 11/09/2026 após auditoria e consolidação segura.

## Portal
- Entrada: `tia-tati/index.html`
- Service worker ativo: `tia-tati/sw.js` — cache `tia-tati-portal-pwa-v9`
- Kids: `tia-tati/launch-kids.html`
- Jovem: `tia-tati/launch-jovem.html`

## Modo Jovem
- Entrada principal: `tia-tati-jovem/entry-j20.html`
- Runtime visual: `tia-tati-jovem/jovem-v20.js`
- Artes: `tia-tati-jovem/jovem-assets-j20.js`
- Tradução: `tia-tati-jovem/jovem-ptbr-j16.js`
- Música: `tia-tati-jovem/jovem-music-v1.js`
- Manual: `tia-tati-jovem/manual-jovem.html`
- Service worker: `tia-tati-jovem/sw.js` — cache `tia-tati-jovem-pwa-v20`
- Cards nítidos: `reflexo-neon-v2.webp`, `memorize-v2.webp`, `ritmo-movimento-v2.webp`

As entradas `entry-j9.html`, `entry-j10.html`, `entry-j11.html`, `entry-j12.html` e `entry-j19.html` são mantidas apenas por compatibilidade e redirecionam para a v20.

## Área Kids
- Entrada: `tia-tati-kids/index.html`
- Motor: `tia-tati-kids/app.js`
- Camadas ativas: `kids-audio-v1.js`, `kids-music-v1.js`, `voice-export-v1.js`, `final-avatar-v1.js`
- CSS ativo: `styles.css`, que importa `styles-core-v39.css` e `kids-shell-v1.css`
- Service worker: `tia-tati-kids/sw.js`

## Regra de manutenção
Não reativar arquivos `final-v44`, `identity-v45`, entradas Jovem anteriores ou card-fixes antigos sem uma necessidade específica. Novas correções devem ser feitas sobre as entradas ativas acima, evitando novas camadas paralelas.

## Recuperação
Antes da consolidação foram mantidos branches de backup no repositório. Em caso de regressão, usar o branch de backup anterior à v20 como referência, em vez de reintroduzir hotfixes antigos no `main`.
