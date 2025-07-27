const { dateTimeNowFormated, logger } = require('./utils/logging');

// If not in production
if (process.env.NODE_ENV !== "production" || process.env.CONTAINERIZED === "true") {
    require('dotenv').config(); // .env file variables -> process.env
}
logger.log(`In ${process.env.NODE_ENV} env !`);

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const explore = require('./routes/explore');
const user = require('./routes/user');
const notes = require('./routes/notes');
const experimental = require('./routes/experimental');
const path = require('path');
const http = require('http');
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require('hpp');
const rateLimit = require("express-rate-limit");
const { connectDB } = require('./DataBase/connectDB');
const { Socket } = require('./socketHandler');

const codeExecutorDir = `./CodeExecuter/codeExecutor${(process.env.NO_DOCKER ? "_nodockerv" : "_dockerv")}`;
const { initAllDockerContainers } = require(codeExecutorDir);
// const { loggingMiddleware } = require('./middlewares');

// Establish Connection to Database
connectDB();
// Initiate All Docker Containers
initAllDockerContainers();

// parse json request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Security - Updated CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000', // React dev server
        'http://localhost:3001', // Alternative port
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(hpp());
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
}));
app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 500
}));

// creating a http server
const server = http.createServer(app);
// setup socket connection
Socket.registerSocketServer(server);

// logging all server side requests
// app.use('/api', loggingMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV 
    });
});

// api route to get questions and verdicts
app.use('/api/explore', explore);

// api route to get and post notes
app.use('/api/notes', notes);

// api route for user login and register
app.use('/api/user', user);

// experimental routes
app.use('/api/experimental', experimental);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.log(`Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Serve Static Assets In Production
// if (process.env.NODE_ENV === "production") {
// Set Static Folder
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);
// }

const port = process.env.PORT || 5001;
server.listen(port, () => {
    logger.log(`Server running on PORT ${port}`, dateTimeNowFormated());
    logger.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});
