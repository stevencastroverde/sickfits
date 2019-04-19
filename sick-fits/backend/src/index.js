const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
//@todo use express to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, serverDetails => {
    console.log(`Server now running on http://localhost:${serverDetails.port}`)
}
);