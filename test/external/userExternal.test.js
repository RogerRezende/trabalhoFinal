const request = require('supertest');
const { expect } = require('chai');

const servidor = 'http://localhost:3000';

describe('User External', () => {
    describe('POST /users/register', () => {
        it('Without password and return 400', async () => {
            const response = await request(servidor)
                .post('/users/register')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Without username and return 400', async () => {
            const response = await request(servidor)
                .post('/users/register')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Register user successfully and return 201', async () => {
            const response = await request(servidor)
                .post('/users/register')
                .send({
                    username: "Selina",
                    password: "mulhergato"
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('username', 'Selina');
        });

        it('User exists and return 400', async () => {
            const response = await request(servidor)
                .post('/users/register')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário já existe');
        });
    });

    describe('POST /users/login', () => {
        it('Without password and return 400', async () => {
            const response = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Without username and return 400', async () => {
            const response = await request(servidor)
                .post('/users/login')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Login user successfully and return 200', async () => {
            const response = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = response.body.token;

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token', token);
        });

        it('User not exist and return 401', async () => {
            const response = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman2"
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message', 'Credenciais inválidas');
        });
    });

    describe('GET /users/:username', () => {
        it('User not exist and return 404', async () => {
            const user = { username: "Clark", password: "superman" };

            const response = await request(servidor)
                .get(`/users/${user.username}`);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Usuário não encontrado');
        });

        it('Find username successfully and return 200', async () => {
            const user = { username: "Bruce", password: "batman" };

            const response = await request(servidor)
                .get(`/users/${user.username}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('username', user.username);
        });
    });
});
