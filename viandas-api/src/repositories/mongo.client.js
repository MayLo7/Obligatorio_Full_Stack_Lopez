const mongoose = require('mongoose');

const connectMongoDB = async () => {

    const connectionURL = process.env.MONGO_DB_HOST; // Ejemplo: 'mongodb://localhost:27017'
    const dbName = process.env.MONGO_VIANDAS_DB_NAME; // Ejemplo: 'viandas-app'
    await mongoose.connect(`${connectionURL}/${dbName}`, {
        serverSelectionTimeoutMS: 10000
    });
}

module.exports = connectMongoDB;   

