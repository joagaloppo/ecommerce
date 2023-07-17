import express from 'express';
// import validate from '../middlewares/validate.middleware';
// import { authValidation } from '../validations';
import { brandController } from '../controllers';

const router = express.Router();

router.get('/brands', brandController.getBrands);

export default router;
