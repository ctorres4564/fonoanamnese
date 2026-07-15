# FonoAnamnese

[![CI](https://github.com/user/repo/actions/workflows/ci.yml/badge.svg)](https://github.com/user/repo/actions/workflows/ci.yml)

O **FonoAnamnese** é um sistema completo e moderno para gestão de prontuários, registros de pacientes e aplicação de anamneses fonoaudiológicas. Projetado especificamente para profissionais de fonoaudiologia, o sistema prioriza a segurança dos dados, conformidade e acessibilidade, oferecendo uma experiência premium com suporte completo a modo claro/escuro e uma paleta de cores voltada à área da saúde (Teal suave).

---

## 🚀 Tecnologias Utilizadas (Stack)

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build & Dev Tooling**: [Vite](https://vite.dev/)
- **Estilização**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Persistência & Autenticação**: [Firebase SDK v12](https://firebase.google.com/) (Auth e Firestore)
- **Validação de Schemas**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Testes**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) (cobertura com `@vitest/coverage-v8`)
- **Qualidade de Código**: [Oxlint](https://oxc.rs/docs/guide/usage/linter/overview) + [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) (validação no pré-commit)

---

## 📁 Estrutura de Diretórios

A estrutura do projeto está organizada da seguinte forma:

```text
/
├── .github/              # Workflows do GitHub Actions (CI)
├── .husky/               # Git Hooks para validação local pré-commit
├── docs/                 # Documentação técnica do projeto
│   └── architecture.md   # Arquitetura e fluxo de dados do sistema
├── prompts/              # Referências de prompts de IA
├── scripts/              # Scripts auxiliares do projeto
└── src/                  # Código-fonte principal
    ├── components/       # Componentes globais e reutilizáveis (ex: Header, ThemeToggle)
    ├── contexts/         # Contextos React (ex: AuthContext)
    ├── domains/          # Domínios de negócio específicos da anamnese
    │   └── anamnesis/    # Lógica estruturada por seções da anamnese
    ├── pages/            # Páginas e views do sistema (Auth, Patients, Profile, Editor)
    ├── schemas/          # Schemas de validação Zod (Auth, Patient, Guardian)
    ├── services/         # Integrações com Firebase e serviços externos
    ├── styles/           # Estilização global e arquivos de tema (theme.css)
    ├── test/             # Infraestrutura de testes unitários e mocks globais
    ├── types/            # Tipagens globais do TypeScript
    └── utils/            # Funções utilitárias auxiliares
```

---

## 🛠️ Instruções de Instalação e Execução

### Pré-requisitos

Certifique-se de possuir o [Node.js](https://nodejs.org/) (versão recomendada: LTS >= 20) instalado em sua máquina.

### Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd fonoanamnese
```

### Passo 2: Instalar as Dependências

```bash
npm install --legacy-peer-deps
```

> **Nota**: A flag `--legacy-peer-deps` é necessária para garantir a compatibilidade entre a versão atual do ESLint e plugins relacionados ao TypeScript.

### Passo 3: Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará ativo em `http://localhost:5173`.

### Passo 4: Executar Emuladores do Firebase (Opcional para testes locais)

Caso deseje testar a integração com o Firebase localmente usando os emuladores:

```bash
npm run emulators
```

---

## 🧪 Executando Testes e Qualidade de Código

### Testes Unitários

Para rodar toda a suíte de testes unitários com o Vitest e gerar o relatório de cobertura:

```bash
npm run test
```

### Testes das Regras de Segurança do Firestore

Para validar as regras do Firestore utilizando o emulador:

```bash
npm run test:rules
```

### Linter (Oxlint + ESLint)

Para realizar análise estática de qualidade no código:

```bash
npm run lint      # Executa o oxlint de forma super rápida
npm run lint:js   # Executa o ESLint para TypeScript, React e regras de acessibilidade
```

### Formatação de Código (Prettier)

Para garantir que o código siga as regras padrão de estilo do projeto:

```bash
npm run format
```

---

## 📄 Guia de Contribuição e Licença

Para instruções de como contribuir com o desenvolvimento deste projeto, consulte o arquivo [CONTRIBUTING.md](file:///c:/anamnese/CONTRIBUTING.md).
