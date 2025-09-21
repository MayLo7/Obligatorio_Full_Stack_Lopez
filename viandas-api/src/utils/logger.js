const fs = require('fs');
const {getISODate, getLoggerDate} = require('./date');


const logRequest = req => {
    //append agrega al final del archivo

    const filename = `./logs/${getISODate()}.log`; //logs/2025-09-20.log
    const content = `[${getLoggerDate()}] ${req.method} ${req.url} \n`;
    fs.appendFile( filename, content , error => {
        if(error){
            console.log("Error writing to log file", error);
        }
    })
};
module.exports = { logRequest };


///NO HACE EL LOGGER