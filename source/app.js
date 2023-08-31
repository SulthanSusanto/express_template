import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import connectMongoDB from './database/connection.js';
import errorHandlers from './middlewares/error.middleware.js';

import morgan from './config/morgan.config.js';
import router from './routes/v1/index.js';

const app = express();

connectMongoDB();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('combined'));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());

app.use('/api/v1/', router);

app.use(errorHandlers.handleNotFound);
app.use(errorHandlers.handleError);

export default app;
