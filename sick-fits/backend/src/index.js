const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
//decode JWT to get user id on request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId; 
    }
    next();
});
server.express.use(morgan('combined'));
server.start({
    cors: {
        credentials: false,
        origin: process.env.FRONTEND_URL,
    },
}, serverDetails => {
    console.log(`Server now running on http://localhost:${serverDetails.port}`)
}
);