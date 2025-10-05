const mongoose = require('mongoose');


mongoose.set('debug', true);

const connectMongoDB = async () => {

    const connectionURL = process.env.MONGO_DB_HOST; // Ejemplo: 'mongodb://localhost:27017'
    const dbName = process.env.MONGO_VIANDAS_DB_NAME; // Ejemplo: 'viandas-app'
    await mongoose.connect(`${connectionURL}/${dbName}`, {
        serverSelectionTimeoutMS: 10000 //Tiempo de espera para la conexión
    });

    console.log('[mongo] conectado a host:', mongoose.connection.host, 'db:', mongoose.connection.name);
}

module.exports = connectMongoDB;   

