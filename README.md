# Creatus Backend

Este é o desafio do backend para a entrevista na Creatus, desenvolvido para o teste técnico de programação em Node.js. O projeto inclui funcionalidades de autenticação, CRUD de usuários e geração de relatórios.

Para melhorar a organização do código ao longo do desenvolvimento, tomei a liberdade de ajustar algumas rotas solicitadas no desafio. Além disso, implementei hashing de senhas utilizando bcrypt para garantir a segurança dos dados dos usuários, armazenando apenas o hash das senhas no banco de dados em vez das senhas em texto puro.

## Funcionalidades

- Autenticação JWT: Proteção de rotas com tokens JWT.
- CRUD de Usuários: Criação, leitura, atualização e exclusão de usuários.
- Geração de Relatórios: Geração de relatórios em formato CSV acessível apenas para usuários autorizados.

## Tecnologias Utilizadas

- Node.js: Plataforma de desenvolvimento.
- Express: Framework para construção de APIs.
- TypeScript: Linguagem de programação para adicionar tipagem estática ao JavaScript.
- Prisma: ORM para interação com o banco de dados.
- MongoDB: Banco de dados NoSQL.
- bcryptjs: Biblioteca para hash de senhas.
- jsonwebtoken: Biblioteca para geração e verificação de tokens JWT.
- json2csv: Biblioteca para conversão de dados JSON para CSV.

## Estrutura do Projeto
```
creatus-backend/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── db.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   ├── prisma/
│   │   ├── client.ts
│   │   ├── schema.prisma
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   ├── types/
│   │   ├── AuthenticateRequest.ts
│   │   ├── express.d.ts
│   │   ├── User.ts
│   ├── utils/
│   │   ├── csvGenerator.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
```

## Configuração do Ambiente

### Pré-requisitos

- Node.js
- npm
- MongoDB
- Prisma

### Passo a Passo

1. Clone o repositório:
   git clone https://github.com/seu-usuario/creatus-backend.git

2. Instale as dependências:
   cd creatus-backend
   npm install

3. Configure as variáveis de ambiente:
   Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
   DATABASE_URL="sua_url_do_mongo_db"
   JWT_SECRET="sua_chave_secreta_jwt"

4. Configure o Prisma:
   npx prisma generate

5. Execute as migrações do Prisma:
   npx prisma migrate dev

6. Inicie o servidor:
   npm start. O servidor estará disponível em http://localhost:5001.

## Rotas da API

### Autenticação

#### POST /api/auth/login

- Descrição: Autentica um usuário e retorna um token JWT.
- Body:
  ```
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Resposta:
  ```
  {
    "token": "seu_token_jwt_aqui"
  }
  ```

### CRUD de Usuários

#### POST /api/users

- Descrição: Cria um novo usuário.
- Body:
  ```
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "level": 1
  }
  ```
- Resposta:
  ```
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "level": 1
  }
  ```

#### GET /api/users

- Descrição: Lista todos os usuários.
- Resposta:
  ```
  [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "level": 1
    },
    ...
  ]
  ```
#### GET /api/users/:id

- Descrição: Obtém os detalhes de um usuário específico.
- Resposta:
  ```
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "level": 1
  }
  ```

#### PUT /api/users/:id

- Descrição: Atualiza um usuário específico.
- Body:
  ```
  {
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "password": "newpassword123",
    "level": 2
  }
  ```
- Resposta:
  ```
  {
    "id": "user_id",
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "level": 2
  }
  ```

#### DELETE /api/users/:id

- Descrição: Deleta um usuário específico.
- Resposta:
  ```
  {
    "message": "Usuário removido com sucesso"
  }
  ```

### Geração de Relatórios

#### GET /api/users/report/csv

- Descrição: Gera um relatório em CSV dos usuários.
- Headers:
  ```
  Key: x-auth-token 
  Value: Token JWT do usuário logado com nível >= 4.
  ```
- Resposta:
  ```
  name,email,level
  John Doe,johndoe@example.com,1
  Jane Doe,janedoe@example.com,2
  ```
## Autenticação e Autorização

As rotas protegidas - a rota de geração de relatório em CSV - utilizam tokens JWT para autenticação. Para acessar essas rotas, é necessário incluir o token JWT no cabeçalho da requisição.

### Exemplo de Cabeçalho
```
Key: x-auth-token
Value: seu_token_jwt_aqui
```
## Gerar Relatórios

A rota para gerar relatórios em CSV está protegida e só pode ser acessada por usuários com nível >= 4. Como informado previamente, o token JWT deve ser incluído no cabeçalho da requisição.

## Considerações Finais

Este projeto foi desenvolvido para demonstrar habilidades em desenvolvimento backend com Node.js, incluindo a utilização de TypeScript, Express, Prisma ORM e autenticação JWT.
