const request = require('supertest');
const { expect } = require('chai');

const servidor = 'http://localhost:3000';

describe('User Controller', () => {
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
                    username: "Dick",
                    password: "asanoturna"
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('username', 'Dick');
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
});
