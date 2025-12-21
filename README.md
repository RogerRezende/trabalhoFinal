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

## Testes de Performance

- Foi utilizado o framework K6 para os testes de performance e alguns conceitos eram necessários que fossem empregados

1. **Thresholds**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito.

```
thresholds: { 
        http_req_duration: ['p(90)<=4']
    }
```

2. **Checks**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito.

\`\`\`javascript
//em relação ao registro de um usuário
check(responseRegister, { 'register status is 201': (responseRegister) => responseRegister.status === 201 });

//em relação ao login de um usuário
check(responseLogin, { 'login status is 200': (responseLogin) => responseLogin.status === 200 });
\`\`\`

3. **Helpers**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito, onde o código de desenvolvimento está no arquivo test/k6/helpers/usernameGenerator.js.

\`\`\`javascript
//função que foi chamada e que foi criada na pasta helper
let username = generateRandomUsername();
\`\`\`

\`\`\`javascript
//função que foi desenvolvida na pasta helper e foi chamada de usernameGenerator
function generateRandomUsername() {
    const adjectives = ["Quick", "Lazy", "Happy", "Sad", "Brave", "Clever", "Witty", "Kind"];
    const nouns = ["Fox", "Dog", "Cat", "Bear", "Lion", "Tiger", "Wolf", "Eagle"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number

    return `${randomAdjective}${randomNoun}${randomNumber}`;
}

module.exports = generateRandomUsername;    
\`\`\`

O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito, onde o código de desenvolvimento está no arquivo test/k6/helpers/login.js.

\`\`\`javascript
//função que foi chamada e que foi criada na pasta helper
let responseLogin = login(username, password);
\`\`\`

\`\`\`javascript
//função que foi desenvolvida na pasta helper e foi chamada de login
import http from 'k6/http';

function login(username, password) {
    let responseLogin = http.post(
        'http://localhost:3000/users/login', 
        JSON.stringify({ 
            username: username, 
            password: password 
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return responseLogin;
}

export { login };    
\`\`\`

4. **Trends**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito.

\`\`\`javascript
//foi criado o nome da trend
const loginTrend = new Trend('login_duration');

//foi criada a regra da trend para a geração de uma nova métrica
loginTrend.add(responseLogin.timings.duration);
\`\`\`

5. **Stages**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito.

\`\`\`javascript
//estágios criados para o andamento do teste de performance
stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 30 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
\`\`\`

6. **Reaproveitamento de Resposta**
\`\`\`javascript
thresholds: { 
        http_req_duration: ['p(90)<=4']
    }
\`\`\`

7. **Uso de Token de Autenticação**
\`\`\`javascript
thresholds: { 
        http_req_duration: ['p(90)<=4']
    }
\`\`\`

8. **Data-Driven Testing**
\`\`\`javascript
thresholds: { 
        http_req_duration: ['p(90)<=4']
    }
\`\`\`

9. **Groups**
O código abaixo está armazenado no arquivo test/k6/login.test.js e demontra o uso do conceito.

\`\`\`javascript
//group do registro de usuário
group('Register User', function() {
        let responseRegister = http.post(
            'http://localhost:3000/users/register', 
            JSON.stringify({ 
                username: username, 
                password: password 
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        check(responseRegister, { 'register status is 201': (responseRegister) => responseRegister.status === 201 });
    });

//group do login de usuário
group('Login User', function() {
        let responseLogin = login(username, password);
        check(responseLogin, { 'login status is 200': (responseLogin) => responseLogin.status === 200 });
        let token = responseLogin.json('token');
        loginTrend.add(responseLogin.timings.duration);
    });
\`\`\`


---

API criada para fins didáticos e de automação de testes.
