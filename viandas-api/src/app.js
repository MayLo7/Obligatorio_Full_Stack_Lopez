const express = require('express');
const morgan = require('morgan');

const {StatusCodes} = require('http-status-codes');

const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

const privateRouter = require('./routes/private.router');
const publicRouter = require('./routes/public.router');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP



// Rutas públicas





const port=3000;
app.listen(port, () => {
  console.log("Server started on port " + port );
}) 

app.use("/v1", publicRouter);
app.use(authMiddleware);
app.use("/v1", privateRouter);

// Rutas privadas