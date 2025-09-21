const{logRequest} = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
   console.log("Logger middleware called");
   
    logRequest(req);
    
    next();
};
module.exports = {loggerMiddleware};