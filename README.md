# Creatus Backend

Este é o backend do projeto Creatus, desenvolvido para o teste técnico de programação em Node.js. O projeto inclui funcionalidades de autenticação, CRUD de usuários e geração de relatórios.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MongoDB
- JWT (JSON Web Token)
- Bcrypt
- Cors

## Estrutura do Projeto
```
creatus-backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── userRoutes.ts
│   ├── prisma/
│   │   └── client.ts
│   ├── utils/
│   │   └── csvGenerator.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Configuração do Ambiente

### Pré-requisitos

- Node.js
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
   npm start

## Execução do Projeto

Para rodar o servidor de desenvolvimento, utilize o comando:
npm start
O servidor estará disponível em http://localhost:5001.

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

As rotas protegidas utilizam tokens JWT para autenticação. Para acessar essas rotas, é necessário incluir o token JWT no cabeçalho da requisição.

### Exemplo de Cabeçalho
```
Key: x-auth-token
Value: seu_token_jwt_aqui
```
## Gerar Relatórios

A rota para gerar relatórios em CSV está protegida e só pode ser acessada por usuários com nível >= 4. O token JWT deve ser incluído no cabeçalho da requisição.

## Considerações Finais

Este projeto foi desenvolvido para demonstrar habilidades em desenvolvimento backend com Node.js, incluindo a utilização de TypeScript, Express, Prisma ORM e autenticação JWT.
