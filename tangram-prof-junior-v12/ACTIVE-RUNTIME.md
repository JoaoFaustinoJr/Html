# Tangram Educativo — runtime ativo

Este arquivo documenta a composição da versão de produção para evitar duplicidades, exclusões acidentais e regressões.

## Produção

- URL permanente: `/Html/tangram-prof-junior-v12/`
- Versão lógica atual: **15.9.1**
- Gerenciador de atualização/versão: `update-manager-v14.js`
- Service Worker: `sw.js`

## Núcleo carregado

O `index.html` ainda reconstrói o núcleo histórico a partir dos cinco `chunk*.txt` da pasta `../tangram-prof-junior/` e depois aplica os patches atuais. Esses chunks são, portanto, dependências de produção e **não devem ser apagados** enquanto essa arquitetura permanecer.

## JS ativo

- `app-v10.js`
- `comfort-v11.js`
- `performance-v12.js`
- `rai-tutor-v13.js`
- `rai-aula-v17.js`
- `game-polish-v13.js`
- `gamer-official-v1.js`
- `update-manager-v14.js`

## CSS ativo

- `v10.css`
- `comfort-v11.css`
- `focus-v11.css`
- `performance-v12.css`
- `rai-tutor-v13.css`
- `rai-aula-v14.css`
- `rai-aula-v16.css`
- `rai-aula-v17.css`
- `gamer-official-v1.css`
- `shared-ui-v14.css`
- `identity-v15.css`
- `game-polish-v13.css`

### Atenção às aulas

`rai-aula-v17.css` herda estilos-base de `rai-aula-v14.css` e `rai-aula-v16.css`. Apesar dos nomes antigos, os três CSS são atualmente necessários. Já o JS de aulas ativo é somente `rai-aula-v17.js`.

## Conteúdo pedagógico ativo

- `rai-fundamentos-v17.json`
- `rai-pensamento-v17.json`
- `rai-programacao-v17.json`
- `rai-matematica-v17.json`
- `rai-mundo-digital-v17.json`
- `content-v12.json`

## PWA e identidade

- `manifest.webmanifest`
- `icon-192.png`
- `icon-512.webp`
- `apple-touch-icon.png`
- `rai-icon.svg`
- `tangram-share-v18.jpg`
- `../tangram-prof-junior/rai-chalk.webp`

## Regras de manutenção

1. Não adicionar um novo arquivo versionado quando uma correção pequena puder ser feita no módulo funcional já ativo.
2. Antes de remover um arquivo antigo, conferir `index.html`, `sw.js` e este mapa de runtime.
3. Toda mudança em um recurso offline essencial deve atualizar a chave `CACHE` do `sw.js`.
4. A versão mostrada ao usuário deve ser controlada por `APP_VERSION` em `update-manager-v14.js`.
5. A narração pedagógica deve passar pelo normalizador central: `R.A.I.` é falado como **Raí**, seta para a direita como **leva a** e `+` como **somado a**.
6. Não reintroduzir cronômetros, animações ou listeners duplicados sem verificar os módulos Gamer, Performance e Conforto.
7. Para uma futura consolidação do núcleo histórico, gerar primeiro uma versão estática paralela e validar jogabilidade, PWA/offline, Gamer, aulas e instalação antes de substituir a produção.
