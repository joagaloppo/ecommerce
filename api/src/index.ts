import 'dotenv/config';
import app from './app';
import config from './config/config';
import logger from './config/logger';

const server = app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} (${config.env})`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received, shutting down gracefully');
    server.close(() => {
        logger.info('server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received, shutting down gracefully');
    server.close(() => {
        logger.info('server closed');
        process.exit(0);
    });
});

export default server;
