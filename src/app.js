const express = require('express');
const app = express();
const router = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger_doc.json');

app.use(express.json());
app.use(router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = app;
