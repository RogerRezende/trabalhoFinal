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
    });
});
