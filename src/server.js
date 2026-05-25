const express = require('express');
require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

app.get('/test', (request, response) => {
  response.json({
    status: 'success',
    message: 'server hidup',
  });
});

app.use((error, request, response, next) => {

  response.status(500).json({
    status: 'error',
    message: error.message,
  });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
});