import { Router } from 'express';
import productController from '../controllers/productController';
import { verifyAuth } from '../middlewares/authMiddleware';
import validateProduct from '../middlewares/productValidation';

const router = Router();

router.post('/', validateProduct, verifyAuth, productController.create);
router.get('/', verifyAuth, productController.getAll);

export default router;