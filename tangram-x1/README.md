# Tangram X1 — Arena

Portal separado do Tangram Educativo para partidas por sala.

## MVP de interface
Fluxo já implementado:
1. Professor cria sala.
2. Aluno entra com código + apelido.
3. Lobby.
4. Contagem regressiva.
5. Aula pedagógica.
6. Questões.
7. Arena de Tangram.
8. Ranking / revanche.

A interface possui uma demonstração local para validar experiência e design.

## Próxima etapa: sincronização entre aparelhos
O GitHub Pages hospeda somente arquivos estáticos. Para salas reais entre computadores diferentes, este portal precisa de um pequeno backend em tempo real. A arquitetura foi separada do Tangram principal justamente para permitir isso sem aumentar o peso do app educacional.

Opções recomendadas: Supabase Realtime ou Firebase. Armazenar apenas sala temporária, apelido, estado da partida, tempos e respostas necessárias à rodada; sem exigir conta de aluno.

## Autoria
Concepção e direção do produto: Prof. João Faustino Júnior.
