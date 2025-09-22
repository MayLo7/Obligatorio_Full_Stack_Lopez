const express = require('express');
const morgan = require('morgan');
require('dotenv').config();


const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

//Para lo que es swagger:
const swagger = require('swagger-ui-express');
const swaggerJsonDoc = require('./documentation/swagger.json');

const privateRouter = require('./routes/private.router');
const publicRouter = require('./routes/public.router');
//Acá tienen que ir los routes de login y de signup

const connectMongoDB = require('./repositories/mongo.client');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP



app.use("/public", publicRouter);



(async () => {
  try {
    await connectMongoDB();
    console.log("Conectado a MongoDB");
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log("Server started on port " + port);
    })
  } catch (error) {
    console.log("No se pudo conectar a MongoDB");
    process.exit(1);
   }
})

//Debajo de todo esto es privado--->>>
app.use(authMiddleware);
app.use("/v1", privateRouter);


//La app inicia aca, levanta el private router que lo hace en  app.use("/v1", privateRouter)
//Eso cae en el endpoint de router.get("/users", getAllUsers); que llama a la funcion getAllUsers
//que esta en controllers/user.controller.js
//y ahi se responde con un json de usuarios. Dividir para conquistar.