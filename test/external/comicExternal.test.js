const request = require('supertest');
const { expect } = require('chai');

const servidor = 'http://localhost:3000';

describe('User Controller', () => {
    describe('POST /comics/register', () => {
        it('Register comic successfully and return 201', async () => {
            const responseLogin = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(servidor)
                .post('/comics/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Absolute Batman 1",
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('name', 'Absolute Batman 1');
            expect(response.body).to.have.property('publisher', 'Panini');
            expect(response.body).to.have.property('licensor', 'DC');
            expect(response.body).to.have.property('genre', 'Super Hero');
            expect(response.body).to.have.property('price', 19.90);
        });

        it('Register comic without token and return 401', async () => {
            const responseLogin = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(servidor)
                .post('/comics/register')
                .send({
                    name: "Absolute Batman 1",
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message', 'Token não informado');
        });

        it('Register comic exists and return 400', async () => {
            const responseLogin = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(servidor)
                .post('/comics/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Absolute Batman 1",
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Revista já registrada');
        });

        it('Register comic without name and return 400', async () => {
            const responseLogin = await request(servidor)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(servidor)
                .post('/comics/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Todos os campos são obrigatórios');
        });
    });
});
