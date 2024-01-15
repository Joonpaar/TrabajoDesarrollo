const express = require('express');
const cors = require('cors');
const endpoints = require('./endpoints');

const app = express();

app.use(cors());

endpoints.setup(app);

const IP = 'localhost';
const PORT = 3000;

app.listen(PORT, IP, () => {
  console.log(`El servidor está escuchando en ${IP}:${PORT}`);
});
