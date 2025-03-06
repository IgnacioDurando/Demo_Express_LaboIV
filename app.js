require('dotenv').config();

const Server = require('./models/server')

const startServer = new Server();

startServer.listen();