import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import { errorConverter, errorHandler } from './middlewares/error.middleware';
// import limiter from './middlewares/limiter.middleware';
import ApiError from './utils/ApiError';
import morgan from './config/morgan';
import config from './config/config';
import router from './routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
app.use(compression());
app.use(router);
app.use((req, res, next) => next(new ApiError(404, `Cannot ${req.method} ${req.path}`)));
app.use(errorConverter);
app.use(errorHandler);

export default app;
