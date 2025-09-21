const express = require('express');
const morgan = require('morgan');
const {createError} = require('./utils/errors');
const {StatusCodes} = require('http-status-codes');

const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP

// Rutas públicas



app.get("/ping", (req, res) => {
  
  res.status(StatusCodes.OK).send("pong");
})

const port=3000;
app.listen(port, () => {
  console.log("Server started on port " + port );
}) 

app.use(authMiddleware);
