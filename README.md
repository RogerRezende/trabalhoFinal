# API de Revistas em Quadrinhos

Esta API permite o registro e login de usuários, consulta de usuários e registro/consulta de revistas em quadrinhos. Utiliza autenticação JWT e armazena dados em memória.

## Funcionalidades
- Registro de usuário (não permite duplicados e necessita de autentição JWT)
- Login de usuário (obrigatório informar username e password)
- Consulta de todos os usuários
- Registro de revistas em quadrinhos (necessário o token JWT para realizar a ação)
- Consulta de todas as revistas em quadrinhos
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor)
- Documentação Swagger disponível em `/api-docs`

## Estrutura de Diretórios
```
controllers/         # Rotas e controllers
models/              # Modelos e "banco de dados" em memória
services/            # Lógica de negócio
app.js               # Configuração do Express e rotas
server.js            # Inicialização do servidor
swagger.json         # Documentação Swagger
```

## Instalação e Execução

1. **Clone o repositório**
2. **Instale as dependências:**
    ```
    npm install express jsonwebtoken swagger-ui-express
    ```
3. **Inicie o servidor:**
   ```
   node server.js
   ```
4. **Acesse a documentação:**
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints Utilizados

- Documentação Swagger disponível em: `/api-docs`
- Registro de usuário: `POST /users/register`
- Login: `POST /users/login`
- Consulta de usuário: `GET /users/:username`
- Registro de revista: `POST /comics` (requer Bearer Token)
- Listagem de revistas: `GET /comics`

## Regras de Negócio

- Não é possível registrar usuários ou revistas duplicados.
- Para registrar revista, é necessário autenticação via Bearer Token (JWT).
- Todos os campos são obrigatórios para registro de usuário e revista.

## Testes

- O arquivo `app.js` pode ser importado diretamente para testes automatizados (ex: Supertest).

---

API criada para fins didáticos e de automação de testes.
