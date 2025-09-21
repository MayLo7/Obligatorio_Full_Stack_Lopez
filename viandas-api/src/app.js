const express = require('express');
const morgan = require('morgan');
require('dotenv').config();


const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

const privateRouter = require('./routes/private.router');
const publicRouter = require('./routes/public.router');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP



app.use("/public", publicRouter);

app.use(authMiddleware);
app.use("/v1", privateRouter);

const port= process.env.PORT;

app.listen(port, () => {
  console.log("Server started on port " + port );
}) ;



//La app inicia aca, levanta el private router que lo hace en  app.use("/v1", privateRouter)
//Eso cae en el endpoint de router.get("/users", getAllUsers); que llama a la funcion getAllUsers
//que esta en controllers/user.controller.js
//y ahi se responde con un json de usuarios. Dividir para conquistar.