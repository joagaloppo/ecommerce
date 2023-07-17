import express from 'express';
import brandRouter from './brand.route';

const router = express.Router();

router.use('/', brandRouter);

export default router;
