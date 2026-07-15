# Guia de Contribuição - FonoAnamnese

Obrigado pelo seu interesse em contribuir para o projeto **FonoAnamnese**! Este documento descreve as diretrizes de desenvolvimento, regras de codificação e padrões de commit adotados no projeto.

---

## 🛠️ Fluxo de Trabalho Recomendado

1. **Alterações Pequenas e Coesas**: Divida o seu trabalho em alterações incrementais. Evite reescrever arquivos completos sem necessidade e evite misturar recursos não relacionados na mesma contribuição.
2. **Qualidade Local**: Antes de propor commits, certifique-se de validar seu código executando os testes e os analisadores estáticos de código.
3. **Commit Protegido**: Usamos Git Hooks via Husky que validam o código no pré-commit (`npm run lint:js && npm run format`). O commit será abortado caso haja erros no ESLint ou formatação inadequada.

---

## 📋 Padrão de Codificação e Estilo

- **Linter**: O código deve passar em todas as regras estipuladas no [ESLint](file:///c:/anamnese/.eslintrc.cjs) e no Oxlint.
- **Formatação**: Código formatado exclusivamente via Prettier utilizando as configurações descritas no arquivo [Prettierrc](file:///c:/anamnese/.prettierrc). Execute `npm run format` para aplicar as correções automaticamente.
- **Segurança**: Nunca versione chaves de API, senhas ou variáveis de ambiente confidenciais. Sempre utilize arquivos `.env` localmente (adicione os arquivos com credenciais reais no `.gitignore`).

---

## 🧪 Testes Unitários

Antes de alterar ou refatorar qualquer funcionalidade crítica:
1. Certifique-se de que os testes unitários existentes estão passando.
2. Crie ou atualize os testes unitários (utilizando **Vitest** e **React Testing Library**) para abranger as novas implementações.
3. A meta é manter a cobertura de testes do projeto alta e livre de regressões.

Execute os testes localmente com:
```bash
npm run test
```

---

## 💬 Padrão de Mensagens de Commit

Adotamos a especificação de [Conventional Commits](https://www.conventionalcommits.org/). Suas mensagens de commit devem ser estruturadas da seguinte forma:

```text
<tipo>(<escopo-opcional>): <descrição curta em português>

[corpo explicativo contendo o porquê e os impactos da mudança]
```

### Exemplos de tipos permitidos:
- `feat`: Uma nova funcionalidade ou componente (ex: `feat(ui): add theme toggle button`).
- `fix`: Correção de um bug (ex: `fix(auth): redirect user when session expires`).
- `docs`: Modificações em documentações (ex: `docs: update architectural flow diagrams`).
- `style`: Mudanças de estilo e formatação que não alteram lógica de negócio (Prettier, espaçamentos).
- `refactor`: Refatoração de código que não altera o comportamento final da aplicação.
- `test`: Criação ou ajuste de testes (ex: `test: add unit tests for Header component`).
- `chore`: Atualização de tarefas de build, dependências ou configurações (ex: `chore: install vitest coverage package`).

> **Importante**: Nunca utilize mensagens genéricas de commit como `update`, `fix`, `ajustes` ou `commit`. Explique detalhadamente no corpo do commit a motivação da alteração.
