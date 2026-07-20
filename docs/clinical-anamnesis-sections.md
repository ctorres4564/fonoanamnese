# Adequação clínica das seções da anamnese

## Seções ativas

- Dados da Entrevista
- Queixa Principal
- Gestação, Parto e Neonatal
- Desenvolvimento Motor
- Desenvolvimento da Linguagem (antiga Comunicação Inicial)
- Histórico de Saúde
- Histórico Familiar
- Rotina da Criança

## Seções retiradas do fluxo ativo

- Comunicação Visual: não havia seção, chave persistida ou implementação independente no código anterior. Campos visuais pertencentes ao Desenvolvimento da Linguagem, como contato ocular, continuam nessa seção.

## Simplificações adicionais

Em Desenvolvimento Motor foram retirados do fluxo ativo Equilíbrio e Coordenação Global, Regressão, Histórico Terapêutico e Condições Gerais. Coordenação Motora Fina permanece. Em Desenvolvimento da Linguagem foram retirados Primeiras Palavras e Frases, Comunicação Suplementar ou Alternativa e Regressão Comunicativa Geral. Os campos antigos continuam preservados nos objetos históricos.

- Linguagem Receptiva e Expressiva: chave legada `sections.languageDevelopment`.
- Fala e Articulação: chave legada `sections.speechDevelopment`.

As chaves legadas continuam aceitas no modelo de leitura e são preservadas pelo salvamento por merge. Elas não participam da navegação, validação obrigatória, progresso, revisão ou novos relatórios. Não há migração nem escrita de `null` nesses campos.

## Situação diagnóstica

O diagnóstico fica em `sections.interviewData`:

- `diagnosticStatus`: `not_informed`, `under_investigation` ou `established`;
- `diagnosis`: obrigatório somente quando o status é `established`;
- `diagnosisCid`: opcional;
- `diagnosisDate`: opcional;
- `diagnosisResponsible`: opcional;
- `diagnosisObservations`: opcional.

Registros anteriores sem `diagnosticStatus` permanecem sem valor. O sistema não infere diagnóstico nem CID.

## Relatório e PDF

A visualização finalizada exibe somente os campos diagnósticos existentes, junto à identificação clínica. As seções retiradas não aparecem em novas visualizações. O projeto ainda não possui um gerador de PDF; portanto, não houve código de PDF a alterar ou testar nesta adequação.
