const express = require('express');
const morgan = require('morgan');
//Falta el require('dotenv').config();

const {StatusCodes} = require('http-status-codes');//Esto va acá?

const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

//Para lo que es swagger:
const swagger = require('swagger-ui-express');
const swaggerJsonDoc = require('./documentations/swagger.json');

const privateRouter = require('./routes/private.router');
const publicRouter = require('./routes/public.router');
//Acá tienen que ir los routes de login y de signup
//También falta la conexión de la base de datos de mongo

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP



// Rutas públicas





const port=3000;
app.listen(port, () => {
  console.log("Server started on port " + port );
}) 


//Debajo de todo esto es privado--->>>
app.use(authMiddleware);
app.use("/v1", privateRouter);

(async () => {
  try {} catch (error) {} // Falta implementar
})

