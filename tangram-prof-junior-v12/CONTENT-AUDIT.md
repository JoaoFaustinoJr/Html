# Tangram Educativo — auditoria de conteúdo

**Data da revisão:** 12/09/2026  
**Escopo:** aulas permanentes da R.A.I. e módulos especiais Prova Paraná.  
**Princípio:** distinguir rigorosamente conteúdo curricular oficial, integração interdisciplinar e material autoral de revisão.

## Fontes normativas e curriculares prioritárias

### Computação
- Resolução CNE/CEB nº 1, de 4 de outubro de 2022 — Normas sobre Computação na Educação Básica – Complemento à BNCC.
- Parecer CNE/CEB nº 2/2022 e tabelas de habilidades/competências da BNCC Computação.
- Ministério da Educação / Conselho Nacional de Educação.

Referências oficiais:
- https://www.gov.br/mec/pt-br/cne/pdf/normas-classificadas-por-assunto/base-nacional-comum-curricular-bncc/rceb001_22.pdf/view
- https://www.gov.br/mec/pt-br/cne/pdf/normas-classificadas-por-assunto/base-nacional-comum-curricular-bncc/pceb002_22.pdf/view

### Matemática — Paraná
- Referencial Curricular do Paraná / Currículo da Rede Estadual Paranaense (CREP), Matemática.
- Para o 5º ano, CREP 2021 — séries iniciais.
- Para 6º ao 9º ano, CREP 2021 — anos finais.

Referências oficiais:
- https://www.educacao.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-05/crep2021_matematica_seriesiniciais.pdf
- https://www.educacao.pr.gov.br/sites/default/arquivos_restritos/files/documento/2021-05/crep_matematica_2021_anosfinais.pdf

### Prova Paraná
- Matrizes de Referência oficiais de Matemática e Língua Portuguesa.
- Gabaritos oficiais das edições recentes.
- Apresentação e orientações da Prova Paraná.

Referências oficiais:
- https://www.provaparana.pr.gov.br/apresentacao
- https://www.provaparana.pr.gov.br/Pagina/Gabaritos
- https://www.provaparana.pr.gov.br/sites/prova/arquivos_restritos/files/documento/2025-12/matriz_referencia_2trimestre2025_ef_lingua_portuguesa.pdf
- https://www.provaparana.pr.gov.br/sites/prova/arquivos_restritos/files/documento/2025-12/matriz_referencia_2trimestre2025_ef_matematica.pdf

## Critérios aplicados

1. **Exatidão conceitual:** definições e exemplos não podem simplificar a ponto de se tornarem falsos.
2. **Correspondência de códigos:** um código BNCC/CREP só é citado quando a habilidade realmente sustenta o conteúdo da aula.
3. **Integração identificada:** quando Matemática dialoga com Computação, o texto usa expressões como “integração interdisciplinar” ou “ponte interdisciplinar”, evitando apresentar uma habilidade de outro componente como se fosse a habilidade principal da aula.
4. **Progressão por ano:** a linguagem e a formalização aumentam gradualmente do 5º ao 9º ano.
5. **Material autoral:** exemplos, desafios e questões do Tangram são autorais; alinhamento curricular não significa material oficial da Seed-PR ou do MEC.
6. **Prova Paraná:** recorrência significa prioridade de revisão baseada em matrizes/gabaritos anteriores; não é previsão de itens futuros.
7. **Narração:** símbolos matemáticos relevantes recebem normalização para leitura oral adequada pela R.A.I.

## Ajustes realizados nesta auditoria

### Programação
- Refinada a explicação sobre tipos de dados e variáveis para não sugerir que o tipo depende apenas do valor atual.
- Corrigida a referência da aula “Do algoritmo ao programa”: EF06CO03 é a habilidade central; EF06CO04 foi retirado como referência direta.
- Refinada a definição de lista em programação.
- Refinada a explicação de recursão e a relação entre EF08CO01 e projetos de EF08CO04.

### Mundo/Cultura Digital
- Corrigida a referência da aula de cyberbullying e produção digital: EF07CO10, referente a impactos ambientais/descarte, foi retirado; permanecem EF07CO08, EF07CO09 e EF07CO11.
- Refinada a definição de criptografia.
- Refinada a explicação do papel do sistema operacional.

### Matemática
- 5º ano: “Congruência, ampliação e redução” foi refocada em ampliação/redução proporcional, ângulos correspondentes e proporcionalidade dos lados, conforme PR.EF05MA18.
- 6º ano: removida associação indevida de EF06CO04 da aula de algoritmo geométrico; integração mantida com EF06CO02 de forma explícita.
- 7º ano: removido EF07CO02 da aula de fluxogramas, pois EF07CO02 trata de testes/depuração; a integração computacional passou a ser indicada sem código incorreto.
- 8º ano: sequência recursiva matemática e recursão de funções em Computação passaram a ser diferenciadas explicitamente.
- 8º ano: retirada PR.EF08MA16.s.8.51 da aula de congruência; a referência adequada passou a relacionar PR.EF08MA14.s.8.52 e PR.EF08MA18.s.8.55.
- 9º ano: retirada PR.EF09MA15.s.9.56 da aula de escala, porque essa habilidade trata especificamente de construção de polígono regular; a aula ficou ancorada em PR.EF09MA08.s.9.42, com integração interdisciplinar de EF09CO02.
- Refinadas formulações sobre isometrias, congruência, semelhança, perímetro e área.

### Narração da R.A.I.
Normalizações mantidas ou acrescentadas:
- `1/2` → “1 sobre 2”;
- `×` → “vezes”;
- `÷` → “dividido por”;
- `=` → “igual a”;
- `≈` → “aproximadamente”;
- `√2` → “raiz quadrada de 2”;
- `²` → “ao quadrado”;
- `³` → “ao cubo”;
- `45°` → “45 graus”;
- `%` → “por cento”.

## Situação dos arquivos

Revisados nesta passagem:
- `rai-fundamentos-v17.json`
- `rai-pensamento-v17.json`
- `rai-programacao-v17.json`
- `rai-matematica-v17.json`
- `rai-mundo-digital-v17.json`
- conteúdo de Língua Portuguesa do Especial Prova Paraná
- orientação do Professor no Especial Prova Paraná

A ausência de alteração em um arquivo revisado significa que não foi identificado erro conceitual ou de referência que justificasse mudança nesta passagem.

## Nota de transparência

O Tangram Educativo é um material educacional autoral. As referências BNCC, CREP e Prova Paraná são utilizadas para alinhamento e rastreabilidade pedagógica. O aplicativo não é material oficial do MEC, da Seed-PR ou da Prova Paraná e não reproduz questões oficiais como se fossem próprias.
