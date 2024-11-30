# Gerenciador de Ecommerce

Este projeto foi criado como parte da disciplina de Programação de Scripts na Fatec Franca, com o intuito de desenvolver uma plataforma web para administrar uma loja virtual. A aplicação permite a gestão de produtos, carrinhos de compras e usuários.

## Funcionalidades

- Gestão de Produtos: Permite adicionar, editar, listar e excluir produtos da loja virtual.
- Carrinho de Compras: Funcionalidade de adicionar, editar e remover produtos no carrinho.
- Gestão de Usuários: Cadastro, edição e exclusão de usuários.
- Autenticação e Proteção de Rotas: Implementação de um sistema de login com geração de tokens de sessão para proteger todas as rotas.
- Responsividade: O layout é totalmente responsivo, adaptando-se a dispositivos de diferentes tamanhos (desktop, tablet, mobile).

## Login no Sistema
Para fazer login, utilize o usuário e senha abaixo:

- Usuário: `mor_2314`
- Senha: `83r5^_`

## Como acessar localmente
1. Clone este repositório
2. Execute o comando `npm install` dentro da pasta raiz do projeto
3. Adicione o arquivo `.env` e coloque a variável de ambiente `NEXT_PUBLIC_API_BASE=https://fakestoreapi.com`
4. Execute `npm run dev` para executar o projeto em desenvolvimento
5. Abra o navegador e acesse a URL `http://localhost:3000/`

## API Utilizada
- Este projeto consome a API pública fakestoreapi para carregar dados de produtos, categorias e usuários. A API pode ser acessada através do seguinte link:
`https://fakestoreapi.com`

## Principais Tecnologias e Bibliotecas Utilizadas
- Tailwind CSS: Framework de utilitários CSS para estilizar interfaces.
- Zod: Biblioteca para validação de dados.
- React-toastify: Biblioteca para exibir notificações estilo "toast" em React.
- Axios: Cliente HTTP para fazer requisições a APIs.
- NextJS: Framework React para renderização no servidor (SSR) e geração de páginas estáticas (SSG).
- ReactJS: Biblioteca para construir interfaces de usuário.
- Universal-cookie: Biblioteca para manipulação de cookies.
- TypeScript: Extensão do JavaScript com tipagem estática.

## Scripts
- npm run dev: Inicia o servidor de desenvolvimento.
- npm run build: Gera a versão otimizada para produção.
- npm run start: Inicia o servidor em modo de produção.
- npm run lint: Executa a verificação de código com ESLint.

## Dependências do Projeto

### Dependências:
- axios: ^1.7.7
- next: ^14.2.13
- react: ^18
- react-dom: ^18
- react-toastify: ^10.0.5
- universal-cookie: ^7.2.2
- zod: ^3.23.8

### Dependências de Desenvolvimento:
- @rocketseat/eslint-config: ^2.2.2
- @types/node: ^20
- @types/react: ^18
- @types/react-dom: ^18
- autoprefixer: ^10.4.20
- eslint: ^8.57.0
- eslint-config-next: 14.2.7
- git-commit-msg-linter: ^5.0.8
- postcss: ^8.4.45
- prettier-plugin-tailwindcss: ^0.6.6
- tailwindcss: ^3.4.10
- typescript: ^5
