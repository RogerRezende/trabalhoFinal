const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const comicService = require('../../services/comicService');

describe('Comic Controller', () => {
    describe('POST /comics/register', () => {
        it('Register comic successfully and return 201', async () => {
            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
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
            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
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
            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
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
            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
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

        it('Using mocks: Register comic successfully and return 201', async () => {
            const transferServiceMock = sinon.stub(comicService, 'registerComic')
            transferServiceMock.returns({
                 name: "Absolute Batman 1",
                 publisher: "Panini",
                 licensor: "DC",
                 genre: "Super Hero",
                 price: 19.90
            });

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
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

            sinon.restore();
        });

        it('Using mocks: Register comic without token and return 401', async () => {
            const transferServiceMock = sinon.stub(comicService, 'registerComic')
            transferServiceMock.throws(new Error('Token não informado'));

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const response = await request(app)
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

            sinon.restore();
        });

        it('Using mocks: Register comic exists and return 400', async () => {
            const transferServiceMock = sinon.stub(comicService, 'registerComic')
            transferServiceMock.throws(new Error('Revista já registrada'));

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .post('/comics/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Absolute Batman 2",
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Revista já registrada');

            sinon.restore();
        });

        it('Using mocks: Register comic without name and return 400', async () => {
            const transferServiceMock = sinon.stub(comicService, 'registerComic')
            transferServiceMock.throws(new Error('Todos os campos são obrigatórios'));

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .post('/comics/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: "Absolute Batman 2",
                    publisher: "Panini",
                    licensor: "DC",
                    genre: "Super Hero",
                    price: 19.90
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'Todos os campos são obrigatórios');

            sinon.restore();
        });
    });

    describe('GET /comics', () => {
        it('List comics successfully and return 200 and confirm is array', async () => {
            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it('List comics successfully and return 200 and confirm is not empty', async () => {
            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        });

        it('List comics successfully and return 200 and confirm first comic properties', async () => {
            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body[0]).to.have.property('name', 'Absolute Batman 2');
            expect(response.body[0]).to.have.property('publisher', 'Panini');
            expect(response.body[0]).to.have.property('licensor', 'DC');
            expect(response.body[0]).to.have.property('genre', 'Super Hero');
            expect(response.body[0]).to.have.property('price', 19.90);
        });

        it('Using mocks: List comics successfully and return 200 and confirm is array', async () => {
            const transferServiceMock = sinon.stub(comicService, 'getComics')
            transferServiceMock.returns([{
                 name: "Absolute Batman 1",
                 publisher: "Panini",
                 licensor: "DC",
                 genre: "Super Hero",
                 price: 19.90
            }]);

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            sinon.restore();
        });

        it('Using mocks: List comics successfully and return 200 and confirm is not empty', async () => {
            const transferServiceMock = sinon.stub(comicService, 'getComics')
            transferServiceMock.returns([{
                 name: "Absolute Batman 1",
                 publisher: "Panini",
                 licensor: "DC",
                 genre: "Super Hero",
                 price: 19.90
            }]);

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;

            sinon.restore();
        });

        it('Using mocks: List comics successfully and return 200 and confirm first comic properties', async () => {
            const transferServiceMock = sinon.stub(comicService, 'getComics')
            transferServiceMock.returns([{
                 name: "Absolute Batman 1",
                 publisher: "Panini",
                 licensor: "DC",
                 genre: "Super Hero",
                 price: 19.90
            }]);

            const responseLogin = await request(app)
                .post('/users/login')
                .send({
                    username: "Bruce",
                    password: "batman"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .get('/comics');

            expect(response.status).to.equal(200);
            expect(response.body[0]).to.have.property('name', 'Absolute Batman 1');
            expect(response.body[0]).to.have.property('publisher', 'Panini');
            expect(response.body[0]).to.have.property('licensor', 'DC');
            expect(response.body[0]).to.have.property('genre', 'Super Hero');
            expect(response.body[0]).to.have.property('price', 19.90);

            sinon.restore();
        });
    });
});

