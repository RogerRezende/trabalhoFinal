const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controllers/userController');
const comicController = require('./controllers/comicController');

const artistRoleController = require('./controllers/artistRoleController');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/comics', comicController);

app.use('/artist-roles', artistRoleController);

module.exports = app;
