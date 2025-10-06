const express = require('express');
const morgan = require('morgan');
require('dotenv').config();




const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');




//const swagger = require('swagger-ui-express');        // 
//const swaggerJsonDoc = require('./documentation/swagger.json');

//const privateRouter = require('./routes/users.router');
const healthRouter = require('./routes/health.router');
const signupRouter = require('./routes/signup.router');
const loginRouter = require('./routes/login.router');
const mealsRouter = require('./routes/meals.router');
const ordermealsRouter = require('./routes/ordermeals.router');
const usersRouter = require('./routes/users.router');
const categoriesRouter = require('./routes/categories.router');

console.log('Routers:');
//console.log('  privateRouter:', typeof privateRouter);
console.log('  publicRouter :', typeof publicRouter);
console.log('  signupRouter :', typeof signupRouter);
console.log('  loginRouter  :', typeof loginRouter);




const connectMongoDB = require('./repositories/mongo.client');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP
//app.use("/public/api-docs", swagger.serve, swagger.setup(swaggerJsonDoc));





app.use("/public/v1", signupRouter);
app.use("/public/v1", loginRouter);
app.use("/", healthRouter);


app.use("/v1", mealsRouter);


app.use(authMiddleware);
//app.use("/v1", privateRouter);

app.use("/v1", ordermealsRouter);
app.use("/v1", usersRouter);
app.use("/v1", categoriesRouter);




(async () => {
    try {
        await connectMongoDB();
        console.log("conexión mongoDB ok")

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("App started and listening in port " + port);
        })
    } catch (error) {
        console.log("Error conectando con mongoDB", error);
        process.exit(1);// hubo un error.
    }
})();






/*
try {
  connectMongoDB();
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

//levantar el login

const port= process.env.PORT;

app.listen(port, () => {
  console.log("Server started on port " + port );
}) ;


//La app inicia aca, levanta el private router que lo hace en  app.use("/v1", privateRouter)
//Eso cae en el endpoint de router.get("/users", getAllUsers); que llama a la funcion getAllUsers
//que esta en controllers/user.controller.js
//y ahi se responde con un json de usuarios. Dividir para conquistar.*/


//Version sin log