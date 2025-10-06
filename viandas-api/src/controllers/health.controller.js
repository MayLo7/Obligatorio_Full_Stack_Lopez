const { StatusCodes } = require("http-status-codes");


const ping = async (req, res) => {
res.status(StatusCodes.OK).send("pong...Sin miedo al exito!");
}

module.exports = { ping };