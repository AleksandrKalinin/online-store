const express = require('express');
const winston = require('winston');
const cors = require('cors');
const expressWinston = require('express-winston');

import { logResponseTime } from './middlewares/responseTimeMiddleware.js';
import { logger } from './middlewares/loggerMiddleware.js';
import { errorStatus, customErrorHandler } from './middlewares/errorMiddleware.js';
import { processRejection } from './middlewares/processRejection.js';

const Router = require('./router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(logger);

app.use(logResponseTime);

app.use(expressWinston.logger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(info => `Winston log: request on path ${info.meta.req.originalUrl} with method ${info.meta.req.method} and query ${JSON.stringify(info.meta.req.query)} ended with a status code ${info.meta.res.statusCode} in ${info.meta.responseTime} ms.`)
        })
    ]
}));

app.use('/api', Router);

app.use(expressWinston.errorLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(info => `Winston error log: on ${info.meta.date} request on path ${info.meta.req.originalUrl} with method ${info.meta.req.method} and query ${JSON.stringify(info.meta.req.query)} ended with an error ${info.meta.error}`)
        })
    ]
}));

app.use(processRejection);

app.use(errorStatus);

app.use(customErrorHandler);


export default app;
