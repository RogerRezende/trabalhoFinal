const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const userService = require('../../services/userService');

describe('User Controller', () => {
    describe('POST /users/register', () => {
        it('Without password and return 400', async () => {
            const response = await request(app)
                .post('/users/register')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Without username and return 400', async () => {
            const response = await request(app)
                .post('/users/register')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Register user successfully and return 201', async () => {
            const response = await request(app)
                .post('/users/register')
                .send({
                    username: "Tim",
                    password: "robin"
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('username', 'Tim');
        });

        it('User exists and return 400', async () => {
            const response = await request(app)
                .post('/users/register')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário já existe');
        });

        it('Using mocks: Without password and return 400', async () => {
            const transferServiceMock = sinon.stub(userService, 'registerUser')
            transferServiceMock.throws(new Error('Usuário e senha obrigatórios'));

            const response = await request(app)
                .post('/users/register')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');

            sinon.restore();
        });

        it('Using mocks: Without username and return 400', async () => {
            const transferServiceMock = sinon.stub(userService, 'registerUser')
            transferServiceMock.throws(new Error('Usuário e senha obrigatórios'));

            const response = await request(app)
                .post('/users/register')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');

            sinon.restore();
        });

        it('Using mocks: Register user successfully and return 201', async () => {
            const transferServiceMock = sinon.stub(userService, 'registerUser')
            transferServiceMock.returns({
                username: "Bruce",
                password: "batman"
            });

            const response = await request(app)
                .post('/users/register')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('username', 'Bruce');

            sinon.restore();
        });
    });

    describe('POST /users/login', () => {
        it('Without password and return 400', async () => {
            const response = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Without username and return 400', async () => {
            const response = await request(app)
                .post('/users/login')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');
        });

        it('Login user successfully and return 200', async () => {
            const response = await request(app)
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
            const response = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman2"
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message', 'Credenciais inválidas');
        });

        it('Using mocks: Without password and return 400', async () => {
            const transferServiceMock = sinon.stub(userService, 'loginUser')
            transferServiceMock.throws(new Error('Usuário e senha obrigatórios'));

            const response = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');

            sinon.restore();
        });

        it('Using mocks: Without username and return 400', async () => {
            const transferServiceMock = sinon.stub(userService, 'loginUser')
            transferServiceMock.throws(new Error('Usuário e senha obrigatórios'));

            const response = await request(app)
                .post('/users/login')
                .send({
                    password: "batman"
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Usuário e senha são obrigatórios');

            sinon.restore();
        });

        it('Using mocks: Login user successfully and return 200', async () => {
            const transferServiceMock = sinon.stub(userService, 'loginUser')
            transferServiceMock.returns({
                username: "Bruce",
                password: "batman"
            });

            const response = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = response.body.token;

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token', token);

            sinon.restore();
        });
    });

    describe('GET /users/:username', () => {
        it('User not exist and return 404', async () => {
            const user = { username: "Clark", password: "superman" };

            const response = await request(app)
                .get(`/users/${user.username}`);

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Usuário não encontrado');
        });

        it('Find username successfully and return 200', async () => {
            const user = { username: "Bruce", password: "batman" };

            const response = await request(app)
                .get(`/users/${user.username}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('username', user.username);
        });

        it('Using mocks: Find username successfully and return 200', async () => {
            const transferServiceMock = sinon.stub(userService, 'getUser')
            transferServiceMock.returns({
                username: "Bruce",
                password: "batman"
            });

            const user = { username: "Bruce", password: "batman" };

            const response = await request(app)
                .get(`/users/${user.username}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('username', user.username);

            sinon.restore();
        });
    });
});
